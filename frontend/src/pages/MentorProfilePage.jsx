import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const MentorProfilePage = () => {
  const reviews = [
    {
      name: "Ron",
      rating: 5,
      date: "2024-11-01",
      text: "Great mentor! Very knowledgeable and helpful.",
    },
    {
      name: "Tom",
      rating: 4,
      date: "2024-10-15",
      text: "Helpful and patient. Answered all my questions.",
    },
    {
      name: "Rachel",
      rating: 5,
      date: "2024-10-05",
      text: "Amazing experience. Highly recommend!",
    },
    {
      name: "Mai",
      rating: 5,
      date: "2024-09-20",
      text: "Excellent insights and guidance. Worth every penny!",
    },
  ];

  const blogs = [
    { id: 1, title: "Headline of the blog #1", date: "2024-10-01" },
    { id: 2, title: "Headline of the blog #2", date: "2024-09-15" },
    { id: 3, title: "Headline of the blog #3", date: "2024-08-30" },
  ];

  const similarMentors = [
    { name: "Mentor 1", experience: "5 years", price: "50€ / hour" },
    { name: "Mentor 2", experience: "3 years", price: "65€ / hour" },
    { name: "Mentor 3", experience: "10 years", price: "90€ / hour" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12 pt-40">
        <div className="container mx-auto px-6 space-y-12">
          {/* Top Section */}
          <div className="flex items-start space-x-8">
            {/* Profile Picture */}
            <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
            {/* Mentor Details */}
            <div className="flex-grow">
              <h1 className="text-2xl font-bold">Name Surname</h1>
              <p className="text-gray-600">UX/UI Designer</p>
              <p className="text-sm text-gray-500">4.9 ⭐ (25 reviews)</p>
              <div className="mt-4 space-x-4">
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg">
                  Contact Mentor
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
                  Book a Meeting
                </button>
                <Link
                  to="/book-meeting"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold"
                >
                  Book a meeting
                </Link>
              </div>
            </div>
            {/* Services and Availability */}
            <div className="bg-gray-100 p-6 rounded-lg w-64">
              <h2 className="text-lg font-semibold mb-4">Services</h2>
              <ul className="text-sm text-gray-600 mb-4">
                <li>Consulting</li>
                <li>Case reviews</li>
                <li>Feedback sessions</li>
              </ul>
              <h2 className="text-lg font-semibold mb-4">Availability</h2>
              <p className="text-sm text-gray-600">Location: Lithuania</p>
              <p className="text-sm text-gray-600">50€/hour</p>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              pulvinar risus sit amet diam facilisis, non tincidunt tortor
              interdum.
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Skills</h3>
              <div className="flex space-x-2 mt-2">
                <span className="px-3 py-1 bg-gray-200 text-sm text-gray-700 rounded-lg">
                  Figma
                </span>
                <span className="px-3 py-1 bg-gray-200 text-sm text-gray-700 rounded-lg">
                  HTML
                </span>
                <span className="px-3 py-1 bg-gray-200 text-sm text-gray-700 rounded-lg">
                  CSS
                </span>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            {reviews.map((review, index) => (
              <div key={index} className="mb-6 border-b border-gray-200 pb-4">
                <h3 className="text-sm font-semibold">{review.name}</h3>
                <p className="text-sm text-gray-600">
                  Rating: {review.rating} ⭐
                </p>
                <p className="text-sm text-gray-500">{review.date}</p>
                <p className="text-sm text-gray-700">{review.text}</p>
              </div>
            ))}
            <button className="text-teal-600 text-sm">See more reviews</button>
          </div>

          {/* Blogs Section */}
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Blogs of &lt;Name&gt;
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {blogs.map((blog) => (
                <div key={blog.id} className="bg-gray-100 p-4 rounded-lg">
                  <div className="w-full h-32 bg-gray-300 rounded-lg mb-4"></div>
                  <h3 className="text-sm font-semibold">{blog.title}</h3>
                  <p className="text-sm text-gray-500">
                    Posted on: {blog.date}
                  </p>
                  <button className="text-teal-600 text-sm mt-2">
                    Read more
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Mentors Section */}
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Similar Mentors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {similarMentors.map((mentor, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
                  <h3 className="text-sm font-semibold">{mentor.name}</h3>
                  <p className="text-sm text-gray-500">{mentor.experience}</p>
                  <p className="text-sm text-gray-700">{mentor.price}</p>
                  <button className="text-teal-600 text-sm mt-2">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentorProfilePage;
