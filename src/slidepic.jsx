import React, { useState, useEffect, useRef } from "react";
import sec3 from "./assets/sec3.jpeg";
import grade7Img from "./assets/jss1.jpeg";
import grade8Img from "./assets/jss2.jpeg";
import grade9Img from "./assets/jss4.jpeg";

const Slide = () => {
  const slides = [
    {
      src: grade8Img,
      alt: "Students in class",
      title: "Learning Together",
      caption: "Bright minds at St. Peter's — active learning in progress.",
    },
    {
      src: grade7Img,
      alt: "School building",
      title: "Our School",
      caption: "A calm environment conducive to study and growth.",
    },
    {
      src: sec3,
      alt: "Children playing",
      title: "Play & Growth",
      caption: "Holistic development through play and teamwork.",
    },
     {
      src: grade9Img,
      alt: "Children playing",
      title: "Play & Growth",
      caption: "Holistic development through play and teamwork.",
    }
  ];

  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // autoplay
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
    // eslint-disable-next-line
  }, [index]);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  // swipe gesture
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (delta > 50) nextSlide();
    if (delta < -50) prevSlide();
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 mt-10"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="min-w-full relative">
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white/70 backdrop-blur-md text-center p-4">
              <h3 className="text-lg font-semibold text-purple-800">
                {slide.title}
              </h3>
              <p className="text-sm text-gray-700">{slide.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md ring-1 ring-purple-300"
      >
        <svg
          className="w-5 h-5 text-purple-700"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M12.293 16.293a1 1 0 010-1.414L8.414 11H16a1 1 0 110-2H8.414l3.879-3.879a1 1 0 10-1.414-1.414l-5.586 5.586a1 1 0 000 1.414l5.586 5.586a1 1 0 001.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md ring-1 ring-purple-300"
      >
        <svg
          className="w-5 h-5 text-purple-700"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7.707 3.707a1 1 0 010 1.414L11.586 9H4a1 1 0 100 2h7.586l-3.879 3.879a1 1 0 101.414 1.414l5.586-5.586a1 1 0 000-1.414L9.121 3.707a1 1 0 00-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index
                ? "w-8 bg-gradient-to-r from-purple-600 to-purple-400 shadow-md"
                : "bg-white/70 ring-1 ring-purple-200"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slide;
