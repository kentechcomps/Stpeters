import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUsers, FaGlobeAmericas, FaHandshake } from "react-icons/fa";

// Smooth Counter Component
const Counter = ({ target, label, suffix = "", Icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const stepTime = 16; // ~60fps
    const increment = target / (duration / stepTime);

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(counter);
      }
      setCount(Number(start.toFixed(0)));
    }, stepTime);

    return () => clearInterval(counter);
  }, [target]);

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-8 text-center hover:scale-105 transform transition duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-center mb-4">
        <Icon className="text-gold text-5xl drop-shadow-lg" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-gold drop-shadow-md">
        {count}
        {suffix}
      </h2>
      <p className="mt-3 text-lg text-gray-200 font-medium">{label}</p>
    </motion.div>
  );
};

const AchievementsSection = () => {
  return (
    <section className="relative bg-navy py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gold mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our Achievements
        </motion.h2>

        {/* Animated underline */}
        <motion.div
          className="mx-auto w-40 h-1 rounded-full bg-gradient-to-r from-gold via-yellow-300 to-gold bg-[length:200%_100%]"
          initial={{ backgroundPosition: "200% 0" }}
          animate={{ backgroundPosition: ["200% 0", "0% 0"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          <Counter
            target={20}
            suffix="+"
            label="Years of Academic Elegance"
            Icon={FaGraduationCap}
          />
          <Counter
            target={5000}
            suffix="+"
            label="Strong Alumni Base"
            Icon={FaUsers}
          />
          <Counter
            target={30}
            suffix="+"
            label="Global Recognitions"
            Icon={FaGlobeAmericas}
          />
          <Counter
            target={100}
            suffix="%"
            label="Parental Trust Index"
            Icon={FaHandshake}
          />
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
