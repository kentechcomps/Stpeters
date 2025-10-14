import React, { useState } from "react";
import grade7Img from "./assets/jss1.jpeg";
import grade8Img from "./assets/jss2.jpeg";
import grade9Img from "./assets/jss4.jpeg";



const Pictorials = () => {
      const [isPaused, setIsPaused] = useState(false); // 👈 NEW STATE

        const highlights = [
          {
            title: "Modern Learning",
            desc: "Smart classrooms with digital tools that make learning interactive and fun.",
            img: grade7Img
          },
          {
            title: "CBC Aligned",
            desc: "Competency-Based Curriculum designed to build practical skills and values.",
            img:  grade8Img
          },
          {
            title: "Qualified Teachers",
            desc: "Dedicated educators committed to nurturing every learner’s potential.",
            img: grade9Img
          },
          {
            title: "Safe Environment",
            desc: "A secure, nurturing, and inclusive environment for every child.",
          },
          {
            title: "Extracurricular Activities",
            desc: "Sports, music, and arts programs that develop creativity and teamwork.",
          },
        ];
  return (
    <div className="pictorials-container">
      <h2>Pictorials Component</h2>
               <div
            className="overflow-hidden w-full"
            onMouseEnter={() => setIsPaused(true)}   // 👈 Pause when hovered
            onMouseLeave={() => setIsPaused(false)}  // 👈 Resume when unhovered
          >
            <div
              className={`flex gap-6 px-8 py-6 ${
                isPaused ? "animate-scroll-paused" : "animate-scroll"
              }`}
            >
              {[...highlights, ...highlights].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 min-w-[260px] text-white shadow-md hover:bg-white/20 transition"
                >
                  {item.img && (<div className="mt-2">
                    <img src={item.img} alt={item.title} className="w-full h-32 object-cover rounded-lg"/>
                  </div>)}
                </div>
              ))}
            </div>
          </div>
    </div>
  );
}
export default Pictorials;