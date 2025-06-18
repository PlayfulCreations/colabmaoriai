import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Placeholder imports – real components added as you build sections
const Login = React.lazy(() => import("./pages/Login"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const AdminPanel = React.lazy(() => import("./pages/AdminPanel"));

const App = () => (
  <Router>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </React.Suspense>
  </Router>
);

export default App;
