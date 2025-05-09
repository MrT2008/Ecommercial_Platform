// src/components/SearchBar.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearch } from "../hooks/searchContext";

const SearchBar = () => {
  const { setSearchQuery } = useSearch();

  return (
    <div className="flex w-full mx-auto relative">
      <FontAwesomeIcon
        icon={faSearch}
        className="w-1/12 p-2.5 rounded-2xl rounded-r-none bg-gray-200"
      />
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="What are you looking for?"
          className="w-full pt-1.5 pb-1.5 pl-3 pr-1 rounded-2xl bg-gray-200 outline-0 rounded-l-none"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;