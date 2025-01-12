const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {getNotifications, readNotification} = require("../controllers/notificationsController");

router.get("/", auth, getNotifications);
router.patch("/:id/read", auth, readNotification);

module.exports = router;
