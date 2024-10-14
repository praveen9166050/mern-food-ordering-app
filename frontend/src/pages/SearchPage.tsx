import { useSearchRestaurant } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string,
  page: number,
  selectedCuisines: string[],
  sortOption: string
}

function SearchPage() {
  const {city} = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "", 
    page: 1, 
    selectedCuisines: [],
    sortOption: "bestMatch"
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const {results, isLoading} = useSearchRestaurant(searchState, city);
  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption
    }));
  }
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1
    }));
  }
  const setSearchQuery = (searchFromData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFromData.searchQuery,
      page: 1
    }));
  }
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1
    }));
  }
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page
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
        <CuisineFilter 
          onChange={setSelectedCuisines} 
          selectedCuisines={searchState.selectedCuisines} 
          isExpanded={isExpanded} 
          onExpandedClick={() => setIsExpanded((prevState) => !prevState)} 
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar 
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery} 
          placeHolder="Search by cuisine or restaurant name"
          onReset={resetSearch}
        />
        <div className="flex justify-between gap-3 flex-col lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown 
            sortOption={searchState.sortOption} 
            onChange={(value) => setSortOption(value)} 
          />
        </div>
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
        <PaginationSelector 
          page={results.pagination.page} 
          pages={results.pagination.pages} 
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default SearchPage;