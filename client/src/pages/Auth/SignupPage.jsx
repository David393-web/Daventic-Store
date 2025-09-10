import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { Loader2, Eye, EyeOff } from 'lucide-react'; // 👈 Added Eye icons
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 State for password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 👈 State for confirm password
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const password = watch('password');
  const navigate = useNavigate();

  // ✅ Fixed: Extract API call to a helper function
  const signupApi = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Signup failed");
      }

      return result;
    } catch (error) {
      console.error("Signup API Error:", error.message);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    data.accountType = "user";
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await signupApi(data);
      toast.success(response.message || 'Signup successful!', {
        position: 'top-right',
        autoClose: 3000,
      });
      reset();

      // ✅ Ensure we always have email
      const email = response.email || data.email;
      if (!email) {
        throw new Error('No email returned from server');
      }

      console.log('Navigating with email:', email);

      // Navigate to OTP verification with email
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      console.error('Signup Process Error:', err);
      toast.error(err.message || 'Signup failed', {
        position: 'top-right',
        autoClose: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen font-sans text-gray-800">
      <ToastContainer />
      {/* Left Side */}
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
        <div className="flex mb-10 space-x-6 text-sm text-blue-950">
          <button className="transition hover:text-blue-950">About</button>
          <button className="transition hover:text-blue-950">Privacy</button>
          <button className="transition hover:text-blue-950">Terms</button>
          <button className="transition hover:text-blue-950">FAQ</button>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="flex items-center justify-center w-full p-8 md:w-1/2 bg-gray-50 sm:p-12">
        <div className="w-full max-w-md">
          <h2 className="mb-8 text-3xl font-bold text-center">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-500">Username</label>
              <input
                {...register("username", { required: "Username is required" })}
                className="block w-full py-2 mt-1 transition-colors bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>}
            </div>
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
            <div>
              <label className="block text-sm font-medium text-gray-500">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                  className="block w-full py-2 mt-1 pr-10 transition-colors bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex justify-center w-full px-4 py-3 text-lg font-medium text-white transition duration-150 ease-in-out bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Sign Up"}
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
