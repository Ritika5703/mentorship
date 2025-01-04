const express = require("express");
const auth = require("../middlewares/auth");
const { becomeMentor } = require("../controllers/mentorController");
const router = express.Router();

router.post("/become-mentor", auth, becomeMentor);

module.exports = router;
