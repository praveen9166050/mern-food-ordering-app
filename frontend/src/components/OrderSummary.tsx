import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

type Props = {
  restaurant: Restaurant,
  cartItems: CartItem[]
}

function OrderSummary({restaurant, cartItems}: Props) {
  const getTotalCost = () => {
    const totalItemsCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalWithDelivery = totalItemsCost + restaurant.deliveryPrice;
    return totalWithDelivery;
  }
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>&#8377; {getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item, i) => (
          <div key={i} className="flex justify-between">
            <span>
              <Badge variant={"outline"} className="mr-2">
                {item.quantity}
              </Badge>
            </span>
            <span className="flex items-center gap-1">
              &#8377; {item.price * item.quantity}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>&#8377; {restaurant.deliveryPrice}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
}

export default OrderSummary;