import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const Overview: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between bg-white p-6 rounded shadow mb-8">
      <div>
        <h2 className="text-2xl font-bold">Welcome, {user?.username || "User"}!</h2>
        <p className="text-gray-600">Access your AI tools, datasets, and more.</p>
      </div>
      <button
        className="bg-accent text-white px-4 py-2 rounded hover:bg-opacity-90"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Overview;
