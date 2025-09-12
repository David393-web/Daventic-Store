// src/pages/UserDashboards/UserDashboard.jsx
import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserDashboardSidebar from "./UserDashboardSidebar";
import UserHeader from "./UserHeader";
import UserDashboardOverview from "./UserDashboardOverview";
import UserDashboardOrders from "./UserDashboardOrders";
import UserDashboardCart from "./UserDashboardCart";
import UserDashboardProfile from "./UserDashboardProfile";
import UserDashboardSettings from "./UserDashboardSettings";
import NotFoundPage from "../NotFoundPage";

const UserDashboard = ({ toggleDarkMode, isDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.auth?.user);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const rehydrated = useSelector((state) => state._persist?.rehydrated);

  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const activePath =
    lastSegment === "dashboard" || lastSegment === "" ? "overview" : lastSegment;

  useEffect(() => {
    if (rehydrated) {
      if (!isAuthenticated) {
        toast.error("Please log in to access your dashboard.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/login", { replace: true });
      } else if (user?.accountType !== "buyer") {
        toast.error("Access Denied: You must be a buyer.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, rehydrated]);

  if (!rehydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        <p>Loading authentication status...</p>
      </div>
    );
  }

  if (!isAuthenticated || user?.accountType !== "buyer") {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        <p>Access Denied. Redirecting...</p>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col lg:flex-row min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <ToastContainer />
      <UserDashboardSidebar isDarkMode={isDarkMode} activePath={activePath} />

      <main className="flex-1 overflow-auto">
        <UserHeader isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <div className="p-4 lg:p-8">
          <div
            className={`p-6 rounded-lg shadow-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <Routes>
              <Route path="/" element={<UserDashboardOverview />} />
              <Route path="overview" element={<UserDashboardOverview />} />
              <Route path="orders" element={<UserDashboardOrders />} />
              <Route path="cart" element={<UserDashboardCart />} />
              <Route path="profile" element={<UserDashboardProfile />} />
              <Route path="settings" element={<UserDashboardSettings />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
