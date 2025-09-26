import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Authcontext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    const { success, message } = await login(email, password);

    if (!success) {
      setError(message || "Login failed. Please check credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://img.icons8.com/ios-filled/100/000000/school-building.png"
            alt="School Logo"
            className="h-20 w-20"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          School Management System
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-300"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-300"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
