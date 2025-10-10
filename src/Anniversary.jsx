import { motion } from "framer-motion";
import logo from "./assets/logos.png"; // Ensure logo is in src/assets/logos.png
import { NavLink } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Anniversary = () => {
  return (
    <section className="relative w-full bg-purple-900 py-24 px-6 md:px-20 text-center overflow-hidden">
      <div className="relative max-w-5xl mx-auto flex flex-col items-center justify-center">
        
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-10"
        >
          <img
            src={logo}
            alt="St. Peter's Academy Logo"
            className="w-52 h-52 md:w-64 md:h-64 object-contain drop-shadow-xl"
          />
        </motion.div>

        {/* Title with Vibrant Gradient */}
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold mb-6 tracking-wide 
                     bg-gradient-to-r from-yellow-400 via-yellow-300 to-cyan-400 
                     bg-clip-text text-transparent drop-shadow-xl"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Celebrating 20 Years of{" "}
          <span className="bg-gradient-to-r from-yellow-300 to-cyan-300 bg-clip-text text-transparent">
            Academic Excellence
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-lg md:text-xl text-gray-200 max-w-3xl mb-10 leading-relaxed"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Since 2005,{" "}
          <span className="text-yellow-400 font-semibold">St. Peter's Academy</span>{" "}
          has nurtured a legacy of{" "}
          <span className="text-cyan-300 font-semibold">academic excellence</span>, 
          strong alumni networks, and holistic education — shaping tomorrow’s leaders 
          with discipline and values.
        </motion.p>

        {/* CTA Button */}
        <NavLink
        to='/admissions'
        > 
      <motion.a
          
          className="inline-block px-8 py-3 rounded-full text-lg font-semibold 
                     bg-yellow-500 text-blue-900 shadow-lg 
                     hover:bg-yellow-400 hover:shadow-xl transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Our Legacy
        </motion.a>
        </NavLink>
        
      </div>
    </section>
  );
};

export default Anniversary;
