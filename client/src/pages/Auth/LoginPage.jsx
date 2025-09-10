import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Eye, EyeOff } from 'lucide-react'; // 👈 Added icons
import { useDispatch } from 'react-redux';

// Redux action
import { loginUser as reduxLoginUser } from "../../redux/slices/authSlice";

// Backend API call
const loginUserApi = async (data) => {
  const res = await fetch("http://localhost:5000/api/v1/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Login failed");
  return result;
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 New state
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await loginUserApi({
        email: data.email,
        password: data.password,
      });

      if (!response.success) {
        throw new Error(response.message || "Login failed");
      }

      // Save user in Redux
      dispatch(reduxLoginUser(response.user));

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1000,
        onClose: () => navigate("/User/dashboard"),
      });

      reset();
    } catch (err) {
      toast.error(err.message || "Login failed", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen font-sans text-gray-800">
      <ToastContainer />

      {/* Left Side */}
      <div className="flex-col items-center justify-between hidden w-1/2 p-12 bg-blue-800 md:flex">
        <div className="mt-10 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 mx-auto text-white"
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
          <h1 className="mt-4 text-4xl font-bold text-white">Daventic🛒!</h1>
        </div>

        <div className="flex mb-10 space-x-6 text-sm text-white">
          <button className="transition hover:text-white">About</button>
          <button className="transition hover:text-white">Privacy</button>
          <button className="transition hover:text-white">Terms</button>
          <button className="transition hover:text-white">FAQ</button>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center w-full p-8 md:w-1/2 bg-gray-50 sm:p-12">
        <div className="w-full max-w-md">
          <h2 className="mb-8 text-3xl font-bold text-center">Login Your Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="block w-full py-2 mt-1 transition-colors bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                  })}
                  className="block w-full py-2 mt-1 pr-10 transition-colors bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <p className="flex justify-end text-sm text-gray-500">
              <Link to="/forgot-password?role=buyer" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="flex justify-center w-full px-4 py-3 text-lg font-medium text-white transition duration-150 ease-in-out bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Login"}
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
