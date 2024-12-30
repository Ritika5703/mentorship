const User = require("../models/User");

exports.getMenteeProfile = async (req, res) => {
  try {
    console.log("User ID from token:", req.user.id); // Debugging

    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("meetings.mentor", "name email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "mentee") {
      return res
        .status(403)
        .json({ message: "Access denied. Not a mentee profile." });
    }

    console.log("Found user:", user); // Debugging
    res.json(user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
};

exports.updateMenteeProfile = async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Prevent password update through this route

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addMeeting = async (req, res) => {
  try {
    const { mentorId, theme, date, reminder } = req.body;

    const user = await User.findById(req.user.id);
    user.meetings.push({
      mentor: mentorId,
      theme,
      date,
      reminder,
      status: "upcoming",
    });

    await user.save();
    res.json(user.meetings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
