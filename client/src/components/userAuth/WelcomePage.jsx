// src/pages/WelcomePage.jsx
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Home, Store, UserCircle } from 'lucide-react';
import background from "../../assets/fash2.png"; // Re-using existing background

const WelcomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, accountType } = useSelector((state) => state.auth);

  useEffect(() => {
    // If not authenticated after rehydration, redirect to the role selection page
    // This handles direct access to /welcomepage without being logged in
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const getDashboardPath = () => {
    if (accountType === 'seller') {
      return '/seller/dashboard';
    } else if (accountType === 'buyer') {
      return '/User/dashboard'; // Or whatever your buyer dashboard route is
    }
    return '/'; // Fallback to home/role selection if accountType is unknown
  };

  const dashboardText = accountType === 'seller' ? 'Go to Seller Dashboard' : 'Go to Buyer Dashboard';
  const dashboardIcon = accountType === 'seller' ? <Store className="w-6 h-6 mr-3" /> : <UserCircle className="w-6 h-6 mr-3" />;

  const bgStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  // Only render if authenticated, otherwise the useEffect will redirect
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      className="relative flex items-center justify-center w-full min-h-screen p-4 sm:p-6 lg:p-8"
      style={bgStyle}
    >
      <div className="absolute inset-0 z-0 bg-black bg-opacity-40"></div>

      <motion.div
        className="relative z-10 w-full max-w-md p-6 space-y-6 overflow-hidden text-white border shadow-2xl bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl sm:p-8 lg:p-10 text-center"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold mb-4">Welcome, {user?.username || 'User'}!</h1>
        <p className="text-lg text-gray-200 mb-8">
          You've successfully logged in as a {accountType}.
        </p>

        <Link
          to={getDashboardPath()}
          className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white font-semibold text-xl rounded-md shadow-lg hover:bg-orange-700 transition-colors duration-200"
        >
          {dashboardIcon}
          {dashboardText}
        </Link>

        {/* Optional: Link back to home or a product listing page */}
        <div className="mt-8">
          <Link to="/products" className="text-gray-300 hover:text-orange-400 flex items-center justify-center">
            <Home className="w-5 h-5 mr-2" /> Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
