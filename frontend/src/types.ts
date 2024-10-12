export type User = {
  _id: string,
  email: string,
  name: string,
  addressLine1: string,
  city: string,
  country: string
}

export type UserResponse = {
  message: string,
  user: User
}

export type MenuItem = {
  _id: string,
  name: string,
  price: number
}

export type Restaurant = {
  _id: string,
  user: string,
  restaurantName: string,
  city: string,
  country: string,
  deliveryPrice: number,
  estimatedDeliveryTime: number,
  cuisines: string[],
  menuItems: MenuItem[],
  imageUrl: string
}

export type RestaurantResponse = {
  message: string,
  restaurant: Restaurant
}