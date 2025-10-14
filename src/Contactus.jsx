import React, { useState } from 'react';
import learners from './assets/learners.png'
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // EmailJS integration
    emailjs.send(
      "service_un0u6uu",     // Replace with your EmailJS service ID
      "template_cst7wnq",    // Replace with your template ID
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      },
      "OEwZsxmlaYUDWd6sl"      // Replace with your EmailJS public key
    )
    .then((result) => {
        console.log("Email sent successfully!", result.text);
        toast.success("✅ Your message has been sent!");
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' }); // reset form
    }, (error) => {
        console.error("Email sending failed:", error.text);
        toast.error("❌ Failed to send message. Try again later.");
    });
  };
  const latitude = -0.96996;
  const longitude = 37.47008;

  // Embed Google Map URL
const mapUrl = `https://www.google.com/maps?q=ST.+PETER'S+PRI+SCH+EKALAKALA&z=15&output=embed`;


  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-80 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${learners})` }}
      >
        <div className="absolute inset-0 bg-purple-900 "></div>
        <h1 className="relative z-20 text-5xl font-bold text-yellow-400 text-shadow-lg">
          CONTACT US
          
        </h1>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-stretch">
          {/* Form */}
          <div className="flex-1 min-w-[300px] bg-white p-8 rounded-lg shadow-md flex flex-col justify-between h-full">
            <h2 className="text-2xl font-bold text-navy-800 mb-6">SEND US A MESSAGE</h2>
            <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
              <div>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-navy-800 font-semibold mb-2" htmlFor="firstName">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border-2 border-navy-800 rounded focus:border-yellow-400 outline-none transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-navy-800 font-semibold mb-2" htmlFor="lastName">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border-2 border-navy-800 rounded focus:border-yellow-400 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-navy-800 font-semibold mb-2" htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border-2 border-navy-800 rounded focus:border-yellow-400 outline-none transition-colors"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-navy-800 font-semibold mb-2" htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border-2 border-navy-800 rounded focus:border-yellow-400 outline-none transition-colors"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-navy-800 font-semibold mb-2" htmlFor="message">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full p-3 border-2 border-navy-800 rounded focus:border-yellow-400 outline-none transition-colors"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="bg-navy-800 text-yellow-400 w-[80%] mx-auto block px-6 py-3 rounded font-bold hover:bg-yellow-400 hover:text-navy-800 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Map */}
<div className="flex-1 min-w-[300px] h-full">
  <a
    href="https://www.google.com/maps/place/ST+PETER+PRIMARY+EKALAKALA"
    target="_blank"
    rel="noopener noreferrer"
  >
    <iframe
      src={mapUrl}
      className="w-full h-full min-h-[500px] rounded-lg shadow-md"
      allowFullScreen
      loading="lazy"
      title="ST. PETER PRIMARY EKALAKALA Map"
    ></iframe>
  </a>

</div>


        </div>
      </section>
    </>
  );
};

export default ContactUs;
