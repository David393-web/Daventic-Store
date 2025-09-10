// src/pages/Auth/UpdatedPassword.jsx
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatedPassword = () => {
  const location = useLocation();

  useEffect(() => {
    // Show success toast if redirected here after reset
    if (location.state?.fromReset) {
      toast.success("Your password has been updated successfully!", {
        position: "top-center",
        autoClose: 4000,
      });
    }
  }, [location.state]);

  return (
    <div className="flex items-center justify-center w-screen h-screen font-sans bg-gray-50 text-gray-800">
      <ToastContainer />

      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Success Icon */}
        <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />

        {/* Title */}
        <h1 className="mb-2 text-3xl font-bold text-blue-950">
          Password Updated
        </h1>
        <p className="mb-6 text-gray-600">
          Your password has been successfully updated.  
          Please log in with your new password.
        </p>

        {/* Login Button */}
        <Link to="/buyer-login">
          <button
            type="button"
            className="w-full py-3 text-lg font-medium text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-600"
          >
            Go to Login
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default UpdatedPassword;
