import React from "react";
import { useNavigate } from "react-router-dom";

const MentorCard = ({ id, name, role, rating, price }) => {
  console.log(id);
  
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/mentor/${id}`); // Navigate to the profile page of the specific mentor
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-center">
      <div className="h-32 w-32 bg-gray-200 mx-auto mb-4 rounded-full"></div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{role}</p>
      <div className="text-yellow-500 text-sm mt-2">
        {rating} ⭐ (25 reviews)
      </div>
      <p className="text-teal-600 font-bold text-lg mt-2">{price} €/hour</p>
      <button
        className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md"
        onClick={handleViewProfile}
      >
        View Profile
      </button>
    </div>
  );
};

export default MentorCard;
