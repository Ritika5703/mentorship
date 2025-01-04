const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get Mentee Profile
router.get("/mentee-profile", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("meetings.mentor");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

// Become a Mentor
router.post("/become-mentor", async (req, res) => {
  try {
    const { experience, skills, field, company, bio, timeSlots } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "mentor";
    user.experience = experience;
    user.skills = skills;
    user.field = field;
    user.company = company;
    user.bio = bio;
    user.timeSlots = timeSlots;

    await user.save();
    res.json({ message: "You are now a mentor!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to become a mentor" });
  }
});

// Cancel Meeting
router.put("/meetings/:meetingId/cancel", async (req, res) => {
  try {
    const { meetingId } = req.params;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const meeting = user.meetings.id(meetingId);
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    meeting.status = "cancelled";
    await user.save();
    res.json({ message: "Meeting cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel meeting" });
  }
});

module.exports = router;
