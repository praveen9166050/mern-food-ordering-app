import { OrderResponse, OrdersResponse, RestaurantResponse } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const {getAccessTokenSilently} = useAuth0();
  const getMyRestaurantRequest = async (): Promise<RestaurantResponse> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch restaurant");
    }
    return response.json();
  }
  const {data, isLoading, error} = useQuery("fetchMyRestaurant", getMyRestaurantRequest);
  if (error) {
    toast.error("Unable to fetch restaurant");
  }
  const restaurant = data?.restaurant;
  return {restaurant, isLoading};
}

export const useCreateMyRestaurant = () => {
  const {getAccessTokenSilently} = useAuth0();
  const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<RestaurantResponse> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: restaurantFormData
    });
    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }
    return response.json();
  }
  const {mutate: createRestaurant, isLoading, isSuccess, error} = useMutation(createMyRestaurantRequest);
  if (isSuccess) {
    toast.success("Restaurant created!");
  }
  if (error) {
    toast.error("Unable to create restaurant");
  }
  return {createRestaurant, isLoading};
}

export const useUpdateMyRestaurant = () => {
  const {getAccessTokenSilently} = useAuth0();
  const updateMyRestaurantRequest = async (restaurantFormData: FormData): Promise<RestaurantResponse> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: restaurantFormData
    });
    if (!response.ok) {
      throw new Error("Failed to update restaurant");
    }
    return response.json();
  }
  const {mutate: updateRestaurant, isLoading, isSuccess, error} = useMutation(updateMyRestaurantRequest);
  if (isSuccess) {
    toast.success("Restaurant updated!");
  }
  if (error) {
    toast.error("Unable to update restaurant");
  }
  return {updateRestaurant, isLoading};
}

export const useGetMyRestaurantOrders = () => {
  const {getAccessTokenSilently} = useAuth0();
  const getMyRestaurantOrdersRequest = async (): Promise<OrdersResponse> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch restaurant orders");
    }
    return response.json();
  }
  const {data, isLoading, error} = useQuery("fetchMyRestaurantOrders", getMyRestaurantOrdersRequest);
  if (error) {
    toast.error("Unable to fetch restaurant orders");
  }
  const orders = data?.orders;
  return {orders, isLoading};
}

type UpdateOrderStatusRequest = {
  orderId: string,
  status: string
}

export const useUpdateOrderStatus = () => {
  const {getAccessTokenSilently} = useAuth0();
  const updateOrderStatusRequest = async (orderStatusUpdateData: UpdateOrderStatusRequest): Promise<OrderResponse> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order/${orderStatusUpdateData.orderId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({status: orderStatusUpdateData.status})
    });
    if (!response.ok) {
      throw new Error("Failed to update order status");
    }
    return response.json();
  }
  const {
    mutateAsync: updateOrderStatus, 
    isLoading, 
    isSuccess, 
    isError, 
    reset
  } = useMutation(updateOrderStatusRequest);
  if (isSuccess) {
    toast.success("Order status updated!");
  }
  if (isError) {
    toast.error("Unable to update order status");
    reset();
  }
  return {updateOrderStatus, isLoading};
}