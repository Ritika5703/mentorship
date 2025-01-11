import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    about: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch user profile when the component is mounted
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get("http://localhost:4000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        alert("Error fetching profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Function to compress image
  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Max dimension
          const MAX_DIMENSION = 800;
          if (width > height && width > MAX_DIMENSION) {
            height *= MAX_DIMENSION / width;
            width = MAX_DIMENSION;
          } else if (height > MAX_DIMENSION) {
            width *= MAX_DIMENSION / height;
            height = MAX_DIMENSION;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to blob
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            file.type,
            0.7
          ); // 0.7 quality
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle image file upload and compression
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedBlob = await compressImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            profilePicture: reader.result,
          }));
        };
        reader.readAsDataURL(compressedBlob);
      } catch (error) {
        console.error("Error processing image:", error);
        alert("Error processing image. Please try a different image.");
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile update
  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.put(
        "http://localhost:4000/api/profile/update",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to update profile");
      }
    }
  };

  // If loading, show the loader component
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-gradient-to-r from-[#E6FFFA] to-[#38B2AC] min-h-screen pt-20">
      <div className="container mx-auto py-16 px-6">
        <div className="max-w-5xl mx-auto bg-white shadow-lg p-6 rounded-lg overflow-hidden flex flex-col items-center">
            <h1 className="text-4xl font-bold text-[#388E3C]">
              Edit Your Profile
            </h1>

            <form className="space-y-6 mt-8 w-full max-w-lg  flex items-center flex-col">
              {/* Profile Picture */}
              <div className="w-full">
                <label
                  htmlFor="profilePicture"
                  className="block text-lg font-medium text-gray-700"
                >
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="mt-4 p-2 border-2 border-gray-300 rounded-lg w-full"
                />
                {formData.profilePicture && (
                  <div className="mt-4 self-center w-full flex justify-center">
                    <img
                      src={formData.profilePicture}
                      alt="Profile Preview"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  </div>
                )}
              </div>

              {/* Name Field */}
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-green-300 rounded-lg mt-2"
                />
              </div>

              {/* Email Field */}
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-green-300 rounded-lg mt-2"
                />
              </div>

              {/* Location Field */}
              <div className="w-full">
                <label
                  htmlFor="location"
                  className="block text-lg font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-green-300 rounded-lg mt-2"
                />
              </div>

              {/* About Field */}
              <div className="w-full">
                <label
                  htmlFor="about"
                  className="block text-lg font-medium text-gray-700"
                >
                  About
                </label>
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-green-300 rounded-lg mt-2"
                  rows="4"
                />
              </div>

              <div className="text-center mt-6 clas">
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="bg-[#FF9800] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#F57C00] transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
