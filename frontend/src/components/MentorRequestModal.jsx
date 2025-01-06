import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MentorRequestModal = ({ user, show, onClose, defaultValues = {} }) => {
  const [skills, setSkills] = useState(
    defaultValues.skills || [{ name: "", level: 1 }]
  );
  const [certificates, setCertificates] = useState(
    defaultValues.certificates || [
      { name: "", issuer: "", issueDate: "", url: "" },
    ]
  );

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, { name: "", level: 1 }]);
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleCertificateChange = (index, field, value) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index][field] = value;
    setCertificates(updatedCertificates);
  };

  const handleAddCertificate = () => {
    setCertificates([
      ...certificates,
      { name: "", issuer: "", issueDate: "", url: "" },
    ]);
  };

  const handleRemoveCertificate = (index) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const requestData = {
      _id: formData.get("_id"),
      fields: formData
        .get("fields")
        .split(",")
        .map((field) => field.trim()),
      yearsOfExperience: parseInt(formData.get("yearsOfExperience"), 10),
      currentCompany: formData.get("currentCompany"),
      about: formData.get("about"),
      skills: skills.filter((skill) => skill.name && skill.level),
      certificates: certificates.filter(
        (certificate) => certificate.name && certificate.issuer
      ),
    };

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:4000/api/mentor/become-mentor",
        requestData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("You are now a mentor");
        onClose();
      } else {
<<<<<<< HEAD
        alert("Failed to become a mentor. Please try again.");
      }
    } catch (error) {
      console.error("Error becoming mentor:", error);
      alert("Failed to become a mentor. Please try again.");
=======
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error becoming mentor:", error);
      toast.error("Failed to become a mentor");
>>>>>>> 9eebc415440ba49441ff6622cb465c98d300c3f8
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl h-auto">
        <div className="flex justify-between items-center bg-teal-600 text-white p-4 rounded-t-lg">
          <h2 className="text-2xl font-semibold">Become a Mentor</h2>
          <button onClick={onClose} className="text-white text-xl">
            ✖
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[75vh] p-6"
        >
          <input type="hidden" name="_id" value={user._id || ""} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Fields of Expertise */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fields of Expertise (comma-separated)
              </label>
              <input
                type="text"
                name="fields"
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                defaultValue={(defaultValues.fields || []).join(", ")}
                required
              />
            </div>

            {/* Years of Experience */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                defaultValue={defaultValues.yearsOfExperience || ""}
                required
              />
            </div>

            {/* Current Company */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Company
              </label>
              <input
                type="text"
                name="currentCompany"
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                defaultValue={defaultValues.currentCompany || ""}
                required
              />
            </div>

            {/* LinkedIn Profile */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn Profile
              </label>
              <input
                type="text"
                name="linkedin"
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                defaultValue={defaultValues.linkedin || ""}
                required
              />
            </div>
          </div>

          {/* About Yourself */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Yourself
            </label>
            <textarea
              name="about"
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              defaultValue={defaultValues.about || ""}
              required
            />
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-4">
                  {/* Skill Name Input */}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) =>
                        handleSkillChange(index, "name", e.target.value)
                      }
                      placeholder="Enter skill name"
                      className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* Skill Level Input */}
                  <div className="w-28">
                    <label
                      htmlFor={`skill-level-${index}`}
                      className="block text-xs text-gray-500 mb-1"
                    >
                      Proficiency (1-5)
                    </label>
                    <input
                      id={`skill-level-${index}`}
                      type="number"
                      value={skill.level}
                      onChange={(e) =>
                        handleSkillChange(index, "level", e.target.value)
                      }
                      placeholder="1-5"
                      className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      min="1"
                      max="5"
                      required
                    />
                  </div>

                  {/* Remove Skill Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="text-red-500 text-xl"
                  >
                    ✖
                  </button>
                </div>
              ))}

              {/* Add Skill Button */}
              <button
                type="button"
                onClick={handleAddSkill}
                className="text-teal-500 text-lg mt-2"
              >
                + Add Skill
              </button>
            </div>
          </div>

          {/* Certificates Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certificates
            </label>
            <div className="space-y-4">
              {certificates.map((certificate, index) => (
                <div key={index} className="space-y-2">
                  <input
                    type="text"
                    value={certificate.name}
                    onChange={(e) =>
                      handleCertificateChange(index, "name", e.target.value)
                    }
                    placeholder="Certificate Name"
                    className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="text"
                    value={certificate.issuer}
                    onChange={(e) =>
                      handleCertificateChange(index, "issuer", e.target.value)
                    }
                    placeholder="Issuer"
                    className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="date"
                    value={certificate.issueDate}
                    onChange={(e) =>
                      handleCertificateChange(
                        index,
                        "issueDate",
                        e.target.value
                      )
                    }
                    placeholder="Issue Date"
                    className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="url"
                    value={certificate.url}
                    onChange={(e) =>
                      handleCertificateChange(index, "url", e.target.value)
                    }
                    placeholder="Certificate URL"
                    className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCertificate(index)}
                    className="text-red-500 text-xl"
                  >
                    ✖
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddCertificate}
                className="text-teal-500 text-lg mt-2"
              >
                + Add Certificate
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition"
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
