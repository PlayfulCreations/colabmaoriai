import React from "react";
import AdminLayout from "../components/admin/AdminLayout";
import AdminPanelDashboard from "../components/admin/AdminPanelDashboard";

const AdminPanel: React.FC = () => (
  <AdminLayout>
    <AdminPanelDashboard />
  </AdminLayout>
);

export default AdminPanel;
