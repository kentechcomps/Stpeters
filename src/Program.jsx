import { FaChild, FaBookOpen, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Divider = () => (
  <div className="w-full flex justify-center my-12">
    <div className="h-1 w-32 bg-gradient-to-r from-gold-400 via-gold-600 to-gold-400 rounded-full shadow-md"></div>
  </div>
);

const Programs = () => {
  return (
    <section id="aboutus" className="w-full bg-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-6 text-navy-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Our <span className="text-gold-600">CBC Programs</span>
        </motion.h2>

        <motion.p
          className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Following Kenya’s Competency-Based Curriculum (CBC), our programs are
          designed to nurture holistic learners through foundational skills,
          creativity, and career pathways.
        </motion.p>

        {/* Levels */}
        <div className="space-y-16">
          {/* Pre-Primary */}
          <motion.div
            className="pl-6 border-l-4 border-gold-500 relative text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <FaChild className="absolute -left-10 top-2 text-gold-500 text-4xl md:static md:mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-navy-900 mb-2">
              Pre-Primary Education (PP1 & PP2)
            </h3>
            <p className="text-gray-700 mb-4">
              <span className="font-medium text-navy-800">Ages:</span> 4–5 years <br />
              <span className="font-medium text-navy-800">Focus:</span> Foundational skills in
              language, numeracy, psychomotor, social skills, and play-based learning.
            </p>
            <ul className="list-disc list-inside text-gray-700 inline-block text-left">
              <li>Literacy & Numeracy</li>
              <li>Environmental Activities</li>
              <li>Religious Activities</li>
              <li>Music & Creative Arts</li>
              <li>Movement & Play-Based Learning</li>
            </ul>
          </motion.div>

          <Divider />

          {/* Primary */}
          <motion.div
            className="pl-6 border-l-4 border-navy-700 relative text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <FaBookOpen className="absolute -left-10 top-2 text-navy-700 text-4xl md:static md:mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-navy-900 mb-2">
              Primary Education (Grades 1–6)
            </h3>
            <p className="text-gray-700 mb-4">
              <span className="font-medium text-navy-800">Ages:</span> 6–11 years
            </p>

            <h4 className="text-lg font-semibold text-gold-600 mb-2">
              Lower Primary (Grades 1–3)
            </h4>
            <ul className="list-disc list-inside text-gray-700 inline-block text-left mb-6">
              <li>Literacy, Kiswahili & English</li>
              <li>Mathematics</li>
              <li>Environmental Activities</li>
              <li>Hygiene & Nutrition</li>
              <li>Movement & Religious Education</li>
              <li>Creative Arts</li>
            </ul>

            <h4 className="text-lg font-semibold text-gold-600 mb-2">
              Upper Primary (Grades 4–6)
            </h4>
            <ul className="list-disc list-inside text-gray-700 inline-block text-left">
              <li>English, Kiswahili/KSL</li>
              <li>Mathematics, Science & Technology</li>
              <li>Social Studies & Agriculture</li>
              <li>Home Science & Creative Arts</li>
              <li>Physical Health Education</li>
              <li>Religious Education & ICT</li>
            </ul>
          </motion.div>

          <Divider />

          {/* Junior School */}
          <motion.div
            className="pl-6 border-l-4 border-gold-500 relative text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <FaChalkboardTeacher className="absolute -left-10 top-2 text-gold-500 text-4xl md:static md:mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-navy-900 mb-2">
              Junior School (Grades 7–9)
            </h3>
            <p className="text-gray-700 mb-4">
              <span className="font-medium text-navy-800">Ages:</span> 12–14 years <br />
              <span className="font-medium text-navy-800">Focus:</span> Broad exploration to
              identify interests and pathways.
            </p>
            <ul className="list-disc list-inside text-gray-700 inline-block text-left">
              <li>English, Kiswahili, Mathematics</li>
              <li>Integrated Science & Social Studies</li>
              <li>Pre-Technical & Pre-Career Education</li>
              <li>Business Studies & Agriculture</li>
              <li>Religious & Health Education</li>
              <li>Sports, Life Skills, Foreign Languages</li>
            </ul>
          </motion.div>

          <Divider />

          {/* Senior School */}
          <motion.div
            className="pl-6 border-l-4 border-navy-700 relative text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <FaUserGraduate className="absolute -left-10 top-2 text-navy-700 text-4xl md:static md:mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-navy-900 mb-2">
              Senior School (Grades 10–12)
            </h3>
            <p className="text-gray-700 mb-4">
              <span className="font-medium text-navy-800">Ages:</span> 15–17 years <br />
              <span className="font-medium text-navy-800">Pathways:</span> Students choose
              based on strengths and career interests.
            </p>
            <ul className="list-disc list-inside text-gray-700 inline-block text-left">
              <li>
                <span className="font-medium text-gold-600">Arts & Sports Science:</span> Performing arts, visual arts, physical education.
              </li>
              <li>
                <span className="font-medium text-gold-600">Social Sciences:</span> History, sociology, business, humanities.
              </li>
              <li>
                <span className="font-medium text-gold-600">STEM:</span> Science, technology,
                engineering, mathematics, innovation.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
