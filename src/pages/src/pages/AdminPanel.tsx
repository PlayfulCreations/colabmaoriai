import React from "react";
import AdminLayout from "../components/admin/AdminLayout";
import UserManagement from "../components/admin/UserManagement";
import Analytics from "../components/admin/Analytics";
import Settings from "../components/admin/Settings";

const AdminPanel: React.FC = () => (
  <AdminLayout>
    <UserManagement />
    <div className="grid md:grid-cols-2 gap-8 mt-8">
      <Analytics />
      <Settings />
    </div>
  </AdminLayout>
);

export default AdminPanel;
