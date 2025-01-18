const Meeting = require("../models/Meeting");
const notifications = require("../models/notifications");

const acceptMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Meeting ID is required" });
    }
    if (!meetingLink) {
      return res.status(400).json({ message: "Meeting link is required" });
    }
    // check if already accepted
    const meetingExists = await Meeting.findById(id);
    if (meetingExists.status === "accepted") {
      return res.status(400).json({ message: "Meeting already accepted" });
    }

    const meeting = await Meeting.findByIdAndUpdate(
      id,
      { status: "accepted", meetingLink: meetingLink },
      { new: true }
    );

    const { notificationId } = req.body;
    console.log("Accepting meeting:", { id, notificationId }); // Debug log
    // Mark the notification as read
    await notifications.findByIdAndUpdate(notificationId, { read: true });

    // Send notification to the user
    const notification = new notifications({
      recipient: meeting.mentee,
      sender: req.user.id,
      meetingId: id,
      message: `Your meeting with ${req.user.name} has been accepted. Meeting link: ${meetingLink}`,
    });
    notification.save();

    res.json({
      success: true,
      meeting,
      message: "Meeting accepted successfully",
    });
  } catch (error) {
    console.error("Error accepting meeting:", error);
    res.status(500).json({ message: "Failed to accept meeting" });
  }
};

const rejectMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Meeting ID is required" });
    }

    // check if already rejected
    const meetingExists = await Meeting.findById(id);
    if (meetingExists.status === "rejected") {
      return res.status(400).json({ message: "Meeting already rejected" });
    }

    const meeting = await Meeting.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );

    const { notificationId } = req.body;
    // Mark the notification as read
    await notifications.findByIdAndUpdate(notificationId, { read: true });

    // Send notification to the user
    const notification = new notifications({
      recipient: meeting.mentee,
      sender: req.user.id,
      meetingId: id,
      message: `Your meeting with ${req.user.name} has been rejected.`,
    });

    notification.save();

    res.json({
      success: true,
      meeting,
      message: "Meeting rejected successfully",
    });
  } catch (error) {
    console.error("Error rejecting meeting:", error);
    res.status(500).json({ message: "Failed to reject meeting" });
  }
};

module.exports = { acceptMeeting, rejectMeeting };
