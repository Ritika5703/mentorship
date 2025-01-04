import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response data:", data); // Log the response data for debugging

      if (response.ok && data.success) {
        // Show success message
        setSuccessMessage(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error("Submission failed:", data);
        // Optionally, you can set an error message state here to display in the UI
      }
    } catch (error) {
      console.error("Error:", error);
      // Optionally, you can set an error message state here to display in the UI
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#E6FFFA] via-[#B2F5EA] to-[#38B2AC] min-h-screen pt-20">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* Contact Form */}
          <div className="w-full lg:w-2/5 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#388E3C] to-[#4CAF50] bg-clip-text text-transparent">
                Get in Touch
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-[#388E3C] to-[#4CAF50] rounded-full mt-2"></div>
              <p className="text-gray-600 mt-4">
                Have questions? We'd love to hear from you.
              </p>
            </div>
            {!successMessage ? (
              <>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-gray-50/50 border-b-2 border-gray-200 rounded-t-lg focus:border-[#388E3C] focus:outline-none transition-all peer placeholder-transparent"
                        placeholder="Full Name"
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-4 -top-2.5 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm"
                      >
                        Full Name
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-gray-50/50 border-b-2 border-gray-200 rounded-t-lg focus:border-[#388E3C] focus:outline-none transition-all peer placeholder-transparent"
                        placeholder="Email Address"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-4 -top-2.5 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                    </div>

                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full p-4 bg-gray-50/50 border-b-2 border-gray-200 rounded-t-lg focus:border-[#388E3C] focus:outline-none transition-all peer placeholder-transparent"
                        placeholder="Your Message"
                      />
                      <label
                        htmlFor="message"
                        className="absolute left-4 -top-2.5 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm"
                      >
                        Your Message
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#388E3C] to-[#4CAF50] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#388E3C]">
                  Thank You for Contacting Us!
                </h2>
                <p className="text-gray-600 mt-4">
                  We appreciate your message and will get back to you shortly.
                </p>
              </div>
            )}
          </div>

          {/* Map Section */}
          <div className="w-full lg:w-1/2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#388E3C]">
                Visit Our Office
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#388E3C] to-[#4CAF50] rounded-full mt-2"></div>
              <p className="text-gray-600 mt-4">
                Stop by for a coffee and a chat.
              </p>
            </div>

            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.14571458558!2d72.71637318028606!3d19.082177512541435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1732640984468!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
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
