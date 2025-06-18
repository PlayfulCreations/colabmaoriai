import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedDashboardRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user === "admin") {
    // Admins shouldn't access user dashboard
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedDashboardRoute;
