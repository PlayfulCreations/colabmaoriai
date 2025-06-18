import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // --- DEMO ONLY: Always logs in as user or admin depending on username ---
    if (username === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <div className="bg-white text-primary rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Maori.AI Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            autoFocus
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-green-900 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-xs text-center text-gray-600">
          <div>Demo users: <b>admin</b> or any other username</div>
          <div>Password: anything</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
