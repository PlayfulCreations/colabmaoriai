import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import ProtectedDashboardRoute from "./routes/ProtectedDashboardRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedDashboardRoute>
              <Dashboard />
            </ProtectedDashboardRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          }
        />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
