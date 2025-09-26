import React, { useState } from 'react';
import learners from './assets/learners.png'
import emailjs from 'emailjs-com';

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
        alert("Your message has been sent ✅");
    }, (error) => {
        console.error("Email sending failed:", error.text);
        alert("Failed to send message ❌");
    });
  };

    // Add form submission logic here

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-80 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${learners})` }}
      >
        <div className="absolute inset-0 bg-[rgba(0,0,128,0.7)] z-10"></div>
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019020324536!2d-122.41941568468145!3d37.77492977975966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c5e5b7a1b%3A0x9b6c8f1b6f6b6f6b!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1635783921467!5m2!1sen!2sus"
              className="w-full h-full min-h-[500px] rounded-lg shadow-md"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
