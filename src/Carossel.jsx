import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import student from './assets/logos.png';
import banner from './assets/banner.jpg';

function Carousel() {
  const images = [banner, banner, banner, banner];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <section className="relative bg-gradient-to-r from-purple-900 to-purple-200 py-20 overflow-hidden">
        {/* Animated Waves */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-[200%] h-40 text-white opacity-10 animate-wave-slow"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              fill="currentColor"
            >
              <path d="M0,224L60,197.3C120,171,240,117,360,106.7C480,96,600,128,720,149.3C840,171,960,181,1080,160C1200,139,1320,85,1380,58.7L1440,32L1440,320L0,320Z" />
            </svg>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-[200%] h-40 text-white opacity-30 animate-wave-fast"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              fill="currentColor"
            >
              <path d="M0,256L80,229.3C160,203,320,149,480,154.7C640,160,800,224,960,229.3C1120,235,1280,181,1360,154.7L1440,128L1440,320L0,320Z" />
            </svg>
          </div>
        </div>

        {/* Floating Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-8 h-8 bg-[#fbbf24] rounded-full opacity-40 animate-float-slow"></div>
          <div
            className="absolute bottom-20 left-1/3 w-0 h-0 
              border-l-[15px] border-r-[15px] border-b-[30px] 
              border-l-transparent border-r-transparent border-b-[#ffffff66] 
              opacity-50 animate-float-fast"
          ></div>
          <div className="absolute top-1/2 right-16 w-6 h-6 bg-white rounded-full opacity-30 animate-float-slower"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Empowering Students, <br /> Shaping the Future
            </h1>
            <p className="text-lg text-gray-200 max-w-lg">
              Providing quality education and a nurturing environment for tomorrow’s leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <NavLink to="/admissions">
                <button className="bg-[#fbbf24] text-[#0a1d37] font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-[#eab308] transition cursor-pointer">
                  Apply Now
                </button>
              </NavLink>

              <NavLink to="/feesection">
                <button className="border border-[#fbbf24] text-[#fbbf24] px-6 py-3 rounded-xl hover:bg-[#fbbf24] hover:text-[#0a1d37] transition cursor-pointer">
                  View Fee Structure
                </button>
              </NavLink>
            </div>
          </div>

          {/* Right Image & Levels */}
          <div className="flex-1 mt-10 md:mt-0 relative flex flex-col items-center">
            <img
              src={student}
              alt="Students Learning"
              className="w-80 h-80 max-w-md mx-auto drop-shadow-2xl"
            />

            {/* ✨ Clickable Education Levels */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                { label: "Pre-Primary", color: "bg-yellow-100 text-yellow-700", path: "/preprimary" },
                { label: "Primary School", color: "bg-green-100 text-green-700", path: "/primary" },
                { label: "Junior Secondary School", color: "bg-blue-100 text-blue-700", path: "/junior-secondary" },
                { label: "Secondary School", color: "bg-purple-100 text-purple-700", path: "/secondary" },
              ].map((level, index) => (
                <NavLink key={index} to={level.path}>
                  <div
                    className={`px-5 py-2 rounded-full text-sm font-semibold shadow-md ${level.color} hover:scale-110 transform transition cursor-pointer`}
                  >
                    {level.label}
                  </div>
                </NavLink>
              ))}
            </div>

            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-purple-600 rounded-full mt-4 animate-pulse"></div>
            <p className="text-sm text-gray-200 mt-2 italic">
              We offer holistic education across all levels
            </p>
          </div>
        </div>
      </section>

      <style>
        {`
        @keyframes waveAnimation {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-wave-slow {
          animation: waveAnimation 20s linear infinite;
        }
        .animate-wave-fast {
          animation: waveAnimation 10s linear infinite;
        }

        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-float-slow {
          animation: float 12s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float 18s ease-in-out infinite;
        }
      `}
      </style>
    </>
  );
}

export default Carousel;
