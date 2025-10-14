import React from "react";
import grade10Img from "./assets/sec3.jpeg";
import grade11Img from "./assets/sec2.jpeg";
import grade12Img from "./assets/sec4.jpeg";

const SeniorSecondary = () => {
  const levels = [
    {
      title: "Grade 10",
      image: grade10Img,
      description:
        "Grade 10 marks the entry into Senior Secondary School, where learners choose career pathways such as STEM, Social Sciences, or Arts & Sports. They begin specialized learning guided by their interests and talents, building critical skills for higher education and employment.",
    },
    {
      title: "Grade 11",
      image: grade11Img,
      description:
        "In Grade 11, students deepen their understanding within their chosen pathways. Learning emphasizes research, innovation, leadership, and entrepreneurship. Continuous assessment and project-based learning prepare learners for national and global opportunities.",
    },
    {
      title: "Grade 12",
      image: grade12Img,
      description:
        "Grade 12 is the final stage of Senior School. Learners demonstrate mastery of competencies through capstone projects, practical assessments, and national evaluation. They are prepared for university, technical institutes, or direct entry into the job market.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-8 mt-10">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-10">
        Senior Secondary School (Grades 10–12)
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
              <h2 className="text-xl font-semibold mb-3 text-purple-700">
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
        “Senior Secondary prepares learners to pursue their passions, innovate, and contribute meaningfully to society.”
      </div>
    </div>
  );
};

export default SeniorSecondary;
