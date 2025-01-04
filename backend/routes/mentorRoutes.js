const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.post("/mentor-request", auth, async (req, res) => {
  const { fields, yearsOfExperience, currentCompany, about, skills } = req.body;
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.mentorDetails = {
      requested: true,
      approved: false,
      fields,
      yearsOfExperience,
      currentCompany,
    };
    user.about = about;
    user.skills = skills.map((skill) => ({ name: skill, level: 3 }));

    await user.save();
    res.json({ message: "Mentor request submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
