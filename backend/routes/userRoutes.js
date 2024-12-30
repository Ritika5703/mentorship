const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();

// Login route
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
