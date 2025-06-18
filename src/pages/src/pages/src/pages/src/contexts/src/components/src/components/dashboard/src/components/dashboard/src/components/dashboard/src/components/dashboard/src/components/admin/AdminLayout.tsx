import React from "react";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-primary">
    <header className="bg-accent text-white px-6 py-4 shadow">
      <h2 className="text-xl font-bold">Maori.AI Admin Panel</h2>
    </header>
    <main className="flex-1 container mx-auto p-6">{children}</main>
    <footer className="bg-accent text-white text-center py-2">
      &copy; {new Date().getFullYear()} Maori.AI
    </footer>
  </div>
);

export default AdminLayout;
