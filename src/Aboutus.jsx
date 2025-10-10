import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 mt-10">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Who We Are
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            St. Peter's Girls High School: Empowering young women through excellence in education, faith, and innovation.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              Founded 2004
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Christian Values
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              2-6-3-3-3 Curriculum
            </span>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="max-w-7xl mx-auto mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Journey</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              St. Peter’s education model kicked off in 2004 as a private institution offering primary education in the 8.4.4 Curriculum. Our ultimate goal was to uplift academic performance in the area by using diverse methodologies of teaching. We wished to make a difference in the academic performance of learners in the area, which was dominated by community and government schools with insufficient resources. In addition, we aimed at rehabilitating our young girls and supporting financially disadvantaged learners.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              For over a decade, St. Peter’s fraternity has served students, families, and the entire Machakos County and beyond with excellence. We have grown to become a model school of excellence with an IT center in the region. In 2015, our primary school – St. Peters Academy Ekalakala – was honored to be the best in academic performance in Machakos County, and we have maintained this trajectory.
            </p>
            <blockquote className="mt-6 italic text-gray-600 border-l-4 border-indigo-500 pl-4">
              "We nurture talents in sports and music. Our pupils have showcased their talents at zonal, sub-county, and national levels. St. Peters fraternity is a Christian family, and we model our learners to grow in Christian faith."
            </blockquote>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="text-2xl font-semibold mb-2">Excellence Since 2004</h3>
                <p className="text-indigo-100">Top Performers in Machakos County</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management & Approach */}
      <section className="max-w-7xl mx-auto mb-16 bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Our Dedicated Team & Approach</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl bg-indigo-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Qualified Staff</h3>
            <p className="text-gray-600">Our management and staff are highly qualified and dedicated to achieving excellent results.</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-green-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Inquiry-Based Learning</h3>
            <p className="text-gray-600">An inquiry-based approach to instruction develops higher thinking and growth techniques in our girls.</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-blue-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Modern Infrastructure</h3>
            <p className="text-gray-600">We have good infrastructure with enough capacity and are well-furnished with all resources required in a girl’s secondary school.</p>
          </div>
        </div>
      </section>

      {/* Technology & Innovation */}
      <section className="max-w-7xl mx-auto mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img 
              src="https://via.placeholder.com/600x400?text=Tech+Lab" 
              alt="Computer Laboratory" 
              className="rounded-2xl shadow-lg w-full h-64 object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Innovation in the 4IR Era</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              St. Petes Girls is up to date with current technologies, with a study model that incorporates the best technologies in the current era of the 4th Industrial Revolution. St. Peter’s was nominated as the IT center in Masinga Sub-county due to our well-equipped computer laboratory.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              With positive upbeat, we strongly believe that the same results we have achieved in the past will grow in our young girls and beyond.
            </p>
            <div className="mt-4 p-4 bg-indigo-100 rounded-lg">
              <p className="font-semibold text-indigo-800">Location: Ekalakala, Masinga Sub-county, Machakos County, Kenya</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="max-w-7xl mx-auto mb-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Curriculum</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">2-6-3-3-3 Learning Programme</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The school adheres to the strict regulations of the 2:6:3:3:3 learning programme. Students are examined internally through regular assignments, and those who fail to sit for these face disciplinary actions or discontinuation at management discretion.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• English</li>
              <li>• Kiswahili</li>
              <li>• Mathematics</li>
              <li>• Chemistry</li>
              <li>• Physics</li>
              <li>• Biology</li>
              <li>• Geography</li>
              <li>• History</li>
              <li>• CRE</li>
              <li>• Business Studies</li>
              <li>• Computer Studies</li>
              <li>• Agriculture</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">Textbooks & Resources</h3>
            <p className="text-gray-700">Comprehensive textbooks and resources aligned with the national curriculum ensure a robust learning experience.</p>
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
              Participation is important and mandatory to enhance creativity, mental, and physical growth.
            </p>
            <ul className="grid md:grid-cols-2 gap-2 text-gray-600">
              <li>• Football</li>
              <li>• Handball</li>
              <li>• Netball</li>
              <li>• Athletics</li>
              <li>• Team Building</li>
              <li>• Music</li>
              <li>• Religious Activities</li>
            </ul>
          </div>
          {/* Facilities */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">School Facilities</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Well-equipped Library</li>
              <li>• Computer Laboratory</li>
              <li>• Science Laboratory</li>
              <li>• Sports Grounds</li>
              <li>• Prayer Chapel</li>
              <li>• Self-Contained Dormitories</li>
              <li>• Piped Water & Electricity</li>
              <li>• Modern Dining Hall & Social Hall</li>
            </ul>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">School Meals</h4>
              <p className="text-green-700 text-sm">We offer a balanced diet to accommodate all students’ tastes and daily dietary requirements for girls. No special meals unless instructed by the school nurse.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Family</h2>
        <p className="text-lg text-gray-600 mb-8">
          At St. Peter's Girls High School, we believe in fostering excellence, faith, and empowerment for every young woman.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300">
          Learn More
        </button>
      </section>
    </div>
  );
};

export default AboutUs;