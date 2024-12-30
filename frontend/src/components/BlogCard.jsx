import React from "react";

const BlogCard = ({ title, date, readTime, tag }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-all">
      <img
        src={`https://via.placeholder.com/300x150.png?text=${tag}`}
        alt={`${tag}`}
        className="rounded-md mb-4"
      />
      <span className="bg-teal-100 text-teal-600 text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block">
        {tag}
      </span>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-500">
        {date} • {readTime} min read
      </p>
      <a
        href="#"
        className="text-teal-600 text-sm font-medium hover:underline mt-4 block"
      >
        Read more →
      </a>
    </div>
  );
};

export default BlogCard;
