// src/utils/authApi.js
import axios from "axios";

// Backend base URL — MUST match server.js setup
const API_BASE_URL = "http://localhost:5000/api/v1";

// Axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Central error handler
const handleError = (error, defaultMsg) => {
  console.error(defaultMsg, error.response?.data || error.message || error);
  throw new Error(error.response?.data?.message || defaultMsg);
};

/**
 * SIGNUP - registers a new user
 * POST /api/v1/signup
 */
export const signupUser = async (userData) => {
  try {
    const response = await api.post("/signup", userData);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to create account");
  }
};

/**
 * LOGIN - user authentication
 * POST /api/v1/login
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to login");
  }
};

/**
 * VERIFY OTP
 * POST /api/v1/verify-otp
 */
export const verifyOtp = async (data) => {
  try {
    const response = await api.post("/verify-otp", data);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
};

/**
 * RESEND OTP
 * POST /api/v1/resend-otp
 */
export const resendOtp = async (data) => {
  try {
    const response = await api.post("/resend-otp", data);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to resend OTP");
  }
};

/**
 * FORGOT PASSWORD
 * POST /api/v1/forgot-password
 */
export const forgotPassword = async (data) => {
  try {
    const response = await api.post("/forgot-password", data);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to initiate password reset");
  }
};

/**
 * RESEND FORGOT PASSWORD OTP
 * POST /api/v1/resend-forgot-password-otp
 */
export const resendForgotPasswordOtp = async (data) => {
  try {
    const response = await api.post("/resend-forgot-password-otp", data);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to resend forgot password OTP");
  }
};

/**
 * RESET PASSWORD
 * POST /api/v1/reset-password
 */
export const resetPassword = async (data) => {
  try {
    const response = await api.post("/reset-password", data);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to reset password");
  }
};

/**
 * FETCH USER PROFILE
 * GET /api/v1/profile (requires token)
 */
export const fetchUserProfile = async (token) => {
  try {
    const response = await api.get("/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch user profile");
  }
};

/**
 * UPDATE USER PROFILE
 * PUT /api/v1/profile (requires token)
 */
export const updateUser = async (token, userData) => {
  try {
    const response = await api.put("/profile", userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error, "Failed to update user profile");
  }
};
