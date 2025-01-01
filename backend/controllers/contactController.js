const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.submitContact = async (req, res) => {
  try {
    console.log("Received contact form data:", req.body);

    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save to database
    const contact = await Contact.create({
      name,
      email,
      message,
    });
    console.log("Successfully saved to database:", contact);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({
      success: false,
      message: "Error sending message",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
