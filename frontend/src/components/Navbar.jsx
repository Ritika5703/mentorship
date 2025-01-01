import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md rounded-b-lg fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Updated Logo */}
        <Link
          to="/"
          className="text-xl font-extrabold text-[#388E3C] flex items-center"
        >
          <span className="mr-2 text-2xl">Mentor</span>
          <span className="text-[#FF9800] text-xl">Connect</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/all-mentors"
            className="text-gray-700 hover:text-teal-600 font-medium transition duration-300"
          >
            All mentors
          </Link>
          <Link
            to="/become-a-mentor"
            className="text-gray-700 hover:text-teal-600 font-medium transition duration-300"
          >
            Become a mentor
          </Link>
          <Link
            to="/contact-us"
            className="text-gray-700 hover:text-teal-600 font-medium transition duration-300"
          >
            Contact us
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="text-teal-600 border border-teal-600 px-4 py-2 rounded-lg hover:bg-teal-100 transition duration-300"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-300"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
