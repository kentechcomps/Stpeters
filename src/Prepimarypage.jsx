import React from "react";
import pp1Img from "./assets/preprimary.jpeg";
import pp2Img from "./assets/preprimary2.jpeg";
import playImg from "./assets/preprimary3.jpeg";

const PrePrimary = () => {
  const levels = [
    {
      title: "Pre-Primary 1 (PP1)",
      image: pp1Img,
      description:
        "At PP1, children are introduced to structured learning through fun, storytelling, and discovery. The focus is on developing curiosity, communication, and basic literacy skills.",
    },
    {
      title: "Pre-Primary 2 (PP2)",
      image: pp2Img,
      description:
        "PP2 builds on early foundations with a greater focus on creativity, problem-solving, and teamwork. Children begin to express themselves through art, music, and imaginative play.",
    },
    {
      title: "Play & Discovery",
      image: playImg,
      description:
        "We believe learning through play is essential for growth. Children engage in interactive activities that develop their motor skills, confidence, and emotional awareness.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 p-8 mt-10">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-700 mb-10">
        Pre-Primary Education in Kenya
      </h1>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {levels.map((level, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition transform duration-300"
          >
            <img
              src={level.image}
              alt={level.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-3 text-pink-700">
                {level.title}
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {level.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Note */}
      <div className="text-center mt-12 text-gray-600 italic">
        “A strong foundation in the early years sets the stage for lifelong learning.”
      </div>
    </div>
  );
};

export default PrePrimary;
