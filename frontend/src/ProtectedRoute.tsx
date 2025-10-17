// src/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // 🔹 Redirige si no hay token
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
