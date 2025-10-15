import React from 'react';
import { Users, BookOpen, Star, Globe, HeartHandshake } from "lucide-react"; // icons
import computer from './assets/computer.webp'
import learning from './assets/labs.jpeg'
import cocurriculum from './assets/cocurriculum.webp'
import pic4 from './assets/pic4.png'
import learning2 from './assets/learning.jpeg'
import eating from './assets/eating.png' // Ensure this matches your file

const AboutUs = () => {
    const strengths = [
  {
    icon: <Users className="w-10 h-10 text-blue-500" />,
    title: "Qualified Staff",
    description:
      "Our teachers are dedicated professionals with years of experience nurturing academic and personal growth.",
  },
  {
    icon: <BookOpen className="w-10 h-10 text-purple-500" />,
    title: "Comprehensive Curriculum",
    description:
      "We provide a well-balanced curriculum designed to challenge and inspire learners to achieve their best.",
  },
  {
    icon: <Star className="w-10 h-10 text-yellow-500" />,
    title: "Excellent Performance",
    description:
      "Our consistent top performance in academics and extracurricular activities makes us a leader in education.",
  },
  {
    icon: <Globe className="w-10 h-10 text-green-500" />,
    title: "Modern Facilities",
    description:
      "We have state-of-the-art classrooms, laboratories, and sports facilities for holistic development.",
  },
  {
    icon: <HeartHandshake className="w-10 h-10 text-rose-500" />,
    title: "Strong Community Values",
    description:
      "We foster an environment of respect, cooperation, and lifelong friendships among students and staff.",
  },
];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 mt-10">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About St. Peters Academy
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            St. Peters Academy — nurturing excellence from early learning to secondary education through innovation, faith, and holistic growth.
          </p>
          <div className="mt-8 flex justify-center space-x-4 flex-wrap">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              Established 2004
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Christian Foundation
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Primary & Secondary Sections
            </span>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="max-w-7xl mx-auto mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Journey</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded in 2004, St. Peters Academy began as a private primary school under the 8-4-4 Curriculum with one goal — to uplift academic performance in Masinga through quality education and faith-driven mentorship. 
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Over time, our success inspired growth. St. Peters Academy expanded into a comprehensive educational institution offering both Primary and Secondary sections. We continue to impact families across Machakos County with excellence and compassion.
            </p>
            <blockquote className="mt-6 italic text-gray-600 border-l-4 border-indigo-500 pl-4">
              "We empower young girls and boys through knowledge, discipline, and Christian values — building tomorrow’s leaders today."
            </blockquote>
          </div>
         
            <div className=" rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
            
               <img src={pic4} alt="About us" className="rounded-2xl shadow-lg w-full h-full object-cover">
               </img>
              
          
          </div>
        </div>
      </section>

<section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="strengths">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Our <span className="text-purple-600">Core Strengths</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {strengths.map((item, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-white/40 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Technology & Innovation */}
      <section className="max-w-7xl mx-auto mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img 
              src={computer}
              alt="Technology Hub"
              className="rounded-2xl shadow-lg w-full h-64 object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Innovation in the 4IR Era</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              St. Peters Academy embraces the technologies of the 4th Industrial Revolution. Our computer lab and digital programs empower students to think critically and innovate.
            </p>
            <div className="mt-4 p-4 bg-indigo-100 rounded-lg">
              <p className="font-semibold text-indigo-800">
                Location: Ekalakala, Masinga Sub-County, Machakos County, Kenya
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="max-w-7xl mx-auto mb-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Curriculum</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Competency-Based Education</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Both our Primary and Secondary sections follow the 2-6-3-3-3 education system, promoting inquiry-based learning, creativity, and moral values.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• English & Kiswahili</li>
              <li>• Mathematics</li>
              <li>• Sciences & Technology</li>
              <li>• Humanities & CRE</li>
              <li>• Business & Agriculture</li>
              <li>• Computer Studies</li>
            </ul>
                      <div>
            <img 
              src={learning}
              alt="Technology Hub"
              className="rounded-2xl shadow-lg w-full h-64 object-cover"
            />
          </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">Learning Resources</h3>
            <p className="text-gray-700">
              Modern textbooks, e-learning resources, and mentorship programs ensure holistic student development and academic excellence.
            </p>
               <img 
              src={learning2}
              alt="Technology Hub"
              className="rounded-2xl shadow-lg w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Extra-Curricular & Facilities */}
      <section className="max-w-7xl mx-auto mb-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Extra-Curricular */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Extra-Curricular Activities</h3>
            <p className="text-gray-700 mb-4 text-center">
              Creativity and teamwork are at the heart of our extra-curricular programs.
            </p>
            <ul className="grid md:grid-cols-2 gap-2 text-gray-600">
              <li>• Football & Handball</li>
              <li>• Netball & Athletics</li>
              <li>• Music & Drama</li>
              <li>• Team Building</li>
              <li>• Religious Growth</li>
            </ul>
             <img 
              src={cocurriculum}
              alt="Technology Hub"
              className="rounded-2xl shadow-lg w-full h-64 object-cover"
            />
          </div>
          {/* Facilities */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Facilities</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Fully Equipped Library</li>
              <li>• Science & Computer Labs</li>
              <li>• Spacious Classrooms</li>
              <li>• Chapel for Prayer & Worship</li>
              <li>• Dormitories with Modern Amenities</li>
              <li>• Sports & Recreation Grounds</li>
              <li>• Dining & Social Halls</li>
            </ul>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Healthy Meals</h4>
              <p className="text-green-700 text-sm">
                We provide nutritious, balanced meals that support physical health and academic performance.
              </p>
                        <div>
            <img 
              src={eating}
              alt="Technology Hub"
              className="rounded-2xl shadow-lg w-full h-64 object-cover"
            />
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Join the St. Peters Family</h2>
        <p className="text-lg text-gray-600 mb-8">
          Whether in Primary or Secondary, every learner at St. Peters Academy is part of a caring community that nurtures excellence, faith, and integrity.
        </p>
        <button className="bg-purple-900 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300">
          Enroll Today
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
