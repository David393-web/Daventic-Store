// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth); // ✅ use auth slice

  if (!isAuthenticated) {
    return <Navigate to="/seller-login" replace />; // redirect to login if not authenticated
  }

  return children;
};

export default PrivateRoute;
