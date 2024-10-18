import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import Restaurant, { MenuItemtype } from "../models/Restaurant";
import CustomError from "../utils/CustomError";
import Order from "../models/Order";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string,
    name: string,
    quantity: string
  }[],
  deliveryDetails: {
    email: string,
    name: string,
    addressLine1: string,
    city: string,
    country: string
  },
  restaurantId: string
}

export const stripeWebhookHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    event = STRIPE.webhooks.constructEvent(req.body, sig as string, STRIPE_ENDPOINT_SECRET);
  } catch (error: any) {
    // next(error);
    res.status(400).send(`Webhook error: ${error.message}`);
    return;
  }

  try {
    if (event.type === "checkout.session.completed") {
      const order = await Order.findById(event.data.object.metadata?.orderId);
      if (!order) {
        throw new CustomError(404, "Order not found");
      }
      order.totalAmount = event.data.object.amount_total;
      order.status = "paid";
      await order.save();
    }
    res.status(200).send();
  } catch (error) {
    next(error);
  }
}

export const createCheckoutSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;
    const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId);
    if (!restaurant) {
      throw new CustomError(404, "Restaurant not found");
    }
    const order = new Order({
      restaurant, 
      user: req.userId, 
      status: "placed",
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems
    });
    const lineItems = createLineItems(checkoutSessionRequest, restaurant.menuItems);
    const session = await createSession(
      lineItems, 
      order._id.toString(), 
      restaurant.deliveryPrice,
      restaurant._id.toString()
    );
    if (!session.url) {
      throw new CustomError(500, "Error creating stripe session");
    }
    await order.save();
    res.status(200).json({
      message: "Stripe session created successfully",
      url: session.url
    });
  } catch (error: any) {
    // next(error);
    res.status(500).json({message: error?.raw?.message || error?.message});
  }
}

const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: MenuItemtype[]) => {
  const lineItems = checkoutSessionRequest.cartItems.map(cartItem => {
    const menuItem = menuItems.find(menuItem => menuItem._id.toString() === cartItem.menuItemId);
    if (!menuItem) {
      throw new CustomError(404, `Menu item not found: ${cartItem.menuItemId}`);
    }
    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "gbp",
        unit_amount: menuItem.price,
        product_data: {
          name: menuItem.name
        }
      },
      quantity: parseInt(cartItem.quantity)
    }
    return line_item;
  });

  return lineItems;
}

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice,
            currency: "gbp"
          }
        }
      }
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`
  });

  return sessionData;
}