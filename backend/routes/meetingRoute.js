const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { acceptMeeting, rejectMeeting } = require("../controllers/meetingController");

// Public routes
router.patch("/:id/accept", auth, acceptMeeting);
router.patch("/:id/reject", auth, rejectMeeting);

module.exports = router;
