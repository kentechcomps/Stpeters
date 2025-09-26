import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2 } from "lucide-react"; 
import logo from './assets/logo.png'; 
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";


const Topnavigationbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLoginClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 md:px-10">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
          <span className="font-bold text-lg text-gray-800">St. Peter’s Academy</span>
        </div>

        {/* Menu Toggle (Mobile) */}
        <button 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
          className="md:hidden focus:outline-none"
        >
          {isOpen ? (
            <img
              src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
              width="32"
              height="32"
              alt="Close"
            />
          ) : (
            <img
              src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
              width="32"
              height="32"
              alt="Menu"
            />
          )}
        </button>

        {/* Links (Desktop + Mobile Dropdown) */}
        <div
          className={`flex-col md:flex-row md:flex gap-6 font-semibold text-gray-700 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-6 md:p-0 transition-all duration-300 ease-in-out ${
            isOpen ? 'flex' : 'hidden'
          }`}
        >
          <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
          <a href="#aboutus" className="hover:text-blue-600">About</a>
          <a href="#gallery" className="hover:text-blue-600">Downloads</a>
          <NavLink to="/contactus" className="hover:text-blue-600">Contactus</NavLink>

          {/* Mobile Extras (Socials + Buttons) */}
          <div className="flex flex-col md:hidden gap-6 mt-6">
            
            {/* Social Media */}
{/* Social Icons */}
<div className="flex justify-center space-x-6 mt-6">
  <a
    href="#"
    className="bg-white p-2 rounded-full text-blue-900 hover:bg-yellow-400 transition-all"
  >
    <Facebook className="w-5 h-5" />
  </a>
  <a
    href="#"
    className="bg-white p-2 rounded-full text-blue-900 hover:bg-yellow-400 transition-all"
  >
    <Twitter className="w-5 h-5" />
  </a>
  <a
    href="#"
    className="bg-white p-2 rounded-full text-blue-900 hover:bg-yellow-400 transition-all"
  >
    <Instagram className="w-5 h-5" />
  </a>
  <a
    href="#"
    className="bg-white p-2 rounded-full text-blue-900 hover:bg-yellow-400 transition-all"
  >
    <Linkedin className="w-5 h-5" />
  </a>
</div>


            {/* Action Buttons */}
            <div className="flex flex-col items-center gap-4">
              {/* Apply Now */}
              <button
                className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold shadow hover:scale-105 transition"
              >
                Apply Now
              </button>

              {/* Login */}
              <button
                onClick={handleLoginClick}
                disabled={loading}
                className="w-full flex items-center justify-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Login <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Section (Desktop Only) */}
        <div className="hidden md:flex items-center gap-6">
          
          {/* Social Media */}
{/* Social Icons */}
<div className="flex items-center space-x-4">
  <a
    href="#"
    className="bg-white p-2 rounded-full text-blue-900 hover:bg-yellow-400 transition-all"
  >
    <Facebook className="w-5 h-5" />
  </a>
  <a
    href="#"
    className="bg-white p-2 rounded-full text-blue-900 hover:bg-yellow-400 transition-all"
  >
    <Twitter className="w-5 h-5" />
  </a>
  <a
    href="#"
    className="bg-white p-2 rounded-full text-blue-900 hover:bg-yellow-400 transition-all"
  >
    <Instagram className="w-5 h-5" />
  </a>
  <a
    href="#"
    className="bg-white p-2 rounded-full text-blue-900 hover:bg-yellow-400 transition-all"
  >
    <Linkedin className="w-5 h-5" />
  </a>
</div>


          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold shadow hover:scale-105 transition"
            >
              Apply Now
            </button>
            <button
              onClick={handleLoginClick}
              disabled={loading}
              className="flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Login <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Topnavigationbar;
