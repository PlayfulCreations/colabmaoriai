import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    login(token);
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-200 to-green-100">
      <form
        className="bg-white p-8 rounded shadow-md w-80"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <label className="block mb-2 text-gray-700">API Token</label>
        <input
          className="w-full border px-3 py-2 rounded mb-4"
          type="password"
          value={token}
          onChange={e => setToken(e.target.value)}
          placeholder="Paste your OpenAI API token"
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          type="submit"
          disabled={!token}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
