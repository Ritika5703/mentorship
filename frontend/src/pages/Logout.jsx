import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
    const { isLoggedin, logout } = useContext(AuthContext);
    logout();
    return <Navigate to="/login" />;
}

export default Logout
