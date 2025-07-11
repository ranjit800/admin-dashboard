"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // List of allowed admins
  const allowedAdmins = ["admin@test.com", "rjranjit099@gmail.com", "example@admin.com", "ranjit@oneclick.com"];

  useEffect(() => {
    const stored = localStorage.getItem("admin");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email, password) => {
    const isAllowed = allowedAdmins.includes(email);

    if (isAllowed && password === "admin123") {
      const userData = { email };
      localStorage.setItem("admin", JSON.stringify(userData));
      setUser(userData);
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    setUser(null);
    router.push("/login");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
