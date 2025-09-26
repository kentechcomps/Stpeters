import React, { useState } from 'react';
import { ArrowRight, Loader2 } from "lucide-react"; 
import logo from './assets/logo.png'; 
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLoginClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="relative bg-gradient-to-r from-red-500 via-rose-600 to-slate-800 text-white py-6 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="w-32 h-16 bg-white border border-rose-500 flex items-center justify-center rounded-md shadow-md hover:shadow-lg hover:shadow-rose-400/50 transition">
            <img src={logo} alt="Logo" className="w-32 h-16 object-contain" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {/* Primary Button */}
          <button className="bg-white text-rose-700 px-6 py-3 rounded-md text-lg font-semibold shadow-md hover:bg-gray-100 transition">
            Apply Now
          </button>

          {/* Secondary Button (Login) */}
          <button
            onClick={handleLoginClick}
            disabled={loading}
            className="flex items-center gap-2 border border-white text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-rose-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Redirecting...
              </>
            ) : (
              <>
                Login <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
