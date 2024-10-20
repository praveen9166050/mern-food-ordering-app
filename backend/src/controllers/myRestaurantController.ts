import { NextFunction, Request, Response } from "express";
import Restaurant from "../models/Restaurant";
import CustomError from "../utils/CustomError";
import { v2 as cloudinary } from 'cloudinary';
import Order from "../models/Order";

export const getMyRestaurant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOne({user: req.userId});
    if (!restaurant) {
      throw new CustomError(404, "Restaurant for this user does not exist");
    }
    res.status(200).json({
      message: "Restaurant fetched successfully",
      restaurant: restaurant.toObject()
    });
  } catch (error) {
    next(error);
  }
}

export const createMyRestaurant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const existingrestaurant = await Restaurant.findOne({user: req.userId});
    if (existingrestaurant) {
      throw new CustomError(409, "Restaurant for this user already exists");
    }
    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.uploader.upload(dataURI);
    const restaurant = await Restaurant.create({
      ...req.body, 
      user: req.userId, 
      imageUrl: uploadResponse.url
    });
    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant: restaurant.toObject()
    });
  } catch (error) {
    next(error);
  }
}

export const updateMyRestaurant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOne({user: req.userId});
    if (!restaurant) {
      throw new CustomError(404, "Restaurant for this user does not exist");
    }
    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    if (req.file) {
      const image = req.file as Express.Multer.File;
      const base64Image = Buffer.from(image.buffer).toString("base64");
      const dataURI = `data:${image.mimetype};base64,${base64Image}`;
      const uploadResponse = await cloudinary.uploader.upload(dataURI);
      restaurant.imageUrl = uploadResponse.url;
    }
    await restaurant.save();
    res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant: restaurant.toObject()
    });
  } catch (error) {
    next(error);
  }
}

export const getMyRestaurantOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOne({user: req.userId});
    if (!restaurant) {
      throw new CustomError(404, "Restaurant not found");
    }
    const orders = await Order.find({restaurant: restaurant._id}).populate("restaurant").populate("user");
    res.status(200).json({
      message: "Restaurant orders fetched successfully",
      orders
    });
  } catch (error) {
    next(error);
  }
}

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {orderId} = req.params;
    const {status} = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new CustomError(404, "Order not foumd");
    }
    const restaurant = await Restaurant.findById(order.restaurant);
    if (restaurant?.user?._id.toString() !== req.userId) {
      res.status(401).send();
      return;
    }
    order.status = status;
    await order.save();
    res.status(200).json({
      message: "Orders status updated successfully",
      order
    });
  } catch (error) {
    next(error);
  }
}