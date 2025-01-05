const express = require("express");
const router = express.Router();
const {becomeMentor, allMentors, getMentor} = require('../controllers/mentorController');

router.post("/become-mentor", becomeMentor);
router.get("/all-mentors", allMentors);
router.get("/:id", getMentor);

module.exports = router;
