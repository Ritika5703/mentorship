const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  theme: String,
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
  reminder: Number,
  status: { type: String, default: "upcoming" },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: String,
    experience: String,
    education: String,
    meetingsAttended: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: [
      {
        reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        comment: String,
        date: { type: Date, default: Date.now },
      },
    ],
    profilePicture: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    about: String,
    skills: [
      {
        name: String,
        level: { type: Number, min: 1, max: 5 },
      },
    ],
    role: {
      type: String,
      enum: ["mentee", "mentor"],
      default: "mentee", // Default role is "mentee"
    },
    mentorDetails: {
      requested: { type: Boolean, default: false }, // If a mentor request is submitted
      approved: { type: Boolean, default: false }, // Admin approval status
      fields: [String], // Fields of expertise
      yearsOfExperience: Number,
      currentCompany: String,
    },
    meetings: [
      meetingSchema,
      // {
      //   mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      //   theme: String,
      //   date: Date,
      //   status: { type: String, enum: ["upcoming", "completed", "cancelled"] },
      //   reminder: { type: Number, default: 24 }, // hours before meeting
      // },
    ],
    certificates: [
      {
        name: String,
        issueDate: Date,
        issuer: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
