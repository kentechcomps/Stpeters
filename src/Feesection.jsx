import React from 'react';
import learners from './assets/learners.png'
import girlsfeestructure from './assets/girlsfeestrucure.pdf';


const SchoolFeeSection = () => {
  const feeCards = [
    {
      title: 'Lower Primary Fee',
      description: 'Tuition and fees for Lower Primary students',
      pdfUrl: girlsfeestructure // Replace with actual PDF path
    },
    {
      title: 'Upper Primary Fee',
      description: 'Tuition and fees for Upper Primary students',
      pdfUrl: girlsfeestructure// Replace with actual PDF path
    },
    {
      title: 'JSS Fee',
      description: 'Tuition and fees for Junior Secondary School students',
      pdfUrl: girlsfeestructure // Replace with actual PDF path
    },
    {
      title: 'St. Peters Secondary Girls',
      description: 'Tuition and fees for St. Peters Secondary Girls',
      pdfUrl: girlsfeestructure // Replace with actual PDF path
    }
  ];

  const handleDownload = (pdfUrl, filename) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Image - 1/8 of viewport height, full width */}
      <section
        className="relative h-80 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${learners})` }}
      >
        <div className="absolute inset-0 bg-[rgba(0,0,128,0.7)] z-10"></div>
        <h1 className="relative z-20 text-5xl font-bold text-yellow-400 text-shadow-lg">
          FEE SECTION
        </h1>
      </section>

      {/* Fee Cards Grid */}
      <div className="max-w-7xl mx-auto mt-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {feeCards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-transparent hover:border-[#bee3f8] overflow-hidden"
              onClick={() => handleDownload(card.pdfUrl, `${card.title}.pdf`)}
            >
              {/* Navy Blue Card Background Overlay on Hover */}
              <div className="absolute inset-0 bg-[#1e40af] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              {/* Card Content */}
              <div className="relative p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#1e40af] rounded-full flex items-center justify-center group-hover:bg-[#1d4ed8] transition-colors duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#1e40af] transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-4">{card.description}</p>
                <button className="px-4 py-2 bg-[#1e40af] text-white rounded-lg font-medium hover:bg-[#1d4ed8] transition-colors duration-300 transform hover:scale-105">
                  Download PDF
                </button>
              </div>

              {/* Light Animation - Floating Dots */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#60a5fa] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-[#60a5fa] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping delay-100"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolFeeSection;