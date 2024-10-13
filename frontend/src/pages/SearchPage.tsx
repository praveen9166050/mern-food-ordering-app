import { useSearchRestaurant } from "@/api/RestaurantApi";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string
}

function SearchPage() {
  const {city} = useParams();
  const [searchState, setSearchState] = useState<SearchState>({searchQuery: ""});
  const {results, isLoading} = useSearchRestaurant(searchState, city);
  const setSearchQuery = (searchFromData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFromData.searchQuery
    }));
  }
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: ""
    }));
  }
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
        <SearchBar 
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery} 
          placeHolder="Search by cuisine or restaurant name"
          onReset={resetSearch}
        />
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;