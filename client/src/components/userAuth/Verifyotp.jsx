import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";
import { verifyOtp, resendOtp } from "../../utils/authApi";

const Verifyotp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    console.log("Verifyotp mounted, email:", email);
    if (!email) {
      toast.error("Invalid session. Please sign up again.");
      setTimeout(() => navigate("/signup"), 3000);
    }
  }, [email, navigate]);

  const handleVerifyOtp = async (e) => {
  e.preventDefault();
  if (!email || otp.length !== 6) return;

  setIsLoading(true);
  console.log("Verifying OTP with email:", email, "OTP:", otp);

  try {
    const response = await verifyOtp({ email, otp });
    console.log("Verify OTP Response:", response);

    toast.success(response?.message || "OTP verified successfully");

    // ✅ Save token + user in localStorage
    localStorage.setItem("token", response?.token);
    localStorage.setItem("user", JSON.stringify(response?.user));

    // ✅ Redirect based on accountType
    const accountType = response?.user?.accountType;
    if (accountType === "seller") {
      navigate("/seller/dashboard");
    } else {
      navigate("/user/dashboard");
    }

  } catch (error) {
    console.error("OTP verification failed:", error.response?.data || error.message);
    toast.error(
      error?.response?.data?.message || error.message || "OTP verification failed"
    );
  } finally {
    setIsLoading(false);
  }
};




  const handleResendOtp = async () => {
    if (!email) return;

    setResending(true);
    try {
      const response = await resendOtp({ email });
      console.log("Resend OTP Response:", response);
      toast.info(response?.message || "New OTP sent to your email.");
    } catch (error) {
      console.error("Failed to resend OTP:", error.response?.data || error.message);
      toast.error(
        error?.response?.data?.message || error.message || "Failed to resend OTP."
      );
    } finally {
      setResending(false);
    }
  };

  if (!email) return null;

  return (
    <div className="flex items-center justify-center w-screen h-screen font-sans bg-gray-50 text-gray-800">
      <ToastContainer />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h2 className="mb-8 text-3xl font-bold text-center text-blue-950">
          Verify Your Account
        </h2>
        <p className="mb-6 text-center text-gray-600">
          A 6-digit OTP has been sent to your email. Enter it below to verify your account.
        </p>
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-500 text-center"
            >
              OTP
            </label>
            <input
              id="otp"
              type="text"
              placeholder="Enter 6-digit OTP"
              className="block w-full py-2 mt-1 text-lg text-center bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength="6"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="flex justify-center w-full px-4 py-3 text-lg font-medium text-white transition duration-150 ease-in-out bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
        <div className="mt-6 text-sm text-center text-gray-600">
          Didn't receive the OTP?{" "}
          <button
            onClick={handleResendOtp}
            className="text-blue-500 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={resending}
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verifyotp;