import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AOS from "aos"; // Import AOS library for animations
import "aos/dist/aos.css"; // Import AOS styles
import MentorCarousel from "../components/MentorCarousel";

const BecomeMentorPage = () => {
  useEffect(() => {
    // Initialize AOS for animations
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="pt-20 bg-gradient-to-r from-teal-500 to-blue-600">
      {/* Hero Section with Background Image */}
      <section
        className="relative bg-cover bg-center h-[40vh] md:h-[70vh] text-center py-20 text-white"
        style={{
          backgroundImage: `url('https://cdn.pixabay.com/photo/2024/03/27/04/59/ai-generated-8658200_1280.jpg')`, // Add a relevant background image URL here
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>{" "}
        {/* Darker overlay for better text visibility */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate__animated animate__fadeIn animate__delay-1s">
            Empower the Future.
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate__animated animate__fadeIn animate__delay-1s">
            Share Your Knowledge. Become a Mentor Today.
          </p>
          <div className="flex justify-center gap-8">
            <Link
              to="/become-mentor" // Update this path to navigate to BecomeTutorPage
              className="bg-gradient-to-r from-teal-400 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-teal-700 transition-all animate__animated animate__fadeIn animate__delay-2s"
            >
              Become a Mentor
            </Link>
            <Link
              to="/faq"
              className="bg-teal-300 text-teal-800 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-teal-400 transition-all animate__animated animate__fadeIn animate__delay-2s"
            >
              FAQ
            </Link>
          </div>
        </div>
      </section>
      {/* How it Works Section */}
      <section className="py-12 bg-teal-50 text-center">
        <h2 className="text-3xl font-semibold text-teal-600 mb-8">
          How It Works
        </h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-teal-600 text-3xl mb-4">1</div>
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              Sign Up
            </h3>
            <p className="text-gray-700 text-sm">
              Register as a mentor and create your profile.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-teal-600 text-3xl mb-4">2</div>
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              Customize Profile
            </h3>
            <p className="text-gray-700 text-sm">
              Personalize your profile to showcase your expertise.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-teal-600 text-3xl mb-4">3</div>
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              Connect with Mentees
            </h3>
            <p className="text-gray-700 text-sm">
              Start mentoring and connect with mentees.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-teal-600 text-3xl mb-4">4</div>
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              Achieve Milestones
            </h3>
            <p className="text-gray-700 text-sm">
              Help your mentees achieve their goals and track progress.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section with Animations */}
      <section className="py-16 bg-gradient-to-r from-blue-100 to-teal-200 text-center">
        <h2
          className="text-3xl font-semibold text-teal-600 mb-12 animate__animated animate__fadeIn"
          data-aos="fade-up"
        >
          Guiding mentees from every corner of the world!
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            {
              stat: "99%",
              label: "Trust",
              imgSrc:
                "https://static.vecteezy.com/system/resources/previews/042/160/537/non_2x/cooperation-accepted-concept-flat-isometric-3d-illustration-vector.jpg",
            },
            {
              stat: "50k+",
              label: "Sessions",
              imgSrc:
                "https://static.vecteezy.com/system/resources/thumbnails/049/476/941/small_2x/leader-supervising-office-worker-in-creative-startup-vector.jpg",
            },
            {
              stat: "15,000+",
              label: "Mentees",
              imgSrc:
                "https://img.freepik.com/premium-vector/smiling-young-man-student-freelancer-with-laptop-books-3d-character-thinking-about-education_313242-1595.jpg",
            },
            {
              stat: "€2M",
              label: "Paid to Mentors",
              imgSrc:
                "https://static.vecteezy.com/system/resources/thumbnails/010/871/644/small_2x/3d-online-webinars-for-business-png.png",
            },
          ].map(({ stat, label, imgSrc }, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all animate__animated animate__fadeIn animate__delay-1s"
              data-aos="zoom-in"
            >
              <img
                src={`${imgSrc}`}
                alt={label}
                className="mb-4 mx-auto"
                style={{ maxWidth: "120px", maxHeight: "120px" }}
              />
              <h3 className="text-3xl font-semibold text-teal-600 mb-3">
                {stat}
              </h3>
              <p className="text-gray-700">{label}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Mentor Testimonials Section */}
      <section className="py-16 bg-white text-center">
        <h2
          className="text-3xl font-semibold text-teal-600 mb-12"
          data-aos="fade-up"
        >
          Hear from our mentors
        </h2>

        {/* Insert the MentorCarousel component here */}
        <MentorCarousel />
      </section>
      {/* FAQ Section */}
      <section className="py-16 bg-teal-50 text-center">
        <h2
          className="text-3xl font-semibold text-teal-600 mb-8 animate__animated animate__fadeIn"
          data-aos="fade-up"
        >
          Frequently Asked Questions
        </h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              question: "What is a role of a mentor?",
              answer:
                "A mentor provides guidance, support, and advice to help others achieve their personal and professional goals.",
            },
            {
              question: "How do I become a mentor?",
              answer:
                "To become a mentor, simply sign up through our platform and customize your profile to match your skills and interests.",
            },
            {
              question: "What kind of support will I receive?",
              answer:
                "We offer resources and training materials to help you succeed as a mentor. Additionally, our support team is available to assist you throughout your journey.",
            },
          ].map(({ question, answer }, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all animate__animated animate__fadeIn animate__delay-1s"
              data-aos="fade-up"
            >
              <h4 className="text-xl font-semibold text-teal-600 mb-4">
                {question}
              </h4>
              <p className="text-gray-700">{answer}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            to="/faq"
            className="text-teal-600 hover:text-teal-800 font-semibold inline-flex items-center"
          >
            View all FAQ
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="py-16 bg-teal-600 text-center text-white">
        <h3 className="text-2xl md:text-3xl font-extrabold mb-4 animate__animated animate__fadeIn">
          Make a Difference. Share Your Expertise. Empower Future Leaders.
        </h3>
        <Link
          to="/become-mentor"
          className="px-8 py-4 bg-white rounded-xl text-teal-600 font-semibold shadow-md hover:bg-teal-100 transition-all animate__animated animate__fadeIn"
        >
          Become a Mentor
        </Link>
      </section>
      <Footer />
    </div>
  );
};

export default BecomeMentorPage;
