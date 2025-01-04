import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import BecomeMentorPage from "./pages/BecomeMentorPage";
import ContactUsPage from "./pages/ContactUsPage";
import AllMentorsPage from "./pages/AllMentorsPage";
import MentorProfilePage from "./pages/MentorProfilePage";
import BookMeetingPage from "./pages/BookMeetingPage";
import BecomeTutorPage from "./pages/BecomeTutorPage";
import MenteeProfilePage from "./pages/MenteeProfilePage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import Notifications from "./components/Notifications.jsx";
import Settings from "./components/Settings.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import React, { useEffect } from "react";
import Logout from "./pages/Logout.jsx";

function App() {
  useEffect(() => {
    fetch("http://localhost:4000/api")
      .then((res) => res.text())
      .then((data) => console.log(data)) // Log or handle response data
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/become-a-mentor" element={<BecomeMentorPage />} />
        <Route path="/become-mentor" element={<BecomeTutorPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/all-mentors" element={<AllMentorsPage />} />
        <Route path="/mentor/:id" element={<MentorProfilePage />} />
        <Route path="/book-meeting/:id" element={<BookMeetingPage />} />
        <Route
          path="/mentee-profile"
          element={
            <ProtectedRoute allowedRole="mentee">
              <MenteeProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor-profile"
          element={
            <ProtectedRoute allowedRole="mentor">
              <MentorProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
