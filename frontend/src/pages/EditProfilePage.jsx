import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();

  // Assuming we retrieve the current user profile from the context or state
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [location, setLocation] = useState("New York, USA");
  const [bio, setBio] = useState(
    "Aspiring software developer looking to connect with experienced mentors in web development."
  );
  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/150"
  );

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

  const handleSaveChanges = () => {
    // Here you would save the data to the server or update global state
    alert("Profile updated successfully!");
    navigate("/mentee-profile");
  };

  return (
    <div className="bg-gradient-to-r from-[#E6FFFA] to-[#38B2AC] min-h-screen">
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
