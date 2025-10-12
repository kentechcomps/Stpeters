import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Authcontext";
import logo from './assets/logos.png'; 
import background from './assets/background.webp';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 mt-25 mb-25">
      {/* Outer Card Container */}
      <div className="flex w-[90%] max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.01]">
        
        {/* Left Side: Form */}
        <div className="flex-1 flex items-center justify-center p-10 bg-white">
          <div className="w-full max-w-sm">
            {/* Logo */}
            <div className="flex justify-start mb-6">
              <div className="w-12 h-12  items-center justify-center">
                <img
                  src={logo}
                  alt="School Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Kindly Login
            </h1>
          
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Enter your password"
                />
              </div>

        

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-semibold shadow-md hover:shadow-lg"
              >
                Sign In
              </button>
            </form>

       
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div
          className="hidden md:flex flex-1 relative items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-20 rounded-r-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
