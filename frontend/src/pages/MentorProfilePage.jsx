import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const MentorProfilePage = () => {
  const { id } = useParams(); // Get the mentor id from the URL
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/mentor/${id}`
        );
        setMentor(response.data.mentor);
        setLoading(false);
      } catch (err) {
        setError("Failed to load mentor data");
        setLoading(false);
      }
    };

    fetchMentorData();
  }, [id]); // Fetch data when the id changes

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-12 pt-40">
        <div className="container mx-auto px-6 space-y-12">
          {/* Top Section */}
          <div className="flex items-start space-x-8">
            {/* Profile Picture */}
            <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
            {/* Mentor Details */}
            <div className="flex-grow">
              <h1 className="text-2xl font-bold">{mentor.name}</h1>
              <p className="text-gray-600">{mentor.expertise}</p>
              <p className="text-sm text-gray-500">{mentor.rating} ⭐</p>
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
            {/* <div className="bg-gray-100 p-6 rounded-lg w-64">
              <h2 className="text-lg font-semibold mb-4">Services</h2>
              <ul className="text-sm text-gray-600 mb-4">
                {mentor.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
              <h2 className="text-lg font-semibold mb-4">Availability</h2>
              <p className="text-sm text-gray-600">{mentor.location}</p>
              <p className="text-sm text-gray-600">{mentor.price}€/hour</p>
            </div> */}
          </div>

          {/* About Section */}
          {/* <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-sm text-gray-600">{mentor.description}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Skills</h3>
              <div className="flex space-x-2 mt-2">
                {mentor.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 text-sm text-gray-700 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div> */}

          {/* Reviews Section
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            {mentor.reviews.map((review, index) => (
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
          </div> */}

          {/* Blogs Section
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Blogs of {mentor.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mentor.blogs.map((blog) => (
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
          </div> */}

          {/* Similar Mentors Section */}
          {/* <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Similar Mentors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mentor.similarMentors.map((similarMentor, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
                  <h3 className="text-sm font-semibold">
                    {similarMentor.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {similarMentor.experience}
                  </p>
                  <p className="text-sm text-gray-700">{similarMentor.price}</p>
                  <button className="text-teal-600 text-sm mt-2">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentorProfilePage;
