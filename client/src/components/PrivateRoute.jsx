// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  // 🔄 wait until redux-persist rehydrates user
  if (user === undefined) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/RoleSelectionPage" replace />;
  }

  if (user?.accountType === "seller" && location.pathname.startsWith("/user")) {
    return <Navigate to="/seller/dashboard" replace />;
  }

  if (user?.accountType === "user" && location.pathname.startsWith("/seller")) {
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;
