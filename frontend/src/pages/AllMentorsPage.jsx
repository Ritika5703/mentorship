import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MentorCard from "../components/MentorCard ";

const mentors = [
  { name: "Name Surname", role: "UX/UI Designer", rating: 4.9, price: 65 },
  { name: "John Doe", role: "Startup Coach", rating: 4.8, price: 80 },
  // Add more mentor data here
];

const AllMentorsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex pt-20">
        <Sidebar />
        <main className="flex-grow p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor, index) => (
            <MentorCard
              key={index}
              name={mentor.name}
              role={mentor.role}
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
