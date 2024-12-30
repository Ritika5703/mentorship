import React from "react";

const FilterSortBar = ({
  currentFilter,
  onFilterChange,
  onSortChange,
  sortOption,
}) => {
  const tags = [
    "All",
    "UX/UI design",
    "Front-end development",
    "Back-end development",
    "Finances",
  ];
  const sortOptions = ["Latest", "Shortest"];

  return (
    <div className="flex justify-between items-center mb-8">
      {/* Filter Dropdown */}
      <div className="relative">
        <select
          value={currentFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition"
        >
          {tags.map((tag) => (
            <option key={tag} value={tag} className="text-gray-800">
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option} className="text-gray-800">
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSortBar;
