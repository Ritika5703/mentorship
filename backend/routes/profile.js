const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getMenteeProfile,
  updateMenteeProfile,
  addMeeting,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/profileController");

router.get("/mentee-profile", auth, getMenteeProfile);
router.put("/mentee-profile", auth, updateMenteeProfile);
router.post("/meetings", auth, addMeeting);

// Route to get user profile (protected)
router.get("/profile", auth, getUserProfile);

// Route to update user profile (protected)
router.put("/profile", auth, updateUserProfile);

module.exports = router;
