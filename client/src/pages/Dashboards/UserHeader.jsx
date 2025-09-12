// src/pages/UserDashboards/UserHeader.jsx
import React from "react";

const UserHeader = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header
      className={`flex justify-between items-center px-6 py-4 shadow-md ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h1 className="text-xl font-bold">Welcome to your Dashboard</h1>
      <button
        onClick={toggleDarkMode}
        className="px-4 py-2 text-white bg-blue-600 rounded-md"
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default UserHeader;
