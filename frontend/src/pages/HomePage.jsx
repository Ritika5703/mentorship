import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <header
        className="relative bg-cover bg-center w-full h-[40vh] md:h-[100vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://www.aaha.org/wp-content/uploads/2024/08/RetentionSeries_Mentorship1_625x325-1500x1024.jpg')",
        }}
      >
        <motion.div
          className="bg-teal-900 bg-opacity-60 text-white text-center px-8 py-16 md:py-20 w-full h-[100vh] md:h-[100vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-40 mb-8">
            Step into your future career <br />
            with confidence
          </h1>
          <Link
            to="/all-mentors"
            className="inline-block px-8 py-4 bg-teal-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-teal-500 transition-all duration-300"
          >
            Find your mentor
          </Link>
        </motion.div>
      </header>

      {/* Stats Section */}
      <section className="py-16  bg-gradient-to-b from-white to-teal-50">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { stat: "1k+", label: "Mentors", bg: "bg-teal-300" },
            { stat: "50k+", label: "Mentees", bg: "bg-teal-300" },
            { stat: "90%", label: "Happy Matches", bg: "bg-teal-300" },
            { stat: "150+", label: "Industries", bg: "bg-teal-300" },
          ].map(({ stat, label, bg }, idx) => (
            <motion.div
              key={idx}
              className="p-8 bg-gradient-to-r from-teal-100 to-teal-200 rounded-lg shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-3xl font-semibold text-teal-600 mb-3">
                {stat}
              </h3>
              <p className="text-gray-700">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-teal-600">
            How it works
          </h2>
          <div className="flex items-center justify-center gap-12">
            {[
              { step: "Find a mentor", bg: "bg-teal-300" },
              { step: "Book a meeting", bg: "bg-teal-400" },
              { step: "Booking confirmation", bg: "bg-teal-600" },
            ].map(({ step, bg }, idx) => (
              <motion.div
                key={idx}
                className={`flex flex-col items-center w-28 h-28 flex items-center justify-center rounded-full shadow-md ${bg}`}
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-center text-sm font-semibold text-gray-800 leading-snug">
                  {step}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Mentors Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-teal-600">
            Discover 1k+ mentors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-24 h-24 overflow-hidden rounded-full mb-6">
                  <img
                    src="https://img.freepik.com/free-photo/lifestyle-beauty-fashion-people-emotions-concept-young-asian-female-office-manager-ceo-with-pleased-expression-standing-white-background-smiling-with-arms-crossed-chest_1258-59329.jpg?semt=ais_hybrid"
                    alt="Mentor"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-lg font-semibold text-teal-600">
                  Name Surname
                </h3>
                <p className="text-sm text-gray-600">UX/UI designer</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="py-16 bg-cover bg-center text-center text-white"
        style={{
          backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-learning-reading-knowledge-accumulation-psd-layering-image_191359.jpg')`,
        }}
      >
        <h3 className="text-2xl font-extrabold mb-4">
          Want to share your knowledge with others?
        </h3>
        <Link
          to="/become-a-mentor"
          className="px-8 py-4 bg-teal-600 rounded-xl text-white font-semibold shadow-md hover:bg-teal-700 transition-all"
        >
          Become a mentor
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
