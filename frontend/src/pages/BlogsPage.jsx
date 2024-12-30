import React, { useState } from "react";
import BlogCard from "../components/BlogCard";
import FeaturedBlog from "../components/FeaturedBlog";
import FilterSortBar from "../components/FilterSortBar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const BlogsPage = () => {
  const featuredBlog = {
    title: "Mastering Backend Development with Node.js",
    date: "May 12th, 2024",
    readTime: "15",
    description:
      "Discover how Node.js can streamline your backend workflows. From building REST APIs to real-time applications, explore practical examples and tips to elevate your backend development skills.",
    tag: "Back-end development",
  };

  const allBlogs = [
    {
      title: "Crafting Stunning User Interfaces with Figma",
      date: "February 21st, 2024",
      readTime: "10",
      tag: "UX/UI design",
    },
    {
      title: "Building Scalable Frontend Applications with React",
      date: "June 20th, 2024",
      readTime: "16",
      tag: "Front-end development",
    },
    {
      title: "Finance 101 for Freelance Developers",
      date: "January 2nd, 2024",
      readTime: "22",
      tag: "Finances",
    },
  ];

  const [filterTag, setFilterTag] = useState("All");
  const [sortOption, setSortOption] = useState("Latest");

  // Apply Filters
  const filteredBlogs =
    filterTag === "All"
      ? allBlogs
      : allBlogs.filter((blog) => blog.tag === filterTag);

  // Apply Sorting
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortOption === "Latest") {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortOption === "Shortest") {
      return a.readTime - b.readTime;
    }
    return 0;
  });

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 px-4 pt-20">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Our Blogs</h1>

        {/* Filter & Sort Bar */}
        <FilterSortBar
          currentFilter={filterTag}
          onFilterChange={(newFilter) => setFilterTag(newFilter)}
          onSortChange={(newSort) => setSortOption(newSort)}
          sortOption={sortOption}
        />

        {/* Featured Blog Section */}
        <section className="my-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Featured this week
          </h2>
          <div className="shadow-lg rounded-xl p-6 bg-teal-50">
            <FeaturedBlog {...featuredBlog} />
          </div>
        </section>

        {/* Divider */}
        <hr className="my-12 border-t-2 border-gray-200" />

        {/* All Blogs Section */}
        <section className="my-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            All Blogs
          </h2>
          {sortedBlogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedBlogs.map((blog, index) => (
                <BlogCard key={index} {...blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-600">
                No blogs found for the selected filter.
              </h3>
              <p className="text-gray-500 mt-4">
                Try selecting a different filter or resetting filters.
              </p>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default BlogsPage;
