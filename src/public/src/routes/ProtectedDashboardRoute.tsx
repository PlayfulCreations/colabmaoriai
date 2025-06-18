import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedDashboardRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "user" && user.role !== "admin") return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedDashboardRoute;
