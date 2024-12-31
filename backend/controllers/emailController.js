const { sendEmail } = require("../utils/emailService");

exports.handleContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Send auto-response to user
    await sendEmail(email, "contact_acknowledgment", { name });

    // Send notification to admin
    await sendEmail(process.env.ADMIN_EMAIL, "new_contact", {
      name,
      email,
      message,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
