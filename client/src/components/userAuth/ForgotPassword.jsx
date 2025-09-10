// src/pages/Auth/ForgotPasswordPage.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";
import { forgotPassword as requestForgotPassword } from "../../utils/authApi";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const params = new URLSearchParams(window.location.search);
  const role = params.get("role") || "buyer"; // Default to buyer

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await requestForgotPassword({ email: data.email }); // single API works for both roles
      toast.success(res?.message || "OTP sent to your email.", {
        position: "top-right",
        autoClose: 3000,
      });
      // pass email along to reset screen (works for both buyer/seller)
      navigate(`/reset-password?email=${encodeURIComponent(data.email)}`);
    } catch (err) {
      toast.error(err.message || "Failed to send reset OTP.", {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen font-sans text-gray-800">
      <ToastContainer />

      {/* Left Side (brand) */}
      <div className="flex-col items-center justify-between hidden w-1/2 p-12 bg-white md:flex">
        <div className="mt-10 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 mx-auto text-blue-950"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12V21a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1z" />
            <path d="M12 2v20" />
            <path d="M8 8H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2" />
            <path d="M16 8h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
          </svg>
          <h1 className="mt-4 text-4xl font-bold text-blue-950">Daventic🛒!</h1>
        </div>

        <div className="flex mb-10 space-x-6 text-sm text-gray-500">
          <button className="transition hover:text-blue-950">About</button>
          <button className="transition hover:text-blue-950">Privacy</button>
          <button className="transition hover:text-blue-950">Terms</button>
          <button className="transition hover:text-blue-950">FAQ</button>
        </div>
      </div>

      {/* Right Side (form) */}
      <div className="flex items-center justify-center w-full p-8 md:w-1/2 bg-gray-50 sm:p-12">
        <div className="w-full max-w-md">
          <h2 className="mb-8 text-3xl font-bold text-center">Forgot Password</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="block w-full py-2 mt-1 transition-colors bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex justify-center w-full px-4 py-3 text-lg font-medium text-white transition duration-150 ease-in-out bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                "Send Reset OTP"
              )}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-500">
        Back to{" "}
        <Link
          to={role === "seller" ? "/seller-login" : "/login"}
          className="text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
