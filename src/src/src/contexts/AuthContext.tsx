import React, { createContext, useContext, useState } from "react";

type User = { token: string };
type AuthContextType = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("maori-ai-user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (token: string) => {
    setUser({ token });
    localStorage.setItem("maori-ai-user", JSON.stringify({ token }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("maori-ai-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
