import React, { createContext, useState, useEffect } from "react";

// Create the context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);

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
    setUser(userData);
    // Save the user data and login state in localStorage
    localStorage.setItem("isLoggedin", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedin(false);
    setUser(null);
    // Remove user data from localStorage
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Stores user data
//   const [token, setToken] = useState(null); // Stores authentication token
//   const [loading, setLoading] = useState(true); // For showing loaders while context initializes
//   const [isLoggedin, setisLoggedin] = useState(false);

//   const navigate = useNavigate();

//   // Initialize user and token from localStorage
//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem("user"));
//     const savedToken = localStorage.getItem("token");
//     if (savedUser && savedToken) {
//       setUser(savedUser);
//       setToken(savedToken);
//     }
//     setLoading(false); // Done initializing
//   }, []);

//   const login = (userData, authToken) => {
//     setUser(userData);
//     setToken(authToken);
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", authToken);
//     setisLoggedin(true);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setisLoggedin(false);
//     navigate("/login");
//   };
