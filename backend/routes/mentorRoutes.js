const express = require("express");
const router = express.Router();
const {becomeMentor} = require('../controllers/mentorController');

router.post("/become-mentor", becomeMentor);

module.exports = router;
