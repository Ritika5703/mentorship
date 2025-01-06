import React from "react";
import axios from "axios";

const MentorRequestModal = ({
  user,
  show,
  onClose,
  onSubmit,
  defaultValues = {},
}) => {
  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const skills = Array.from(formData.getAll("skill-name"))
      .map((name, index) => ({
        name,
        level: parseInt(formData.getAll("skill-level")[index], 10),
      }))
      .filter((skill) => skill.name && skill.level);

    const requestData = {
      _id: formData.get("_id"),
      fields: formData
        .get("fields")
        .split(",")
        .map((field) => field.trim()),
      yearsOfExperience: parseInt(formData.get("yearsOfExperience"), 10),
      currentCompany: formData.get("currentCompany"),
      about: formData.get("about"),
      skills,
    };

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:4000/api/mentor/become-mentor",
        requestData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        alert("You are now a mentor!");
        onClose();
      } else {
        alert("Failed to become mentor. Please try again.");
      }
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
          <input type="hidden" name="_id" value={user._id || ""} />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Fields of Expertise (comma-separated)
            </label>
            <input
              type="text"
              name="fields"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              defaultValue={(defaultValues.fields || []).join(", ")}
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
              defaultValue={defaultValues.yearsOfExperience || ""}
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
              defaultValue={defaultValues.currentCompany || ""}
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
              defaultValue={defaultValues.about || ""}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <div className="space-y-2">
              {(defaultValues.skills || []).map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    name="skill-name"
                    placeholder="Skill name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    defaultValue={skill.name}
                    required
                  />
                  <input
                    type="number"
                    name="skill-level"
                    placeholder="Level"
                    className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm"
                    defaultValue={skill.level}
                    min="1"
                    max="5"
                    required
                  />
                </div>
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="skill-name"
                  placeholder="Skill name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <input
                  type="number"
                  name="skill-level"
                  placeholder="Level"
                  className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm"
                  min="1"
                  max="5"
                />
              </div>
            </div>
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
