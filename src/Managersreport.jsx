import { motion } from "framer-motion";
import passport from "./assets/manager.png"; // Ensure this matches your file

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const haloAnimation = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.6, 0.3, 0.6],
    backgroundColor: [
      "rgba(253, 224, 71, 0.2)",
      "rgba(255,255,255,0.2)",
      "rgba(147,197,253,0.2)"
    ],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const particleAnimation = {
  animate: {
    y: ["0%", "-150%"],
    x: ["0%", "10%", "-10%"],
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
  const particles = Array.from({ length: 15 });

  return (
    <section className="relative w-full bg-purple-900 py-24 px-6 md:px-20 overflow-hidden">
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

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
        {/* Left: Manager Image with Halo */}
        <div className="relative flex-shrink-0 flex justify-center md:justify-start w-full md:w-1/3">
          <motion.div
            className="absolute rounded-full w-64 h-64 blur-3xl -z-10"
            variants={haloAnimation}
            animate="animate"
          />

          <motion.img
            src={passport}
            alt="Manager Portrait"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-78 h-78  object-cover rounded-full border-4 border-yellow-500 shadow-2xl"
          />
        </div>

        {/* Right: Manager Report */}
        <div className="text-center md:text-left flex-1">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide 
                       bg-gradient-to-r from-yellow-400 via-white to-blue-600 
                       bg-clip-text text-transparent drop-shadow-md"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Manager's Welcome
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-100 max-w-2xl leading-relaxed"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            On behalf of{" "}
            <span className="text-yellow-400 font-semibold">
              St. Peter's Academy
            </span>
            , I warmly welcome our students, parents, and community to a new
            academic year. Our commitment to fostering{" "}
            <span className="text-blue-300 font-semibold">
              academic excellence
            </span>
            , personal growth, and leadership ensures that every child is
            empowered to shape a brighter future. Together, we cultivate an
            environment where discipline, values, and innovation thrive.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ManagersReport;
