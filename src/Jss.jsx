import React from "react";
import grade7Img from "./assets/jss1.jpeg";
import grade8Img from "./assets/jss2.jpeg";
import grade9Img from "./assets/jss4.jpeg";

const JuniorSecondary = () => {
  const levels = [
    {
      title: "Grade 7",
      image: grade7Img,
      description:
        "Grade 7 marks the beginning of Junior Secondary School (JSS) under the CBC. Learners transition from primary with an emphasis on exploring core subjects such as Integrated Science, Health Education, and Pre-Technical Studies. They start discovering their interests and potential career pathways through hands-on learning and projects.",
    },
    {
      title: "Grade 8",
      image: grade8Img,
      description:
        "At Grade 8, learners build deeper knowledge in various learning areas, focusing on problem-solving, digital literacy, and innovation. They participate in practical lessons, clubs, and community projects that encourage responsibility, collaboration, and creativity.",
    },
    {
      title: "Grade 9",
      image: grade9Img,
      description:
        "Grade 9 serves as the final stage of Junior Secondary School. Learners prepare for specialization at Senior School by exploring subjects aligned with their interests and talents. Assessment emphasizes competency, innovation, and readiness for career pathways in STEM, social sciences, and arts.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-8 mt-10">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-10">
        Junior Secondary School (Grades 7–9)
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
              <h2 className="text-xl font-semibold mb-3 text-indigo-700">
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
        “Junior Secondary School nurtures critical thinkers, innovators, and responsible citizens ready for the future.”
      </div>
    </div>
  );
};

export default JuniorSecondary;
