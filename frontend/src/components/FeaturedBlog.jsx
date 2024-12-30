import React from "react";

const FeaturedBlog = ({ title, date, readTime, description, tag }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row p-6">
      <div className="w-full md:w-1/3">
        <img
          src="https://innostax.com/wp-content/uploads/2023/09/november-2019.png"
          alt="Featured Blog"
          className="rounded-md"
        />
      </div>
      <div className="md:ml-6 mt-4 md:mt-0">
        <span className="bg-teal-100 text-teal-600 text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block">
          {tag}
        </span>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-500 mb-4">
          {date} • {readTime} min read
        </p>
        <p className="text-gray-700 text-sm mb-4">{description}</p>
        <a
          href="#"
          className="text-teal-600 text-sm font-medium hover:underline"
        >
          Read more →
        </a>
      </div>
    </div>
  );
};

export default FeaturedBlog;
