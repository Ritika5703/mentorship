const nodemailer = require("nodemailer");
const EmailTemplate = require("../models/EmailTemplate");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, templateType, data) => {
  const template = await EmailTemplate.findOne({
    type: templateType,
    isActive: true,
  });
  if (!template) throw new Error("Email template not found");

  let body = template.body;
  // Replace placeholders with actual data
  Object.keys(data).forEach((key) => {
    body = body.replace(`{{${key}}}`, data[key]);
  });

  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: template.subject,
    html: body,
  });
};
