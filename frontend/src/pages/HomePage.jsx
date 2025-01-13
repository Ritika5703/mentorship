import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  const [mentors, setMentors] = useState([]);
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/mentor/all-mentors"
        );
        const data = await response.json();
        setMentors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <header
        className="relative bg-cover bg-center w-full min-h-[60vh] md:min-h-[90vh]"
        style={{
          backgroundImage:
            "url('https://www.aaha.org/wp-content/uploads/2024/08/RetentionSeries_Mentorship1_625x325-1500x1024.jpg')",
        }}
      >
        {/* Overlay Section */}
        <div className="absolute inset-0 bg-teal-900 bg-opacity-60"></div>

        {/* Centered Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 md:px-8">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 md:mb-8 text-center">
            Step into your future career <br className="hidden md:block" />
            with confidence
          </h1>
          <Link
            to="/all-mentors"
            className="inline-block px-6 md:px-8 py-3 md:py-4 bg-teal-600 text-white font-semibold text-base md:text-lg rounded-lg shadow-lg hover:bg-teal-500 transition-all duration-300"
          >
            Find your mentor
          </Link>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-teal-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            {[
              { stat: "1k+", label: "Mentors" },
              { stat: "50k+", label: "Mentees" },
              { stat: "90%", label: "Happy Matches" },
              { stat: "150+", label: "Industries" },
            ].map(({ stat, label }, idx) => (
              <motion.div
                key={idx}
                className="p-4 md:p-8 bg-gradient-to-r from-teal-100 to-teal-200 rounded-lg shadow-lg hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-2xl md:text-3xl font-semibold text-teal-600 mb-2 md:mb-3">
                  {stat}
                </h3>
                <p className="text-sm md:text-base text-gray-700">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-teal-600">
            How it works
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            {[
              { step: "Find a mentor", bg: "bg-teal-300" },
              { step: "Book a meeting", bg: "bg-teal-400" },
              { step: "Booking confirmation", bg: "bg-teal-600" },
            ].map(({ step, bg }, idx) => (
              <motion.div
                key={idx}
                className={`flex items-center justify-center w-24 md:w-28 h-24 md:h-28 rounded-full shadow-md ${bg} mb-4 md:mb-0`}
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-center text-xs md:text-sm font-semibold text-gray-800 leading-snug px-2">
                  {step}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Mentors Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-teal-600">
            Discover 1k+ mentors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[...Array(4)].map((_, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 md:p-6 hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-20 md:w-24 h-20 md:h-24 overflow-hidden rounded-full mb-4 md:mb-6">
                  <img
                    src="https://img.freepik.com/free-photo/lifestyle-beauty-fashion-people-emotions-concept-young-asian-female-office-manager-ceo-with-pleased-expression-standing-white-background-smiling-with-arms-crossed-chest_1258-59329.jpg?semt=ais_hybrid"
                    alt="Mentor"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-teal-600">
                  Name Surname
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  UX/UI designer
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="py-12 md:py-16 bg-cover bg-center relative text-center"
        style={{
          backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-learning-reading-knowledge-accumulation-psd-layering-image_191359.jpg')`,
        }}
      >
        {/* Semi-transparent white overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-50"></div>

        {/* Content */}
        <div className="relative py-12 md:py-12 mx-auto">
          <h3 className="text-xl md:text-2xl font-extrabold mb-4 text-teal-600">
            Want to share your knowledge with others?
          </h3>
          <Link
            to="/login"
            className="inline-block px-6 md:px-8 py-3 md:py-4 bg-teal-600 rounded-xl text-white font-semibold shadow-md hover:bg-teal-700 transition-all"
          >
            Become a mentor
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
