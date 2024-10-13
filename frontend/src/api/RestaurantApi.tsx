import { SearchRestaurantResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (city?: string) => {
  const createSearchRestaurant = async (): Promise<SearchRestaurantResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}`);
    if (!response.ok) {
      throw new Error("Failed to fetch restaurant");
    }
    return response.json();
  }
  const {data: results, isLoading} = useQuery(
    ["searchRestaurants"], 
    createSearchRestaurant, 
    {enabled: !!city}
  );
  return {results, isLoading};
}