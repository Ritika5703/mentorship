const User = require("../models/User");

const becomeMentor = async (req, res) => {
  try {
    const { _id, fields, yearsOfExperience, currentCompany, about, skills } = req.body; // Extracted fields from request body

    // Find the user by ID
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update mentorDetails and other fields
    user.mentorDetails = {
      fields: fields || [], // Default to an empty array if not provided
      yearsOfExperience: yearsOfExperience || 0, // Default to 0 if not provided
      currentCompany: currentCompany || "", // Default to empty string if not provided
    };

    user.about = about || user.about; // Update `about` only if provided
    user.skills = (skills || []).map((skill) => ({
      name: skill.name,
      level: skill.level || 3, // Default level to 3 if not provided
    }));
    user.role = "mentor";

    // Save the updated user document
    await user.save();

    res.json({ success: true, message: "Mentor request submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const allMentors = async (req, res) => {
  try {
    const mentors = await User.find({ role: "mentor" });

    res.json({ success: true, mentors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const getMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await User.findById(id);
    res.json({ success: true, mentor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


module.exports = { becomeMentor, allMentors, getMentor };
