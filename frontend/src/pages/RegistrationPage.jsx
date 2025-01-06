import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const RegistrationPage = () => {
  const [name, setFullName] = useState(""); // Renamed from 'name' to 'fullName'
  const [email, setEmail] = useState(""); // Added email state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordFeedback, setPasswordFeedback] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email, password }),
      });

      const data = await response.json();
      console.log("Response data:", data); // Log the response

      if (response.ok) {
        console.log("Registration successful", data);
        window.location.href = "/login";
      } else {
        console.error("Error response:", data); // Log error details
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Fetch error:", err); // Log the actual error
      setError("Something went wrong. Please try again.");
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);

    // Check password criteria
    const feedback = getPasswordFeedback(password);
    setPasswordFeedback(feedback);
  };

  const getPasswordFeedback = (password) => {
    const lengthCheck = password.length >= 8;
    const numberCheck = /\d/.test(password);
    const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Basic feedback
    if (lengthCheck && numberCheck && specialCharCheck) {
      return "Strong";
    } else if (lengthCheck && (numberCheck || specialCharCheck)) {
      return "Medium";
    } else {
      return "Weak";
    }
  };

  const handleSocialLogin = (provider) => {
    // Redirect to your backend or OAuth handler URL for social login
    const baseURL = "https://localhost:3000/auth";
    window.location.href = `${baseURL}/${provider}`;
  };

  return (
    <div>
      <div className="min-h-screen flex items-center bg-gradient-to-r from-green-50 to-green-200 justify-center bg-gray-50 py-12 px-6 pt-20">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-10">
          <h2 className="text-3xl font-extrabold text-green-800 text-center mb-6">
            Register
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Social Login Buttons */}
          <div className="space-y-4 mb-6">
            <button
              onClick={() => handleSocialLogin("google")}
              className="w-full flex items-center justify-center bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition-all"
            >
              <FontAwesomeIcon icon={faGoogle} className="w-6 h-6 mr-2" />
              Sign up with Google
            </button>
            <button
              onClick={() => handleSocialLogin("linkedin")}
              className="w-full flex items-center justify-center bg-blue-700 text-white py-3 rounded-lg shadow-md hover:bg-blue-800 transition-all"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6 mr-2" />
              Sign up with LinkedIn
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center my-6">
            <div className="border-t w-1/3" />
            <span className="mx-4 text-sm text-gray-500">or</span>
            <div className="border-t w-1/3" />
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 mb-4 border-2 border-green-300 rounded-lg"
              value={name}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 mb-4 border-2 border-green-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full p-4 mb-4 border-2 ${
                  passwordFeedback === "Weak"
                    ? "border-red-500"
                    : passwordFeedback === "Medium"
                    ? "border-yellow-500"
                    : "border-green-300"
                } rounded-lg`}
              />
              {/* Password feedback */}
              <div className="text-sm mt-1 text-center">
                <span
                  className={`font-semibold ${
                    passwordFeedback === "Weak"
                      ? "text-red-500"
                      : passwordFeedback === "Medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {passwordFeedback ? `Password is ${passwordFeedback}` : ""}
                </span>
              </div>
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full p-4 mb-4 border-2 ${
                  passwordMatch ? "border-green-300" : "border-red-500"
                } rounded-lg`}
              />
              {/* Error for mismatched password */}
              {!passwordMatch && (
                <div className="text-red-500 text-sm text-center mt-1">
                  Passwords do not match
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all"
            >
              Register
            </button>
          </form>

          {/* Login Redirect */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-600 hover:underline font-medium"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
