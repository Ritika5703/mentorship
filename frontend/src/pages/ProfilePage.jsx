import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import MentorRequestModal from "../components/MentorRequestModal"; // Ensure this component exists.
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [showMentorModal, setShowMentorModal] = useState(false);

  const { user, setUser } = useContext(AuthContext);

  const updateProfilePicture = async (newProfilePictureUrl) => {
    try {
      // Update the user context with the new profile picture URL
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: newProfilePictureUrl, // Update profile picture in context
      }));
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const handleProfilePictureUpdate = async (newProfilePictureBase64) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:4000/api/profile/update", // Endpoint to update profile
        { profilePicture: newProfilePictureBase64 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update profile picture in UI after successful backend update
      const updatedUser = response.data.user;
      updateProfilePicture(updatedUser.profilePicture); // Update profile picture in context
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error uploading profile picture:", err);
      setError("Failed to update profile picture");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.profilePicture) {
      // When user context changes (including profile picture), trigger a re-render
      // This ensures the updated image is immediately reflected in the UI
    }
  }, [user]);

  // const location = useLocation();
  // const { user } = location.state || {};
  // if (!user) {
  //   navigate("/login");
  // }

  // const handleCancelMeeting = async (meetingId) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     await axios.put(
  //       `http://localhost:4000/api/meetings/${meetingId}/cancel`,
  //       {},
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     // Update local state to reflect the cancellation
  //     setUser((prevUser) => ({
  //       ...prevUser,
  //       meetings: prevUser.meetings.map((meeting) =>
  //         meeting._id === meetingId
  //           ? { ...meeting, status: "cancelled" }
  //           : meeting
  //       ),
  //     }));
  //   } catch (err) {
  //     console.error("Error canceling meeting:", err);
  //     alert("Failed to cancel meeting");
  //   }
  // };

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        No user data found
      </div>
    );

  return (
    <div>
      <div className="bg-gray-50 min-h-screen pt-20">
        <div className="container mx-auto py-12 px-6">
          <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold">Profile</h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="text-teal-500 hover:underline"
                >
                  Edit Profile
                </button>
                {/* <button
                  onClick={() => navigate("/notifications")}
                  className="text-gray-500"
                >
                  Notifications
                </button> */}
                <button
                  onClick={() => navigate("/settings")}
                  className="text-gray-500"
                >
                  Settings
                </button>
              </div>
            </div>

            <div className="px-8 py-6 flex flex-col md:flex-row gap-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-teal-500 mx-auto md:mx-0">
                <img
                  src={
                    user.profilePicture
                      ? `${user.profilePicture}?${new Date().getTime()}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={`${user.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="pt-10 text-center md:text-left">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="px-8 py-4 border-t border-gray-200">
              <div className="flex flex-col md:flex-row gap-6">
                {["upcoming", "history", "certificates", "reviews"].map(
                  (tab) => (
                    <button
                      key={tab}
                      className={`pb-2 border-b-2 ${
                        selectedTab === tab
                          ? "border-teal-500 text-teal-500"
                          : "border-transparent text-gray-600"
                      }`}
                      onClick={() => setSelectedTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)} Meetings
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="px-8 py-6">
              {selectedTab === "upcoming" && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Upcoming Meetings</h3>
                  {user.meetings
                    .filter((meeting) => meeting.status === "upcoming")
                    .map((meeting) => (
                      <div
                        key={meeting._id}
                        className="bg-gray-100 p-4 rounded-lg mb-4"
                      >
                        <p>
                          <strong>Theme:</strong> {meeting.theme}
                        </p>
                        <p>
                          <strong>Mentor:</strong> {meeting.mentor.name}
                        </p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(meeting.date).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Reminder:</strong> {meeting.reminder} hours
                          before
                        </p>
                        <div className="mt-4 flex flex-col sm:flex-row gap-4">
                          <button className="bg-teal-500 text-white px-4 py-2 rounded-lg">
                            Join Meeting
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* Other Tabs */}
            </div>

            <div className="px-8 py-6 border-t border-gray-200">
              <h2 className="text-xl font-bold">About</h2>
              <p className="mt-4">{user.about}</p>
            </div>

            <div className="px-8 py-6 border-t border-gray-200">
              <h2 className="text-xl font-bold">Skills</h2>
              <div className="flex flex-wrap gap-2 mt-4">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm"
                  >
                    {skill.name} ({skill.level})
                  </span>
                ))}
              </div>
            </div>

            {user.role !== "mentor" && (
              <div className="px-8 py-6">
                <button
                  onClick={() => setShowMentorModal(true)}
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg"
                >
                  Become a Mentor
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <MentorRequestModal
        user={user}
        show={showMentorModal}
        onClose={() => setShowMentorModal(false)}
      />
    </div>
  );
};

export default ProfilePage;
