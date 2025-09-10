const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");

// ✅ Create transporter using Gmail App Password
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.gmail.com",
  port: process.env.MAIL_PORT || 587,
  secure: false, // TLS
  auth: {
    user: process.env.MAIL_USER, // your Gmail address
    pass: process.env.MAIL_PASS, // your 16-char App Password
  },
  tls: { rejectUnauthorized: false },
});

// ✅ Render EJS email template
const renderEmailTemplate = async (templateName, data) => {
  try {
    const templatePath = path.join(__dirname, "..", "views", "emails", `${templateName}.ejs`);
    console.log(`Rendering template: ${templatePath}`);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template file not found: ${templatePath}`);
    }

    return await ejs.renderFile(templatePath, data);
  } catch (error) {
    console.error("Error rendering email template:", error.message);
    throw new Error(`Failed to render email template '${templateName}': ${error.message}`);
  }
};

// ✅ Send email with retries
const sendEmail = async (to, subject, templateName, data, retries = 2) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`📧 Sending email attempt ${attempt}/${retries} to: ${to}`);

      const html = await renderEmailTemplate(templateName, data);

      const mailOptions = {
        from: `"Daventic-Store!" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
      };

      await Promise.race([
        transporter.sendMail(mailOptions),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Send timeout after 10 seconds")), 10000)
        ),
      ]);

      console.log(`✅ Email sent successfully to ${to}`);
      return;
    } catch (error) {
      console.error(`❌ Email attempt ${attempt} failed:`, error.message);

      if (attempt === retries) {
        throw new Error(`Failed to send email after ${retries} attempts: ${error.message}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
    }
  }
};

// ✅ New helper specifically for OTP emails
const sendOtpEmail = async ({ to, otp, username, expiryMinutes, subject = "Your OTP Code" }) => {
  // Call your existing sendEmail function with OTP template
  await sendEmail(to, subject, "otp-template", { otp, username, expiryMinutes });
};

module.exports = {
  sendEmail,
  sendOtpEmail, // ✅ exported for use in your resendOtp controller
};
