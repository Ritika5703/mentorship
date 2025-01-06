import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();

  // State variables to hold the user profile data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(true); // To show a loading state while fetching data

  // Fetching the profile data when the component mounts
  useEffect(() => {
    // Replace with your actual API endpoint to fetch the user profile
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/user/profile", {
          method: "GET",
          headers: {
            Authorization: "Bearer your-auth-token", // Add the auth token if necessary
          },
        });
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
        setLocation(data.location);
        setBio(data.bio);
        setProfilePicture(
          data.profilePicture || "https://via.placeholder.com/150"
        ); // Default picture if not available
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };

    fetchUserProfile();
  }, []);

  // Handle file upload for the profile picture
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle saving the changes
  const handleSaveChanges = async () => {
    // Create an object with the updated profile data
    const updatedProfile = {
      name,
      email,
      location,
      bio,
      profilePicture,
    };

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT", // Use PUT for updating resources
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your-auth-token", // Add the auth token if necessary
        },
        body: JSON.stringify(updatedProfile), // Send the updated profile data
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        navigate("/profile"); // Redirect to the profile page after success
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to update profile");
    }
  };

  // If the profile is still loading, show a loading spinner or message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-[#E6FFFA] to-[#38B2AC] min-h-screen pt-20">
      <div className="container mx-auto py-16 px-6">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-[#388E3C]">
              Edit Your Profile
            </h1>

            <form className="space-y-6 mt-8">
              {/* Profile Picture */}
              <div>
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
                  className="mt-4 p-2 border-2 border-gray-300 rounded-lg"
                />
                <div className="mt-4">
                  {profilePicture && (
                    <img
                      src={profilePicture}
                      alt="Profile Preview"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  )}
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 border-2 border-green-300 rounded-lg mt-2"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 border-2 border-green-300 rounded-lg mt-2"
                />
              </div>

              {/* Location Field */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-lg font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-4 border-2 border-green-300 rounded-lg mt-2"
                />
              </div>

              {/* Bio Field */}
              <div>
                <label
                  htmlFor="bio"
                  className="block text-lg font-medium text-gray-700"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-4 border-2 border-green-300 rounded-lg mt-2"
                  rows="4"
                />
              </div>

              {/* Save Button */}
              <div className="text-center mt-6">
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
    </div>
  );
};

export default EditProfilePage;
