import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  // const [userRole, setUserRole] = useState("mentee"); // Default role is mentee
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();

      if (data.success) {
        // Login via context
        login(data);
        
        toast.success("Logged in successfully");
        // Redirect to the user's profile page
        navigate("/", { state: { user: data.user } });
      } else {
        console.error(data);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Login error details:", error);
      toast.error("Network error or server is not responding");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-200 py-12 px-6 pt-20">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-10">
          <h2 className="text-3xl font-extrabold text-green-800 text-center mb-6">
            Login to Your Account
          </h2>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 mb-4 border-2 border-green-300 rounded-lg"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 mb-4 border-2 border-green-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-green-600 hover:underline font-medium"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
