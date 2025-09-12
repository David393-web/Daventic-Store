const {
  createUser: joiCreateUser,
  forgetPass,
  resetPass,
  login: joiLogin,
} = require("../middleware/joiValidation");

const { generateOTP } = require("../middleware/otpGenerator");
const { sendEmail } = require("../middleware/emailSetup");
const TempUser = require("../models/tempUserModel");
const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helpers
const OTP_TTL_MS = 20 * 60 * 1000; // 20 minutes
const OTP_EXPIRY_MINUTES = OTP_TTL_MS / (60 * 1000); // 20 minutes

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const sendOtpEmail = async ({ to, otp, subject, purpose, username, expiryMinutes }) => {
  const templateName = purpose.includes("password-reset") ? "password-reset" : "otp";
  await sendEmail(to, subject, templateName, { otp, purpose, username, expiryMinutes });
};

// ============ SIGN UP ============
const signUp = async (req, res, next) => {
  let trimmedEmail;

  try {
    // ✅ Validate input with Joi
    if (joiCreateUser) {
      const { error, value } = joiCreateUser.validate(req.body);
      if (error) {
        const err = new Error(error.details?.[0]?.message || "Invalid input");
        err.status = 400;
        throw err;
      }
      delete value.confirmPassword; // confirmPassword is only frontend
      req.body = value;
    }

    const { username, email, password, accountType, storeName, craftCategories } = req.body;
    trimmedEmail = normalizeEmail(email);

    // ✅ Check if already in main User collection
    const existing = await User.findOne({ email: trimmedEmail });
    if (existing) {
      const err = new Error("Email already exists");
      err.status = 409;
      throw err;
    }

    // ✅ Remove any unverified temp user with same email
    await TempUser.deleteOne({ email: trimmedEmail });

    // ✅ Hash password before saving
    const hashedPassword = await bcryptjs.hash(password, 10);

    // ✅ Create new temp user (unverified until OTP is confirmed)
    const tempUser = await TempUser.create({
      username,
      email: trimmedEmail,
      password: hashedPassword,
      accountType,
      storeName,
      craftCategories,
      isVerified: false,
    });

    // ✅ Generate & attach OTP
    const otp = await generateOTP(trimmedEmail);
    tempUser.otp = String(otp);
    tempUser.otpExpires = new Date(Date.now() + OTP_TTL_MS);
    await tempUser.save();

    // ✅ Send OTP email
    await sendOtpEmail({
      to: trimmedEmail,
      otp,
      subject: "Verify your Daventic account",
      purpose: "signup",
      username,
      expiryMinutes: OTP_EXPIRY_MINUTES,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful. Please verify OTP",
      email: trimmedEmail,
    });

  } catch (error) {
    // Rollback if email send fails
    if (
      trimmedEmail &&
      (error.message?.toLowerCase().includes("econnrefused") ||
        error.message?.toLowerCase().includes("failed to send"))
    ) {
      await TempUser.deleteOne({ email: trimmedEmail }).catch(() => {});
    }
    next(error);
  }
};

// ============ VERIFY OTP ============
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 🔍 Find temp user
    const tempUser = await TempUser.findOne({ email });
    if (!tempUser) {
      return res
        .status(400)
        .json({ success: false, message: "No pending verification for this email" });
    }

    // 🔍 Check OTP validity
    if (tempUser.otp !== otp || tempUser.otpExpires < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // ✅ Create real user with fields from TempUser
    const user = new User({
      username: tempUser.username,
      email: tempUser.email,
      password: tempUser.password, // already hashed if you hashed it before saving TempUser
      accountType: tempUser.accountType,
      storeName: tempUser.storeName,
      craftCategories: tempUser.craftCategories,
      isVerified: true,
    });

    await user.save();

    // 🗑 Delete tempUser after successful verification
    await TempUser.deleteOne({ email });

    // 🔑 Generate JWT
    const token = jwt.sign(
      { id: user._id, accountType: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Account verified successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        accountType: user.accountType,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ============ RESEND OTP ============
const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      const err = new Error("Email is required");
      err.status = 400;
      throw err;
    }

    const trimmedEmail = normalizeEmail(email);

    const exists = await User.findOne({ email: trimmedEmail });
    if (exists) {
      const err = new Error("Email already registered and verified");
      err.status = 409;
      throw err;
    }

    const tempUser = await TempUser.findOne({ email: trimmedEmail });
    if (!tempUser) {
      const err = new Error("No pending verification found for this email");
      err.status = 409;
      throw err;
    }

    if (tempUser.otpExpires && tempUser.otpExpires > Date.now()) {
      const remaining = Math.ceil((tempUser.otpExpires - Date.now()) / 1000);
      return res.status(400).json({
        success: false,
        message: `An OTP is already active. Please wait ${remaining} seconds before requesting a new one.`,
      });
    }

    const otp = await generateOTP(trimmedEmail);  // ✅ FIXED
    tempUser.otp = String(otp);
    tempUser.otpExpires = new Date(Date.now() + OTP_TTL_MS);
    await tempUser.save();

    await sendOtpEmail({
      to: trimmedEmail,
      otp,
      subject: "Your new Daventic verification code",
      purpose: "signup-resend",
      username: tempUser.username,
      expiryMinutes: OTP_EXPIRY_MINUTES,
    });

    return res.status(200).json({
      success: true,
      message: "OTP resend successful. Please verify OTP.",
    });
  } catch (error) {
    next(error);
  }
};

