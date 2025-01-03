import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MentorCard from "../components/MentorCard ";
import axios from "axios";
import Loader from "../components/Loader";

const AllMentorsPage = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch mentors from the backend
    const fetchMentors = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/mentor");
        setMentors(response.data); // Assuming the API returns an array of mentors
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch mentors");
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex pt-20">
        <Sidebar />
        <main className="flex-grow p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor, index) => (
            <MentorCard
              key={mentor._id || index}
              id={mentor._id} // Use the mentor's unique ID from the backend
              name={mentor.name}
              role={mentor.expertise} // Update to match your backend schema
              rating={mentor.rating}
              price={mentor.price}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default AllMentorsPage;
