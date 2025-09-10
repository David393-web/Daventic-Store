// src/components/Dashboards/SellerHeader.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Bell, Search, Sun, Moon, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SellerHeader = ({ isDarkMode, toggleDarkMode }) => {
  const { user } = useSelector((state) => state.auth); // Get user data from Redux

  return (
    <header className={`w-full p-4 border-b ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-200 text-gray-900'} shadow-sm`}>
      <div className="flex items-center justify-between">
        {/* Dashboard Title / Welcome Message */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold lg:hidden">Seller Panel</h1> {/* Hidden on large screens if sidebar already has title */}
          <span className="hidden ml-4 text-xl font-semibold lg:block">Welcome, {user?.username || 'Seller'}!</span>
        </div>

        {/* Right Section: Search, Notifications, Profile Link, Dark Mode Toggle */}
        <div className="flex items-center space-x-4">
          {/* Search (Optional: implement search functionality for products/orders) */}
          <div className="relative hidden md:block">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search dashboard..."
              className={`pl-10 pr-4 py-2 rounded-full outline-none transition-all duration-200
                ${isDarkMode ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' : 'bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500'}
                focus:ring-2 focus:ring-orange-500 w-48
              `}
            />
          </div>

          {/* Notifications (Placeholder) */}
          <button className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors duration-200`}>
            <Bell className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors duration-200 flex items-center justify-center`}
          >
            {isDarkMode ? <Moon className="w-6 h-6 text-blue-300" /> : <Sun className="w-6 h-6 text-yellow-500" />}
          </button>

          {/* User Profile Link (to SellerDashboardProfile) */}
          <Link
            to="/seller/dashboard/profile"
            className={`flex items-center space-x-2 p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors duration-200`}
          >
            <UserCircle className={`w-8 h-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            <span className="hidden text-sm font-medium md:block">{user?.username || 'Profile'}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;
