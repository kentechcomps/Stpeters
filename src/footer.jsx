import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaInbox, FaFacebook, FaInstagram } from 'react-icons/fa';
import logo from './assets/logos.png';

const Footer = () => {
  return (
    <footer className="text-gray-100 relative">
      {/* 🌊 Wave at top */}


      {/* 🌽 Background with Overlay */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1629459569982-68e9b76cc487?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-purple-900 opacity-95"></div>

        {/* Main Footer Content */}
        <div className="relative z-10 px-6 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-white">
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold mb-2">ST PETERS ACADEMY</h2>
            <p className="text-sm text-gray-300 text-center md:text-left">
              Providing quality education and a nurturing environment for tomorrow’s leaders.
            </p>
              <img
              src={logo} // replace with your logo path
              alt="ST Peters Academy Logo"
              className="mt-4 w-60 h-60"
              />
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-base">
                <FiMail className="text-xl text-blue-400" />
                ST PETERS ACADEMY
              </li>
              <li className="flex items-center gap-3 text-base">
                <FiPhone className="text-xl text-blue-400" />
                0727 069022
              </li>
              <li className="flex items-center gap-3 text-base">
                <FaInbox className="text-xl text-blue-400" />
                P.O. Box 1234 – 00100 Nairobi
              </li>
              <li className="flex items-center gap-3 text-base">
                <FiMapPin className="text-xl text-blue-400" />
                EKALAKALA MARKET, MASINGA, KENYA
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex mt-5 gap-4 text-2xl">
              <a
                href="https://web.facebook.com/p/St-Peters-Academy-Ekalakala-100054314510163/?_rdc=1&_rdr#"
                className="text-blue-400 hover:text-white transition"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                className="text-blue-400 hover:text-white transition"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-4 text-base">
              <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">About</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Services</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="relative z-10 border-t border-blue-900 mt-10 pt-6 pb-4 text-sm text-center text-gray-300">
          © {new Date().getFullYear()} Stpeters academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
