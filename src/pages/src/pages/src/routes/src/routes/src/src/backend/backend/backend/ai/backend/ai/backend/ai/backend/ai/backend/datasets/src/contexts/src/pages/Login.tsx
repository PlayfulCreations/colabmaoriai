import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login: React.FC = () => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === "login") {
        await login(username, password);
        if (username === "admin") navigate("/admin");
        else navigate("/dashboard");
      } else {
        await register(username, password, role);
        setMode("login");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <div className="bg-white p-8 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4">{mode === "login" ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border px-3 py-2 rounded"
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="w-full border px-3 py-2 rounded"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
          {mode === "register" && (
            <select
              className="w-full border px-3 py-2 rounded"
              value={role}
              onChange={e => setRole(e.target.value as "user" | "admin")}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          )}
          {error && <div className="text-red-600">{error}</div>}
          <button
            className="w-full bg-accent text-white py-2 rounded hover:bg-opacity-90"
            type="submit"
          >
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center">
          {mode === "login" ? (
            <>
              <span>Don't have an account?</span>
              <button
                className="ml-2 text-blue-600 hover:underline"
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <span>Already have an account?</span>
              <button
                className="ml-2 text-blue-600 hover:underline"
                onClick={() => setMode("login")}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
