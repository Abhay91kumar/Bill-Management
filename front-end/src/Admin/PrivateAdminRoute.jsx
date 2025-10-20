import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 

const PrivateAdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    if (decoded.role !== 1) {
      return <Navigate to="/login" />;
    }
    return children;
  } catch (err) {
    console.error("Token decode error:", err);
    return <Navigate to="/login" />;
  }
};

export default PrivateAdminRoute;
