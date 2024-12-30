import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";

const MenteeProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("upcoming");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Using token:", token); // Debug token

        const response = await axios.get(
          "http://localhost:4000/api/mentee-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Profile response:", response.data); // Debug response
        setUser(response.data);
      } catch (err) {
        console.error("Full error object:", err); // Debug error
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const handleCancelMeeting = async (meetingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:4000/api/meetings/${meetingId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local state to reflect the cancellation
      setUser((prevUser) => ({
        ...prevUser,
        meetings: prevUser.meetings.map((meeting) =>
          meeting._id === meetingId
            ? { ...meeting, status: "cancelled" }
            : meeting
        ),
      }));
    } catch (err) {
      console.error("Error canceling meeting:", err);
      alert("Failed to cancel meeting");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
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
      <Navbar />
      <div className="bg-gray-50 min-h-screen pt-20">
        <div className="container mx-auto py-12 px-6">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Header Section */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold">Mentee Profile</h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="text-teal-500 hover:underline"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate("/notifications")}
                  className="text-gray-500"
                >
                  Notifications
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="text-gray-500"
                >
                  Settings
                </button>
              </div>
            </div>

            {/* Profile Details */}
            <div className="px-8 py-6 flex gap-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-teal-500">
                <img
                  src={user.profilePicture}
                  alt={`${user.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.username}</p>
                <p className="text-gray-600">{user.location}</p>
                <p className="text-gray-600 mt-4">
                  Years of experience: {user.experience}
                </p>
                <p className="text-gray-600">Education: {user.education}</p>
                <p className="text-gray-600">
                  MentorConnect meetings attended: {user.meetingsAttended}
                </p>
                <p className="text-gray-600">
                  Rating: {user.rating} ({user.reviews.length} reviews)
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-8 py-4 border-t border-gray-200">
              <div className="flex gap-6">
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

            {/* Tab Content */}
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
                        <div className="mt-4 flex gap-4">
                          <button className="bg-teal-500 text-white px-4 py-2 rounded-lg">
                            Join Meeting
                          </button>
                          <button
                            onClick={() => handleCancelMeeting(meeting._id)}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                          >
                            Cancel Meeting
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
              {selectedTab === "history" && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Meeting History</h3>
                  {user.meetings
                    .filter((meeting) => meeting.status === "completed")
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
                      </div>
                    ))}
                </div>
              )}
              {selectedTab === "certificates" && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Certificates</h3>
                  {user.certificates.map((cert) => (
                    <div
                      key={cert._id}
                      className="bg-gray-100 p-4 rounded-lg mb-4"
                    >
                      <p>
                        <strong>Name:</strong> {cert.name}
                      </p>
                      <p>
                        <strong>Issued:</strong>{" "}
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Issuer:</strong> {cert.issuer}
                      </p>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-500 hover:underline"
                      >
                        View Certificate
                      </a>
                    </div>
                  ))}
                </div>
              )}
              {selectedTab === "reviews" && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Reviews</h3>
                  {user.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-gray-100 p-4 rounded-lg mb-4"
                    >
                      <p>
                        <strong>Rating:</strong> {review.rating}/5
                      </p>
                      <p>
                        <strong>Comment:</strong> {review.comment}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* About Section */}
            <div className="px-8 py-6 border-t border-gray-200">
              <h2 className="text-xl font-bold">About</h2>
              <p className="mt-4">{user.about}</p>
            </div>

            {/* Skills Section */}
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MenteeProfilePage;
