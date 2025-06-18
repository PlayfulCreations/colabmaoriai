import React from "react";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gray-100 p-4">
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-accent">Admin Panel</h1>
      </header>
      <main>{children}</main>
    </div>
  </div>
);

export default AdminLayout;
