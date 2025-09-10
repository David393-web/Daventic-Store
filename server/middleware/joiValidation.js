const Joi = require("joi");

// Common reusable pieces
const username = Joi.string().min(3).max(30).trim().required().messages({
  "string.base": "Username must be a string",
  "string.empty": "Username is required",
  "string.min": "Username must be at least 3 characters",
  "string.max": "Username cannot exceed 30 characters",
  "any.required": "Username is required",
});

const email = Joi.string().email().trim().lowercase().required().messages({
  "string.email": "A valid email is required",
  "string.empty": "Email is required",
  "any.required": "Email is required",
});

const password = Joi.string().min(8).max(128).required().messages({
  "string.base": "Password must be a string",
  "string.empty": "Password is required",
  "string.min": "Password must be at least 8 characters",
  "string.max": "Password cannot exceed 128 characters",
  "any.required": "Password is required",
});

const confirmPassword = Joi.any()
  .valid(Joi.ref("password"))
  .required()
  .messages({
    "any.only": "Confirm password does not match password",
    "any.required": "Confirm password is required",
  })
  .strip(); // Remove confirmPassword after validation

// Signup schema: role-based validation for storeName
const createUser = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  accountType: Joi.string().valid("user", "seller").required(),
  storeName: Joi.string().when("accountType", {
    is: "seller",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  craftCategories: Joi.array().items(Joi.string()).when("accountType", {
    is: "seller",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

// Forgot password schema
const forgetPass = Joi.object({
  email,
}).options({ stripUnknown: true, abortEarly: false });

// Reset password schema
const resetPass = Joi.object({
  email,
  otp: Joi.alternatives().try(Joi.string().trim(), Joi.number()).required().messages({
    "any.required": "OTP is required",
    "string.empty": "OTP cannot be empty",
  }),
  password,
  confirmPassword,
}).options({ stripUnknown: true, abortEarly: false });

// Login schema
const login = Joi.object({
  email,
  password,
}).options({ stripUnknown: true, abortEarly: false });

// New schema for OTP verification
const verifyOtp = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "A valid email is required",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  otp: Joi.string().trim().required().messages({
    "any.required": "OTP is required",
    "string.empty": "OTP cannot be empty",
  }),
}).options({ stripUnknown: true, abortEarly: false });

module.exports = {
  createUser,
  forgetPass,
  resetPass,
  login,
  verifyOtp, // Added new schema
};