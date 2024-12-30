const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
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
      required: true,
    },
    meetings: [
      {
        mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        theme: String,
        date: Date,
        status: { type: String, enum: ["upcoming", "completed", "cancelled"] },
        reminder: { type: Number, default: 24 }, // hours before meeting
      },
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
