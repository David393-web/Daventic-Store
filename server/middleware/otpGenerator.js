// server/middleware/otpGenerator.js
const User = require("../models/userModel");
const TempUser = require("../models/tempUserModel");
const crypto = require("crypto");

const generateOTP = async (email) => {
  try {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min validity

    if (process.env.NODE_ENV !== "production") {
      console.log(`--- OTP GENERATION DEBUG for ${email} ---`);
      console.log(`Generated OTP: ${otp}`);
      console.log(`OTP Expiry: ${otpExpires}`);
    }

    // Helper to update OTP in any model
    const updateOTP = async (model, email) => {
      const user = await model.findOne({ email });
      if (!user) return null;

      // Hash OTP before storing (prevents plaintext OTP leaks)
      const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

      user.otp = hashedOtp;
      user.otpExpires = otpExpires;
      await user.save();
      return user;
    };

    // Try TempUser first, then User
    let targetUser = await updateOTP(TempUser, email);
    if (!targetUser) targetUser = await updateOTP(User, email);

    if (!targetUser) {
      throw new Error(`No user found with email: ${email}`);
    }

    if (process.env.NODE_ENV !== "production") {
      console.log(`OTP successfully stored for ${email}`);
      console.log(`--- END OTP GENERATION DEBUG ---`);
    }

    return otp; // Return raw OTP for sending via email/SMS, hashed in DB
  } catch (err) {
    console.error(`OTP Generation Error: ${err.message}`);
    throw err;
  }
};

module.exports = { generateOTP };
