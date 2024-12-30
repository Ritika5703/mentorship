const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getMenteeProfile,
  updateMenteeProfile,
  addMeeting,
} = require("../controllers/profileController");

router.get("/mentee-profile", auth, getMenteeProfile);
router.put("/mentee-profile", auth, updateMenteeProfile);
router.post("/meetings", auth, addMeeting);

module.exports = router;

router.get("/mentee-profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("meetings.mentor", "name email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "mentee") {
      return res
        .status(403)
        .json({ message: "Access denied. Not a mentee profile." });
    }

    res.json(user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
});
