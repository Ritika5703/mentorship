import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-1/4 p-6 bg-gray-100">
      <h2 className="text-lg font-semibold text-teal-600 mb-4">
        All Categories
      </h2>
      <ul className="space-y-2">
        {[
          "All Mentors",
          "Design",
          "Startup",
          "Engineering",
          "Product",
          "Marketing",
          "Leadership",
          "Top Mentors",
        ].map((category, index) => (
          <li key={index}>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              {category}
            </label>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold text-teal-600 mt-6 mb-4">Price</h2>
      <input type="range" min="0" max="2000" className="w-full" />
    </aside>
  );
};

export default Sidebar;
