const Meeting = require("../models/Meeting");
const Notification = require("../models/notifications");

const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch notifications for the user
    const userNotifications = await Notification.find({ recipient: userId });

    // Populate meetings for notifications that have a `meetingId`
    const notificationsWithMeetings = await Promise.all(
      userNotifications.map(async (notification) => {
        if (notification.meetingId) {
          const meeting = await Meeting.findById(notification.meetingId);
          return { ...notification._doc, meeting }; // Merge meeting data into the notification
        }
        return notification;
      })
    );

    console.log("Notifications with meetings:", notificationsWithMeetings);

    res.json({ success: true, notifications: notificationsWithMeetings });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

const readNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    if (!notificationId) {
      return res.status(400).json({ success: false, message: "Notification ID is required" });
    }

    // Update the notification to mark it as read
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    if (!notification.read) {
      return res.status(400).json({ success: false, message: "Failed to mark notification as read" });
    }

    res.json({ success: true, message: "Notification marked as read" });
  }
  catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Failed to mark notification as read" });
  }
}


module.exports = {getNotifications, readNotification};
