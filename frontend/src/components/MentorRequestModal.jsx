import React from "react";
import axios from "axios";

const MentorRequestModal = ({ show, onClose, onSubmit }) => {
  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const requestData = {
      fields: formData.get("fields"),
      yearsOfExperience: formData.get("yearsOfExperience"),
      currentCompany: formData.get("currentCompany"),
      about: formData.get("about"),
      skills: formData
        .get("skills")
        .split(",")
        .map((skill) => skill.trim()), // Convert CSV to array
    };

    try {
      const response = await axios.post("/api/become-mentor", requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass token if required
        },
      });
      onSubmit(response.data);
    } catch (error) {
      console.error("Error becoming mentor:", error);
      alert("Failed to become mentor. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Become a Mentor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Fields of Expertise
            </label>
            <input
              type="text"
              name="fields"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Years of Experience
            </label>
            <input
              type="number"
              name="yearsOfExperience"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Current Company
            </label>
            <input
              type="text"
              name="currentCompany"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              About Yourself
            </label>
            <textarea
              name="about"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              name="skills"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorRequestModal;
