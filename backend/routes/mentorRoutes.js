const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  becomeMentor,
  allMentors,
  getMentor,
  createContactRequest,
  bookMeeting,
  getMentorAvailability,
  addMentorReview,
} = require("../controllers/mentorController");

// Public routes
router.get("/all-mentors", allMentors);
router.get("/:id", getMentor);
router.get("/mentor/:mentorId/availability/:date", getMentorAvailability);

// Protected routes
router.post("/become-mentor", becomeMentor);
router.post("/contact-request", auth, createContactRequest);
router.post("/book-meeting", auth, bookMeeting);
router.post("/mentor/:mentorId/review", auth, addMentorReview);

module.exports = router;
