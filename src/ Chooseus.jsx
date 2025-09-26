import { FaUserTie, FaBookReader, FaSchool, FaUsers } from "react-icons/fa";

const Chooseus = () => {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl font-extrabold text-[#0A1D37] mb-4"
          data-aos="fade-up"
        >
          Why Choose Us
        </h2>
        <p
          className="text-lg text-gray-700 max-w-2xl mx-auto mb-12"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          We are committed to excellence in academics, discipline, and holistic
          student development.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Card 1 */}
          <div
            className="relative bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="absolute top-0 left-0 right-0 h-2 rounded-t-xl bg-[#FFD700]"></div>
            <FaUserTie className="text-[#0A1D37] text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#0A1D37] mb-2">
              Qualified Staff
            </h3>
            <p className="text-sm text-gray-600">
              Our dedicated and certified teachers ensure quality education and
              personal attention.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="relative bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="absolute top-0 left-0 right-0 h-2 rounded-t-xl bg-[#0A1D37]"></div>
            <FaBookReader className="text-[#FFD700] text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#0A1D37] mb-2">
              Moral Values
            </h3>
            <p className="text-sm text-gray-600">
              We instill strong moral and spiritual values to guide learners
              through life.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="relative bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="absolute top-0 left-0 right-0 h-2 rounded-t-xl bg-gradient-to-r from-[#FFD700] to-[#0A1D37]"></div>
            <FaSchool className="text-[#0A1D37] text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#0A1D37] mb-2">
              Modern Facilities
            </h3>
            <p className="text-sm text-gray-600">
              Our classrooms, labs, and play areas are well-equipped for optimal
              learning.
            </p>
          </div>

          {/* Card 4 */}
          <div
            className="relative bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="absolute top-0 left-0 right-0 h-2 rounded-t-xl bg-[#FFD700]"></div>
            <FaUsers className="text-[#0A1D37] text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#0A1D37] mb-2">
              Parental Involvement
            </h3>
            <p className="text-sm text-gray-600">
              We believe in strong partnerships between school and home to
              support every child.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chooseus;
