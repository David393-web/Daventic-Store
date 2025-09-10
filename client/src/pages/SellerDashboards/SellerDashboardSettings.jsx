// src/components/Dashboards/SellerDashboardSettings.jsx
import React from 'react';
import { Settings, Sun, Moon } from 'lucide-react';

const SellerDashboardSettings = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
      <h2 className="flex items-center mb-6 text-2xl font-semibold">
        <Settings className="w-6 h-6 mr-2" />
        Settings
      </h2>

      {/* Dark Mode Toggle */}
      <div className={`flex items-center justify-between p-4 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-4`}>
        <span className="font-medium">Dark Mode</span>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-colors duration-200
            ${isDarkMode ? 'bg-orange-600 text-white' : 'bg-gray-300 text-gray-800'}
            hover:opacity-80 flex items-center justify-center
          `}
        >
          {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          <span className="ml-2">{isDarkMode ? 'On' : 'Off'}</span>
        </button>
      </div>

      {/* General Settings Section */}
      <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="mb-4 text-xl font-medium">General Preferences</h3>
        <div className="space-y-4">
          {/* Example Setting: Notification Preference */}
          <div className="flex items-center justify-between p-4 rounded-md bg-gray-50 dark:bg-gray-700">
            <label htmlFor="notifications" className="font-medium cursor-pointer">Email Notifications</label>
            <input
              type="checkbox"
              id="notifications"
              className="toggle toggle-primary" // Assuming a toggle switch library or custom styling
            />
          </div>

          {/* Example Setting: Language Selection */}
          <div className="flex items-center justify-between p-4 rounded-md bg-gray-50 dark:bg-gray-700">
            <label htmlFor="language" className="font-medium">Language</label>
            <select
              id="language"
              className={`p-2 rounded-md ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500`}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Settings Button */}
      <button
        className="px-6 py-3 mt-8 font-semibold text-white transition-colors duration-200 bg-orange-600 rounded-md shadow-md hover:bg-orange-700"
        onClick={() => toast.success('Settings saved!')} // Placeholder action
      >
        Save Settings
      </button>
    </div>
  );
};

export default SellerDashboardSettings;
