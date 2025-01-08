const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { upload } = require("../config/multer");
const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

// Get user profile
router.get("/", auth, getProfile);

// Update user profile
router.put("/update", auth, upload.single("profilePicture"), updateProfile);

module.exports = router;
