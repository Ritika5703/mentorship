const mongoose = require("mongoose");

const emailTemplateSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
  },
  subject: String,
  body: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

const EmailTemplate = mongoose.model("EmailTemplate", emailTemplateSchema);
