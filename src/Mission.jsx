import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Target, Heart } from "lucide-react";

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Mission = () => {
  const cards = [
    {
      title: "Mission",
      icon: <Target className="text-yellow-400 w-7 h-7" />,
      text: "At St. Peter's Academy, our mission is to provide a nurturing and challenging educational environment that fosters the holistic development of each student. We are committed to academic excellence, character formation, and lifelong learning.",
    },
    {
      title: "Vision",
      icon: <Lightbulb className="text-yellow-400 w-7 h-7" />,
      text: "To be a leading center of learning where students are inspired to excel, empowered to innovate, and prepared to become responsible global citizens who make a positive impact on the world.",
    },
    {
      title: "Values",
      icon: <Heart className="text-yellow-400 w-7 h-7" />,
      text: "We uphold integrity, respect, compassion, and a commitment to excellence. Our values shape the culture of St. Peter's Academy, guiding our students to become disciplined, ethical, and visionary leaders.",
    },
  ];

  return (
    <section className="relative py-20 bg-white text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-yellow-400 drop-shadow-lg inline-block"
          >
            Our Mission, Vision & Values
          </motion.h2>

          {/* Animated Underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="h-1 mt-3 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-full mx-auto shadow-md"
            style={{ maxWidth: "240px" }}
          />
        </div>

        {/* Cards */}
        <div className="grid gap-10 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="group bg-purple-900 border border-yellow-400/40 rounded-2xl shadow-xl p-8 transition hover:-translate-y-2 hover:shadow-yellow-500/40"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-yellow-400/20 rounded-full">{card.icon}</div>
                <h3 className="text-2xl font-bold text-yellow-300">
                  {card.title}
                </h3>
              </div>
              <p className="text-gray-100 leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative glowing orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl" />
    </section>
  );
};

export default Mission;
