const express = require("express");
const {
  signUp,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resendForgotPasswordOtp,
  resetPassword,
  loginUser,
} = require("../controller/userController");

const {
  createUser,
  verifyOtp: joiVerifyOtp,
  forgetPass,
  resetPass,
  login: joiLogin,
} = require("../middleware/joiValidation");

const router = express.Router();

// Helper to wrap Joi schema into middleware
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((d) => d.message).join(", "),
    });
  }
  req.body = value;
  next();
};

// Authentication Routes
router.post("/signup", validate(createUser), signUp);
router.post("/verify-otp", validate(joiVerifyOtp), verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", validate(joiLogin), loginUser);
router.post("/forgot-password", validate(forgetPass), forgotPassword);
router.post("/resend-forgot-password-otp", resendForgotPasswordOtp);
router.post("/reset-password", validate(resetPass), resetPassword);

module.exports = router;
