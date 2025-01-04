const User = require("../models/User");

const becomeMentor = async (req, res) => {
  try {
    const { experience, skills, field, company, bio, timeSlots } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "mentor";
    user.mentorDetails = {
      experience,
      skills: skills.split(",").map((skill) => skill.trim()),
      field,
      company,
      bio,
      timeSlots,
    };

    await user.save();
    res.status(200).json({ message: "You are now a mentor!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { becomeMentor };
