import React from "react";
import grade1Img from "./assets/primarypic1.jpeg";
import grade2Img from "./assets/primarypic2.jpeg";
import grade3Img from "./assets/primarypic3.jpeg";
import grade4Img from "./assets/primarypic4.jpeg";
import grade5Img from "./assets/primarypic5.jpeg";

const Primary = () => {
  const grades = [
    {
      title: "Grade 1",
      image: grade1Img,
      description:
        "Grade 1 marks the beginning of formal education under CBC. Learners focus on literacy, numeracy, and environmental awareness, developing curiosity and responsibility through hands-on learning.",
    },
    {
      title: "Grade 2",
      image: grade2Img,
      description:
        "Learners continue strengthening foundational skills in reading, writing, and counting. Emphasis is placed on communication, collaboration, and positive values in everyday activities.",
    },
    {
      title: "Grade 3",
      image: grade3Img,
      description:
        "Grade 3 emphasizes creativity and self-expression through art, music, and physical education. Learners also begin exploring digital literacy and community-based projects.",
    },
    {
      title: "Grade 4",
      image: grade4Img,
      description:
        "At Grade 4, learners transition into the upper primary level. They are introduced to more structured subjects like science and technology, social studies, and life skills education.",
    },
    {
      title: "Grade 5",
      image: grade5Img,
      description:
        "Learners are encouraged to think critically, solve real-life problems, and participate in group projects. Practical learning through experiments and digital tools becomes key.",
    },
    {
      title: "Grade 6",
      image: grade3Img,
      description:
        "Grade 6 is the final stage of primary education under CBC. Learners consolidate knowledge across disciplines and prepare for Junior Secondary School through national assessments.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-100 p-8 mt-10">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-700 mb-10">
        Primary School Education (Grades 1–6)
      </h1>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {grades.map((grade, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition transform duration-300"
          >
            <img
              src={grade.image}
              alt={grade.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-3 text-orange-700">
                {grade.title}
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {grade.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Note */}
      <div className="text-center mt-12 text-gray-600 italic">
        “Primary education under the CBC model nurtures skills, values, and attitudes for lifelong learning.”
      </div>
    </div>
  );
};

export default Primary;
