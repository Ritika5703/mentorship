import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedin, logout, user } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    navigate(`/profile`);
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-md rounded-b-lg fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link
          to="/"
          className="text-xl font-extrabold text-[#388E3C] flex items-center"
        >
          <span className="mr-2 text-2xl">Mentor</span>
          <span className="text-[#FF9800] text-xl">Connect</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link
            to="/all-mentors"
            className="text-gray-700 hover:text-teal-600 font-medium transition duration-300"
          >
            All mentors
          </Link>
          <Link
            to="/contact-us"
            className="text-gray-700 hover:text-teal-600 font-medium transition duration-300"
          >
            Contact us
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedin ? (
            <div className="relative">
              <div className="relative cursor-pointer" onClick={toggleDropdown}>
                <img
                  src={user.profilePicture || "https://via.placeholder.com/50"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-teal-500 cursor-pointer hover:border-teal-600 transition duration-300"
                />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                  <button
                    onClick={handleProfileClick}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-teal-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
