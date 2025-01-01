const express = require("express");
const router = express.Router();
const mentorController = require("../controllers/mentorController");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post(
  "/creatementor",
  upload.single("img"),
  mentorController.createMentor
);
router.get("/", mentorController.getAllMentors);
router.get("/:id", mentorController.getMentorById);
router.put("/:id", upload.single("img"), mentorController.updateMentor);
router.delete("/:id", mentorController.deleteMentor);

module.exports = router;
