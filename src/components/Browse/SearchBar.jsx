import "./SearchBar.css";
import { motion, useScroll, useTransform } from "framer-motion";

function SearchBar({ searchText, setSearchText, categoryFilter, setCategoryFilter, sortOption, setSortOption }) {
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="search-bar">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search campaigns..."
        value={searchText}
        onChange={handleSearchChange}
      />

      {/* Category Filter */}
      <select value={categoryFilter} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="sports">Sports</option>
        <option value="education">Education</option>
        <option value="hobbies">Hobbies</option>
        <option value="health">Health</option>
        <option value="dreams">Dreams</option>
      </select>

      {/* Sort Options */}
      <select value={sortOption} onChange={handleSortChange}>
        <option value="">Sort by</option>
        <option value="newest">Newest</option>
        <option value="endingSoon">Ending Soon</option>
        <option value="goalAsc">Goal: Low → High</option>
        <option value="goalDesc">Goal: High → Low</option>
        <option value="raisedAsc">Raised: Low → High</option>
        <option value="raisedDesc">Raised: High → Low</option>
      </select>
    </div>
  );
}

export default SearchBar;
