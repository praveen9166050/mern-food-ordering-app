import { Link } from "react-router-dom";

type Props = {
  total: number,
  city: string
}

function SearchResultInfo({total, city}: Props) {
  return (
    <div className="flex flex-col gap-3 text-xl font-bold justify-between lg:items-center lg:flex-row">
      <span>
        {total} Restaurants found in {city}
        <Link to={"/"} className="text-sm font-semibold underline ml-1 cursor-pointer text-blue-500">
          Change location
        </Link>
      </span>
    </div>
  );
}

export default SearchResultInfo;