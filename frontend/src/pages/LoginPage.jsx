import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const LoginPage = () => {
  const [userRole, setUserRole] = useState("mentee"); // Default role is mentee
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
        body: JSON.stringify({ email, password, role: userRole }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("userRole", data.user.role); // Store the role

        // Check the role and navigate accordingly
        if (data.user.role === "mentee") {
          navigate("/mentee-profile");
        } else if (data.user.role === "mentor") {
          navigate("/mentor-profile");
        }
      } else {
        setError(data.message || "Login failed");
        console.error("Login error:", data);
      }
    } catch (error) {
      console.error("Login error details:", error);
      setError("Network error or server is not responding");
    }
  };

  const handleSocialLogin = (provider) => {
    // Redirect to your backend or OAuth handler URL for social login
    const baseURL = "https://your-backend-url.com/auth";
    window.location.href = `${baseURL}/${provider}?role=${userRole}`; // Pass the selected role to the backend
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-200 py-12 px-6 pt-20">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-10">
          <h2 className="text-3xl font-extrabold text-green-800 text-center mb-6">
            Login to Your Account
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Role Selection */}
          <div className="flex justify-center space-x-6 mb-6">
            <button
              onClick={() => setUserRole("mentee")}
              className={`${
                userRole === "mentee"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-green-600 border-gray-300"
              } border-2 py-2 px-6 rounded-lg transition-all`}
            >
              Mentee
            </button>
            <button
              onClick={() => setUserRole("mentor")}
              className={`${
                userRole === "mentor"
                  ? "bg-orange-600 text-white border-orange-600"
                  : "bg-white text-orange-600 border-gray-300"
              } border-2 py-2 px-6 rounded-lg transition-all`}
            >
              Mentor
            </button>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4 mb-6">
            <button
              onClick={() => handleSocialLogin("google")}
              className="w-full flex items-center justify-center bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition-all"
            >
              <FontAwesomeIcon icon={faGoogle} className="w-6 h-6 mr-2" />
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialLogin("linkedin")}
              className="w-full flex items-center justify-center bg-blue-700 text-white py-3 rounded-lg shadow-md hover:bg-blue-800 transition-all"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6 mr-2" />
              Continue with LinkedIn
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center my-6">
            <div className="border-t w-1/3" />
            <span className="mx-4 text-sm text-gray-500">or</span>
            <div className="border-t w-1/3" />
          </div>

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
