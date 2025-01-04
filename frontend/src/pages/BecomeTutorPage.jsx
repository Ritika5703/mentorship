import Footer from "../components/Footer";
import { useState } from "react";
import Navbar from "../components/Navbar";

const BecomeTutorPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expertise: "",
    price: "",
    rating: "",
    description: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        img: imageUrl,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-[#38B2AC] to-[#E6FFFA] flex items-center justify-center py-12 px-6 pt-20">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10 space-y-10 transform transition duration-300 ease-in-out hover:scale-105">
          {/* Heading */}
          <h1 className="text-5xl font-extrabold text-[#388E3C] text-center mb-6">
            Become a Tutor
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-xl font-medium text-[#4A5568] mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-[#F9F9F9] border-2 border-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#388E3C] shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                />
                <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#388E3C] text-xl">
                  👤
                </span>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xl font-medium text-[#4A5568] mb-2"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-[#F9F9F9] border-2 border-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#388E3C] shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                />
                <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#388E3C] text-xl">
                  📧
                </span>
              </div>
            </div>

            {/* Area of Expertise Field */}
            <div>
              <label
                htmlFor="expertise"
                className="block text-xl font-medium text-[#4A5568] mb-2"
              >
                Area of Expertise
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="expertise"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-[#F9F9F9] border-2 border-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#388E3C] shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                />
                <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#388E3C] text-xl">
                  💼
                </span>
              </div>
            </div>

            {/* Price per Hour Field */}
            <div>
              <label
                htmlFor="price"
                className="block text-xl font-medium text-[#4A5568] mb-2"
              >
                Price per Hour ($)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-[#F9F9F9] border-2 border-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#388E3C] shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                />
                <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#388E3C] text-xl">
                  💲
                </span>
              </div>
            </div>

            {/* Rating Field */}
            <div>
              <label
                htmlFor="rating"
                className="block text-xl font-medium text-[#4A5568] mb-2"
              >
                Rating (1 to 5)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                  min="1"
                  max="5"
                  className="w-full p-4 bg-[#F9F9F9] border-2 border-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#388E3C] shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                />
                <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#388E3C] text-xl">
                  ⭐
                </span>
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-xl font-medium text-[#4A5568] mb-2"
              >
                Short Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-4 bg-[#F9F9F9] border-2 border-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#388E3C] shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="img"
                className="block text-xl font-medium text-[#4A5568] mb-2"
              >
                Profile Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="img"
                  name="img"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="w-full p-4 bg-[#F9F9F9] border-2 border-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#388E3C] shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                />
                {formData.img && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-[#4A5568]">Preview:</p>
                    <img
                      src={formData.img}
                      alt="Profile"
                      className="mt-2 w-32 h-32 object-cover rounded-full mx-auto border-4 border-[#FF9800] transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-4 mt-6 bg-[#FF9800] text-white rounded-xl hover:bg-[#F57C00] transition duration-300 ease-in-out transform hover:scale-105"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BecomeTutorPage;
