import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Navigate to user profile page
  const handleProfileClick = () => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <div
      className="fixed top-4 right-4 bg-white shadow-lg p-4 rounded-lg flex items-center space-x-4 cursor-pointer transition-all transform hover:scale-105"
      style={{
        zIndex: 1000,
        opacity: 1,
        transform: "translateY(0)",
        transition: "transform 0.3s ease, opacity 0.3s ease",
      }}
    >
      {/* Profile Picture */}
      <div
        className="relative w-16 h-16 cursor-pointer"
        onClick={handleProfileClick}
      >
        <img
          src={user.profilePicture || "https://via.placeholder.com/50"}
          alt="Profile"
          className="w-full h-full rounded-full border-2 border-teal-500 hover:border-teal-600 transition duration-300"
        />
      </div>

      {/* User Info */}
      <div className="flex flex-col items-start">
        <span className="font-semibold text-xl text-gray-800">{user.name}</span>
        <button
          onClick={logout}
          className="text-sm text-red-600 hover:text-red-800 mt-2 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
