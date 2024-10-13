import { useSearchRestaurant } from "@/api/RestaurantApi";
import { useParams } from "react-router-dom";

function SearchPage() {
  const {city} = useParams();
  const {results, isLoading} = useSearchRestaurant(city);
  return (
    <span>
      User searched for {city}{" "}
      <span>
        {results?.data.map(restaurant => (
          <span>
            found - {restaurant.restaurantName}, {restaurant.city}
          </span>
        ))}
      </span>
    </span>
  )
}

export default SearchPage;