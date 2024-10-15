import { SearchState } from "@/pages/SearchPage";
import { RestaurantResponse, SearchRestaurantResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantRequest = async (): Promise<RestaurantResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch restaurant");
    }
    return response.json();
  }
  const {data, isLoading} = useQuery("fetchRestaurant", getRestaurantRequest, {enabled: !!restaurantId});
  const restaurant = data?.restaurant;
  return {restaurant, isLoading};
}

export const useSearchRestaurant = (searchState: SearchState, city?: string) => {
  const createSearchRestaurant = async (): Promise<SearchRestaurantResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(','));
    params.set("sortOption", searchState.sortOption);
    const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch restaurant");
    }
    return response.json();
  }
  const {data: results, isLoading} = useQuery(
    ["searchRestaurants", searchState], 
    createSearchRestaurant, 
    {enabled: !!city}
  );
  return {results, isLoading};
}