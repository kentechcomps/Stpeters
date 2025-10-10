import { motion } from "framer-motion";
import passport from "./assets/mercy.webp"; // Ensure this matches your file

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Halo animation with color pulse
const haloAnimation = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.6, 0.3, 0.6],
    backgroundColor: ["rgba(253, 224, 71, 0.2)", "rgba(255,255,255,0.2)", "rgba(147,197,253,0.2)"], // yellow → white → light blue
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

// Floating particle animation
const particleAnimation = {
  animate: {
    y: ["0%", "-150%"], // float upwards
    x: ["0%", "10%", "-10%"], // subtle horizontal movement
    opacity: [0.6, 0.3, 0.6],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "loop",
    },
  },
};

const ManagersReport = () => {
  const particles = Array.from({ length: 15 }); // 15 floating particles

  return (
    <section className="relative w-full bg-purple-900 py-24 px-6 md:px-20 text-center overflow-hidden">
      <div className="relative max-w-5xl mx-auto flex flex-col items-center justify-center">

        {/* Floating Particles */}
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-yellow-400/40 blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={particleAnimation}
            animate="animate"
            transition={{
              duration: 6 + Math.random() * 4,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Halo Effect Behind Passport */}
        <motion.div
          className="absolute rounded-full w-52 h-52 md:w-64 md:h-64 blur-3xl -z-10"
          variants={haloAnimation}
          animate="animate"
        />

        {/* Circular Passport Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-10 relative z-10"
        >
          <img
            src={passport}
            alt="St. Peter's Academy Passport"
            className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-full border-4 border-yellow-500 drop-shadow-xl"
          />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide 
                     bg-gradient-to-r from-yellow-400 via-white to-blue-600 
                     bg-clip-text text-transparent drop-shadow-md"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Manager's Welcome
        </motion.h2>

        {/* Welcome Message */}
        <motion.p
          className="text-lg md:text-xl text-gray-100 max-w-3xl mb-12 leading-relaxed"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          On behalf of <span className="text-yellow-400 font-semibold">St. Peter's Academy</span>, 
          I warmly welcome our students, parents, and community to a new academic year. 
          Our commitment to fostering <span className="text-blue-300 font-semibold">academic excellence</span>, 
          personal growth, and leadership ensures that every child is empowered to shape a brighter future. 
          Together, we cultivate an environment where discipline, values, and innovation thrive.
        </motion.p>

      </div>
    </section>
  );
};

export default ManagersReport;