// ============ FORGOT PASSWORD ============
const forgotPassword = async (req, res, next) => {
  try {
    if (forgetPass) {
      const { error, value } = forgetPass.validate(req.body);
      if (error) {
        const err = new Error(error.details?.[0]?.message || "Invalid input");
        err.status = 400;
        throw err;
      }
      req.body = value;
    }

    const { email } = req.body;
    const trimmedEmail = normalizeEmail(email);

    const otp = await generateOTP(trimmedEmail);  // ✅ FIXED here

    const user = await User.findOneAndUpdate(
      { email: trimmedEmail, isVerified: true },
      {
        $set: {
          otp: String(otp),
          otpExpires: new Date(Date.now() + OTP_TTL_MS),
        },
      },
      { new: true }
    );

    if (!user) {
      const err = new Error("No verified account found with this email");
      err.status = 404;
      throw err;
    }

    await sendOtpEmail({
      to: trimmedEmail,
      otp,
      subject: "Daventic Password Reset Code",
      purpose: "password-reset",
      username: user.username,
      expiryMinutes: OTP_EXPIRY_MINUTES,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent.",
    });
  } catch (error) {
    next(error);
  }
};

// ============ RESEND FORGOT PASSWORD OTP ============
const resendForgotPasswordOtp = async (req, res, next) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      const err = new Error("Email is required");
      err.status = 400;
      throw err;
    }

    const trimmedEmail = normalizeEmail(email);

    const otp = await generateOTP(trimmedEmail);  // ✅ FIXED here

    const user = await User.findOneAndUpdate(
      { email: trimmedEmail, isVerified: true },
      {
        $set: {
          otp: String(otp),
          otpExpires: new Date(Date.now() + OTP_TTL_MS),
        },
      },
      { new: true }
    );

    if (!user) {
      const err = new Error("No verified account found with this email");
      err.status = 404;
      throw err;
    }

    await sendOtpEmail({
      to: trimmedEmail,
      otp,
      subject: "Your new Daventic password reset code",
      purpose: "password-reset-resend",
      username: user.username,
      expiryMinutes: OTP_EXPIRY_MINUTES,
    });

    return res.status(200).json({
      success: true,
      message: "Password OTP resend successful.",
    });
  } catch (error) {
    next(error);
  }
};

// ============ RESET PASSWORD ============
const resetPassword = async (req, res, next) => {
  try {
    if (resetPass) {
      const { error, value } = resetPass.validate(req.body);
      if (error) {
        const err = new Error(error.details?.[0]?.message || "Invalid input");
        err.status = 400;
        throw err;
      }
      req.body = value;
    }

    const { email, otp, password } = req.body;
    const trimmedEmail = normalizeEmail(email);

    const user = await User.findOne({
      email: trimmedEmail,
      otp: String(otp).trim(),
      otpExpires: { $gt: Date.now() },
      isVerified: true,
    }).select("+password +otp +otpExpires");

    if (!user) {
      const err = new Error("Invalid or expired OTP, or account is not verified");
      err.status = 400;
      throw err;
    }

    const hashed = await bcryptjs.hash(password, 10);
    user.password = hashed;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ============ LOGIN ============
const loginUser = async (req, res) => {
  try {
    // ✅ Joi validation
    if (joiLogin) {
      const { error, value } = joiLogin.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details?.[0]?.message || "Invalid input",
        });
      }
      req.body = value; // overwrite with validated + normalized
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    console.log("Login attempt:", { email });
    console.log("User found:", user ? { id: user._id, email: user.email } : "No user");

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid Email or Password" });
    }

    if (!user.isVerified) {
      return res.status(401).json({ success: false, message: "Please verify your email first" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    console.log("Password given:", password);
    console.log("Password in DB:", user.password);
    console.log("Match result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid Email or Password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, accountType: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        accountType: user.accountType,
        storeName: user.storeName,
        craftCategories: user.craftCategories,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  signUp,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
  resendForgotPasswordOtp,
  loginUser,
};

// Debug test only
const bcrypt = require("bcryptjs");
const hash = "$2b$10$knOgm80woAlEEhX31yfJpeedrwfTxxj9wGZFFYsCG1e0NLLkswwE2";

bcrypt.compare("Denyefa12@", hash).then(console.log);
