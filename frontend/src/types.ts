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

export type SearchRestaurantResponse = {
  data: Restaurant[],
  pagination: {
    total: number,
    page: number,
    pages: number
  }
}

export type CheckoutSessionRequest = {
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

export type OrderStatus = "placed" | "paid" | "inProgress" | "outForDelivery" | "delivered";

export type Order = {
  _id: string,
  restaurant: Restaurant,
  user: User,
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
  totalAmount: number,
  status: OrderStatus,
  createdAt: string,
  restaurantId: string
}

export type OrdersResponse = {
  message: string,
  orders: Order[]
}

export type OrderResponse = {
  message: string,
  orders: Order
}