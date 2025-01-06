const User = require("../models/User");
const Meeting = require("../models/Meeting");

// Become a mentor
const becomeMentor = async (req, res) => {
  try {
    const { _id, fields, yearsOfExperience, currentCompany, about, skills } =
      req.body;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.mentorDetails = {
      fields: fields || [],
      yearsOfExperience: yearsOfExperience || 0,
      currentCompany: currentCompany || "",
    };

    user.about = about || user.about;
    user.skills = (skills || []).map((skill) => ({
      name: skill.name,
      level: skill.level || 3,
    }));
    user.role = "mentor";

    await user.save();
    res.json({
      success: true,
      message: "Mentor request submitted successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all mentors
const allMentors = async (req, res) => {
  try {
    const mentors = await User.find({ role: "mentor" });

    res.json({ success: true, mentors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get single mentor
const getMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await User.findById(id);

    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ message: "Mentor not found" });
    }

    res.json({ success: true, mentor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Handle contact request
const createContactRequest = async (req, res) => {
  try {
    const { mentorId, message } = req.body;
    const mentor = await User.findById(mentorId);

    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // TODO: Implement notification system
    // await sendEmail(mentor.email, 'New Contact Request', message);

    res.json({
      success: true,
      message: "Contact request sent successfully",
    });
  } catch (error) {
    console.error("Error in createContactRequest:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Book a meeting
const bookMeeting = async (req, res) => {
  try {
    const { mentorId, date, timeSlot, topic } = req.body;

    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ message: "Mentor not found" });
    }

    const existingMeeting = await Meeting.findOne({
      mentor: mentorId,
      date,
      timeSlot,
      status: { $nin: ["cancelled"] },
    });

    if (existingMeeting) {
      return res.status(400).json({ message: "Time slot not available" });
    }

    const meeting = new Meeting({
      mentor: mentorId,
      mentee: req.user.id,
      date,
      timeSlot,
      topic,
      status: "pending",
    });

    await meeting.save();

    await User.findByIdAndUpdate(mentorId, {
      $inc: { meetingsAttended: 1 },
    });

    res.json({
      success: true,
      message: "Meeting booked successfully",
      meeting,
    });
  } catch (error) {
    console.error("Error in bookMeeting:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get mentor's availability
const getMentorAvailability = async (req, res) => {
  try {
    const { mentorId, date } = req.params;

    const bookedSlots = await Meeting.find({
      mentor: mentorId,
      date: {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
      },
      status: { $nin: ["cancelled"] },
    }).select("timeSlot");

    const mentor = await User.findById(mentorId).select("availableTimeSlots");

    const availableSlots = mentor.availableTimeSlots.filter(
      (slot) => !bookedSlots.some((booked) => booked.timeSlot === slot)
    );

    res.json({ availableSlots });
  } catch (error) {
    console.error("Error in getMentorAvailability:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add review for mentor
const addMentorReview = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const { rating, comment } = req.body;

    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ message: "Mentor not found" });
    }

    const hasMeeting = await Meeting.findOne({
      mentor: mentorId,
      mentee: req.user.id,
      status: "completed",
    });

    if (!hasMeeting) {
      return res.status(400).json({
        message:
          "You must complete a meeting with the mentor before leaving a review",
      });
    }

    mentor.reviews.push({
      reviewer: req.user.id,
      rating,
      comment,
      date: new Date(),
    });

    const totalRating = mentor.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    mentor.rating = totalRating / mentor.reviews.length;

    await mentor.save();

    res.json({
      success: true,
      message: "Review added successfully",
    });
  } catch (error) {
    console.error("Error in addMentorReview:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  becomeMentor,
  allMentors,
  getMentor,
  createContactRequest,
  bookMeeting,
  getMentorAvailability,
  addMentorReview,
};
