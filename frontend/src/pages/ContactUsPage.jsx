import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="bg-gradient-to-b from-[#E6FFFA] to-[#38B2AC] min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center py-16 px-6">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side - Contact Form */}
          <div className="w-full lg:w-1/2 space-y-8 bg-white p-8 rounded-2xl shadow-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 mt-20">
            <h1 className="text-5xl font-bold text-[#388E3C] text-center mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-[#4A5568] text-center">
              We value your feedback. Get in touch with us!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-[#4A5568]"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-[#F9F9F9] border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#388E3C] shadow-sm transition duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-[#4A5568]"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-[#F9F9F9] border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#388E3C] shadow-sm transition duration-300"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-lg font-medium text-[#4A5568]"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full p-4 bg-[#F9F9F9] border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#388E3C] shadow-sm transition duration-300"
                  placeholder="Write your message here"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#FF9800] to-[#F57C00] text-white text-lg font-bold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Map */}
          <div className="w-full lg:w-1/2 space-y-6 flex flex-col items-center">
            <h2 className="text-4xl font-bold text-[#388E3C] text-center">
              Our Location
            </h2>
            <p className="text-lg text-[#4A5568] text-center">
              Visit us to connect in person.
            </p>
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.14571458558!2d72.71637318028606!3d19.082177512541435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1732640984468!5m2!1sen!2sin"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: "0" }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
