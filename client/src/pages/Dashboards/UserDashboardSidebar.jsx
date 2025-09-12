// src/pages/UserDashboards/UserDashboardSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const UserDashboardSidebar = ({ isDarkMode, activePath }) => {
  const menuItems = [
    { name: "Overview", path: "overview" },
    { name: "Orders", path: "orders" },
    { name: "Cart", path: "cart" },
    { name: "Profile", path: "profile" },
    { name: "Settings", path: "settings" },
  ];

  return (
    <aside
      className={`w-full lg:w-64 p-6 border-r ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <h2 className="mb-6 text-xl font-bold">User Dashboard</h2>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={`/user-dashboard/${item.path}`}
              className={`block px-4 py-2 rounded-md transition ${
                activePath === item.path
                  ? "bg-blue-500 text-white"
                  : isDarkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default UserDashboardSidebar;
