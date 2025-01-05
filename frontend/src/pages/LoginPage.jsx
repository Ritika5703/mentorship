import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  // const [userRole, setUserRole] = useState("mentee"); // Default role is mentee
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

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
        login(data.user, data.token);

        // Redirect to the user's profile page
        navigate("/profile", { state: { user: data.user } });
      } else {
        setError(data.message || "Login failed");
        console.error("Login error:", data);
      }
    } catch (error) {
      console.error("Login error details:", error);
      setError("Network error or server is not responding");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-200 py-12 px-6 pt-20">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-10">
          <h2 className="text-3xl font-extrabold text-green-800 text-center mb-6">
            Login to Your Account
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

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
      <Footer />
    </div>
  );
};

export default LoginPage;
