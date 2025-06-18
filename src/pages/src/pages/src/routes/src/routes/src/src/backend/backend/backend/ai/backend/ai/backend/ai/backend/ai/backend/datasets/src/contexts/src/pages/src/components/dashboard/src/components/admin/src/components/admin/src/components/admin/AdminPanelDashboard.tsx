import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import UserAdminPanel from "./UserAdminPanel";
import TrainingAdminPanel from "./TrainingAdminPanel";

const AdminPanelDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between bg-white p-6 rounded shadow mb-8">
        <div>
          <h2 className="text-2xl font-bold">Welcome, {user?.username || "Admin"} (Admin)!</h2>
          <p className="text-gray-600">Manage users, datasets, and training jobs.</p>
        </div>
        <button
          className="bg-accent text-white px-4 py-2 rounded hover:bg-opacity-90"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <UserAdminPanel />
      <TrainingAdminPanel />
    </div>
  );
};

export default AdminPanelDashboard;
