import React from "react";
import AuthSlider from "../../components/Static/AuthSlider";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Left - Slider */}
      <div className="hidden md:block">
        <AuthSlider />
      </div>

      {/* Right - Form */}
      <div className="flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          <h2 className="mb-4 text-3xl font-bold text-primary">Welcome Back</h2>
          <p className="mb-8 text-sm text-gray-600 dark:text-gray-300">
            Log in to your Daventic account to continue.
          </p>
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white transition-all rounded-md bg-primary hover:bg-secondary"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
            Don’t have an account? <Link to="/signup" className="text-primary hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
