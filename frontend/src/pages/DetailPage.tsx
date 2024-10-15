import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { MenuItem as MenuItemType } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string,
  name: string,
  price: number,
  quantity: number
}

function DetailPage() {
  const {restaurantId} = useParams();
  const {restaurant, isLoading} = useGetRestaurant(restaurantId);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevState) => {
      const existingCartItem = prevState.find(item => item._id === menuItem._id);
      if (!existingCartItem) {
        return [
          ...prevState, 
          {
            _id: menuItem._id, 
            name: menuItem.name, 
            price: menuItem.price, 
            quantity: 1
          }
        ];
      }
      return prevState.map(item => {
        if (item._id === menuItem._id) {
          return {
            ...item, 
            quantity: item.quantity + 1
          }
        }
        return item;
      });
    });
  }
  if (isLoading || !restaurant) {
    return "Loading...";
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16/5}>
        <img src={restaurant.imageUrl} alt="" className="h-full w-full rounded-md object-cover" />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem, i) => (
            <MenuItem key={i} menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary restaurant={restaurant} cartItems={cartItems} />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DetailPage;