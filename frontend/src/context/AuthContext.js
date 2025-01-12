import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Create the context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for the user data when the app loads
    const storedUser = localStorage.getItem("user");
    const storedIsLoggedin = localStorage.getItem("isLoggedin");

    if (storedIsLoggedin === "true" && storedUser) {
      setIsLoggedin(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setIsLoggedin(true);
    setUser(userData.user);
    // Save the user data and login state in localStorage
    localStorage.setItem("isLoggedin", "true");
    localStorage.setItem("user", JSON.stringify(userData.user));
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setIsLoggedin(false);
    setUser(null);
    // Remove user data from localStorage
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedin, setIsLoggedin, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
