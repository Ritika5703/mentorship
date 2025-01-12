import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Logout = () => {
    const { setIsLoggedin, setUser } = useContext(AuthContext);
    setIsLoggedin(false);
    setUser(null);
    // Remove user data from localStorage
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    return <Navigate to="/" />;
}

export default Logout
