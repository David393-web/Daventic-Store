// src/pages/Auth/ResetPasswordPage.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2, Eye, EyeOff } from "lucide-react";

import { resetPassword as submitResetPassword } from "../../utils/authApi";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await submitResetPassword({
        email: data.email,
        otp: data.otp,
        password: data.newPassword,
        confirmPassword: data.confirmPassword, // ✅ must be here
      });


      toast.success(
        response.message ||
        "Password reset successfully! Please log in with your new password."
      );
      navigate("/UpdatedPassword", { state: { fromReset: true } });
    } catch (err) {
      console.error("Reset password error:", err);
      toast.error(
        err?.response?.data?.message ||
        err.message ||
        "Failed to reset password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Extract email from URL if available
  const params = new URLSearchParams(location.search);
  const emailFromUrl = params.get("email");

  return (
    <div className="flex items-center justify-center w-screen h-screen font-sans bg-gray-50 text-gray-800">
      <ToastContainer />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h2 className="mb-8 text-3xl font-bold text-center text-blue-950">
          Reset Password
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Enter the OTP sent to your email and choose a new password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-500"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue={emailFromUrl || ""}
              {...register("email", { required: "Email is required" })}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              readOnly={!!emailFromUrl}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* OTP */}
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-500"
            >
              OTP
            </label>
            <input
              id="otp"
              type="text"
              placeholder="Enter 6-digit OTP"
              {...register("otp", {
                required: "OTP is required",
                minLength: { value: 6, message: "OTP must be 6 digits" },
                maxLength: { value: 6, message: "OTP must be 6 digits" },
              })}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.otp && (
              <p className="mt-1 text-sm text-red-500">{errors.otp.message}</p>
            )}

            <div className="mt-2 text-sm text-right">
              <Link
                to={`/forgot-password?email=${encodeURIComponent(
                  emailFromUrl || ""
                )}`}
                className="text-blue-500 hover:underline"
              >
                Resend OTP
              </Link>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-500"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-500"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex justify-center w-full px-4 py-3 text-lg font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* Back to Login */}
        <p className="mt-6 text-center text-gray-600">
          <Link to="/buyer-login" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
