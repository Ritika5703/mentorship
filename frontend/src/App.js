import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import ContactUsPage from "./pages/ContactUsPage";
import AllMentorsPage from "./pages/AllMentorsPage";
import MentorProfilePage from "./pages/MentorProfilePage";
import BookMeetingPage from "./pages/BookMeetingPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import Notifications from "./components/Notifications.jsx";
import Settings from "./components/Settings.jsx";
import React from "react";
import Logout from "./pages/Logout.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/all-mentors" element={<AllMentorsPage />} />
        <Route path="/mentor/:id" element={<MentorProfilePage />} />
        <Route path="/book-meeting/:id" element={<BookMeetingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
