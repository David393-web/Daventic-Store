// src/utils/authApi.js
// This file contains functions to interact with your backend authentication APIs.
import axios from "axios"; // Ensure axios is imported

// Define your backend API base URL here.
// IMPORTANT: This MUST match your server.js port (4000) and the base route (/api/v1)
const API_BASE_URL = 'http://localhost:5000/api/v1'; // ✅ Changed to localhost

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error, defaultMsg) => {
  console.error(defaultMsg, error.response?.data || error.message || error);
  // Throw a more user-friendly message for the frontend, preferably from backend response
  throw new Error(error.response?.data?.message || defaultMsg);
};

// ... (other functions like createUser, loginUser, verifyOtp, resendOtp)

/**
 * Initiates the forgot password process.
 * Correlates with backend: POST /api/v1/forgot-password
 * @param {object} data - User identifier (e.g., { email: "user@example.com" })
 * @returns {Promise<object>} Response data confirming initiation.
 */
export const forgotPassword = async (data) => { // ✅ Expects a data object
  try {
    const response = await api.post("/forgot-password", data); // ✅ Endpoint corrected to /forgot-password
    return response.data;
  } catch (error) {
    throw handleError(error, "Failed to send reset link"); // ✅ Using standardized handleError
  }
};

/**
 * Requests a new OTP for the forgot password flow.
 * Correlates with backend: POST /api/v1/resend-forgot-password-otp
 * @param {object} data - User identifier (e.g., { email: "user@example.com" })
 * @returns {Promise<object>} Response data confirming OTP resend.
 */
export const resendForgotPasswordOtp = async (data) => {
  try {
    const response = await api.post("/resend-forgot-password-otp", data);
    return response.data;
  } catch (error) {
    throw handleError(error, "Failed to resend forgot password OTP");
  }
};

/**
 * Resets the user's password.
 * Correlates with backend: POST /api/v1/reset-password
 * @param {object} data - Password reset data (e.g., { email: "...", otp: "...", newPassword: "..." })
 * @returns {Promise<object>} Response data confirming password reset.
 */
export const resetPassword = async (data) => { // ✅ Renamed and expects a data object
  try {
    const response = await api.post("/reset-password", data); // ✅ Endpoint corrected to /reset-password
    return response.data;
  } catch (error) {
    throw handleError(error, "Failed to reset password"); // ✅ Using standardized handleError
  }
};

// ... (other functions like fetchUserProfile, updateUser)
