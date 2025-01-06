const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  theme: String,
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
  reminder: Number,
  status: { type: String, default: "upcoming" },
});

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, min: 1, max: 5, default: 3 }, // Default level is 3
});

const mentorDetailsSchema = new mongoose.Schema({
  fields: { type: [String], default: [] }, // Array of expertise fields
  yearsOfExperience: { type: Number, default: 0 },
  currentCompany: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  certificates: [
    {
      name: String,
      issueDate: Date,
      issuer: String,
      url: String,
    },
  ],
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: String,
    experience: String,
    education: { type: String, default: "" }, // Ensure it's a string with default empty value
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
    about: { type: String, default: "" }, // Added default value
    skills: { type: [skillSchema], default: [] }, // Updated schema for skills
    role: {
      type: String,
      enum: ["mentee", "mentor"],
      default: "mentee",
    },
    mentorDetails: { type: mentorDetailsSchema, default: () => ({}) },
    meetings: { type: [meetingSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
