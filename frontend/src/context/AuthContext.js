import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data
  const [token, setToken] = useState(null); // Stores authentication token
  const [loading, setLoading] = useState(true); // For showing loaders while context initializes
  const [isLoggedin, setisLoggedin] = useState(false);

  const navigate = useNavigate();

  // Initialize user and token from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
    }
    setLoading(false); // Done initializing
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
    setisLoggedin(true);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setisLoggedin(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isLoggedin }}>
      {children}
    </AuthContext.Provider>
  );
};
