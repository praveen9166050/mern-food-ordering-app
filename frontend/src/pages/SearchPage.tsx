import { useSearchRestaurant } from "@/api/RestaurantApi";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useParams } from "react-router-dom";

function SearchPage() {
  const {city} = useParams();
  const {results, isLoading} = useSearchRestaurant(city);
  if (isLoading) {
    return "Loading...";
  }
  if (!results?.data || !city) {
    return <span>No results found</span>
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        insert cuisines here :)
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
  // return (
  //   <span>
  //     User searched for {city}{" "}
  //     <span>
  //       {results?.data.map(restaurant => (
  //         <span>
  //           found - {restaurant.restaurantName}, {restaurant.city}
  //         </span>
  //       ))}
  //     </span>
  //   </span>
  // )
}

export default SearchPage;