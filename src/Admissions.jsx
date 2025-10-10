import React, { useState , useEffect } from "react";
import { supabase } from "./Supabaseclient";
import { NavLink } from "react-router-dom";

const steps = [
  { id: 0, title: "Personal Info", description: "Enter learner's basic details" },
  { id: 1, title: "Upload Documents", description: "Submit required files" },
  { id: 2, title: "Assign Class", description: "Select appropriate class and stream" },
  { id: 3, title: "Confirm", description: "Review and submit application" }
];

export default function AdmissionWizard() {
  const [currentStep, setCurrentStep] = useState(0);
    const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    guardian_name: "",
    guardian_phone: "",
    documents: null,
    grade: "",
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

const handleChange = (e) => {
  const { name, value, files } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: files ? Array.from(files) : value, // support multiple files
  }));
};

const handleSubmit = async () => {
  try {
    let uploadedUrls = [];

    if (formData.documents && formData.documents.length > 0) {
      for (const file of formData.documents) {
        const fileName = `${Date.now()}_${file.name}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("admission_docs")
          .upload(fileName, file);

        if (uploadError) {
          console.error("Upload error:", uploadError.message);
          throw uploadError;
        }

        // ✅ Use .data.publicUrl safely
        const { data: publicUrlData } = supabase.storage
          .from("admission_docs")
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrlData.publicUrl);
      }
    }

    // ✅ Insert admission data into table
    const { error: insertError } = await supabase.from("admissions").insert([
      {
        first_name: formData.first_name,
        last_name: formData.last_name,
        dob: formData.dob,
        guardian_name: formData.guardian_name,
        guardian_phone: formData.guardian_phone,
        grade: formData.grade,
        documents: uploadedUrls, // array of URLs
      },
    ]);

    if (insertError) throw insertError;

    alert("✅ Admission saved successfully!");
    setFormData({
      first_name: "",
      last_name: "",
      dob: "",
      guardian_name: "",
      guardian_phone: "",
      documents: [],
      grade: "",
    });
    setCurrentStep(0);
  } catch (err) {
    console.error("Error during upload:", err.message);
    alert("⚠️ Upload failed: " + err.message);
  }
};

  const fetchClasses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/classes");
      const data = await res.json();
      setClasses(data);
      console.log("Classes fetched:", data);
      
    } catch (err) {
      console.error("Error fetching classes:", err.message);
    }
  };

useEffect(() => {
  fetchClasses();
}, []);

  return (
    <div className="w-[70%] mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Static Content */}
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Admission Process</h1>
            <p className="text-lg text-gray-600">
              Welcome to St Peters Academy! Follow the steps below to complete your application process.
              Our Enrollment Officers are here to assist you at every step.
            </p>
          </div>

          {/* Step 1: Pre-Admission Documents */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8 transform transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">Step 1: Pre-Admission Documents</h2>
            <p className="text-gray-600 mb-4">
              Please prepare the following documents in both soft copy for application upload and hard copy for school records. 
              A copy of the Birth Certificate and Parent ID must be attached to submit your application. Other documents can be uploaded later.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Copy of Immunization Certificate (Reception to Preschool only)</li>
              <li>Copy of Child’s Birth Certificate</li>
              <li>Copy of Parent’s/Guardian’s valid Passport and Visa (if not a Kenyan citizen)</li>
              <li>Copy of Pupil’s valid Pass/Visa (if not a Kenyan citizen)</li>
              <li>Passport Size Photographs (2 for student, 1 for each parent/guardian)</li>
              <li>Copy of Mother’s ID Card/Passport and 1 Passport Size Photo</li>
              <li>Copy of Father’s ID Card/Passport and 1 Passport Size Photo</li>
              <li>Certified copy of Last Report from Previous School (Mandatory for CBC & Cambridge Primary & Secondary)</li>
              <li>Certified copy of Student’s Leaving Certificate/Clearance Letter (Mandatory if transferring)</li>
              <li>NEMIS Number and Assessment Number (CBC Curriculum)</li>
              <li>Certified copy of KPSEA results (Grade 7 & 8 CBC Curriculum)</li>
            </ul>
          </div>

          {/* Step 2: Admission Process */}
          <div className="bg-white rounded-lg shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">Step 2: Admission Process</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Pay the non-refundable application fee.</li>
              <li>
                Complete oral/written assessments conducted at the school or online (only under special considerations).
              </li>
              <li>
                Assessment reports will be reviewed and approved by the School Principal/Headteacher. Admission rights are reserved by Makini School.
              </li>
              <li>
                Assessment outcomes will be communicated within 24 business hours via telephone and email, with an admission offer letter sent to parents/guardians.
              </li>
              <li>
                Parents/Guardians of approved students must acknowledge by accepting the offer letter as per its instructions.
              </li>
              <li>Pay the non-refundable admission fee.</li>
              <li>
                Admission to class will be granted only upon completion of the full admission process and payment of full-term school fees.
              </li>
            </ol>
          </div>

          {/* Contact Section */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Need assistance? Contact our Enrollment Officers at{' '}
              <a href="mailto:admissions@makinischool.ac.ke" className="text-blue-600 hover:underline">
                admissions@stpetersacademy.ac.ke
              </a>
            </p>
            <NavLink
              to="/feesection"
              className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Explore School Fees
            </NavLink>
          </div>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="relative mb-8">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-700 h-3 rounded-full transition-all duration-500 ease-out shadow-lg relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
          </div>
        </div>
        <div className="absolute -top-1 left-0 w-full flex justify-between">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 bg-white border-2 rounded-full transition-all duration-300 transform ${
                index < progress / (100 / steps.length)
                  ? "border-green-500 scale-110"
                  : index === Math.floor(currentStep)
                  ? "border-blue-500 scale-110"
                  : "border-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Enhanced Stepper Navigation */}
      <div className="mb-8">
        <div className="relative">
          {/* Vertical Line Connector */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-12 bottom-12 w-0.5 bg-gradient-to-b from-blue-200 to-green-200"></div>
          
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-8 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div
                className={`flex-shrink-0 w-16 h-16 rounded-full border-4 shadow-lg transition-all duration-500 transform hover:scale-105 ${
                  index < currentStep
                    ? "bg-green-500 border-green-600 text-white shadow-green-200"
                    : index === currentStep
                    ? "bg-blue-500 border-blue-600 text-white shadow-blue-200"
                    : "bg-white border-gray-300 text-gray-400 shadow-gray-100"
                }`}
              >
                {index < currentStep ? (
                  <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : index === currentStep ? (
                  <div className="text-lg font-bold flex items-center justify-center h-full">
                    {index + 1}
                  </div>
                ) : (
                  <div className="text-lg font-bold flex items-center justify-center h-full">
                    {index + 1}
                  </div>
                )}
              </div>
              
              <div className={`flex-1 px-6 ${index % 2 === 0 ? "text-left" : "text-right"}`}>
                <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                  index === currentStep
                    ? "text-blue-700"
                    : index < currentStep
                    ? "text-green-700"
                    : "text-gray-500"
                }`}>
                  {step.title}
                </h3>
                <p className={`text-sm transition-colors duration-300 ${
                  index === currentStep
                    ? "text-blue-500 font-medium"
                    : index < currentStep
                    ? "text-green-500"
                    : "text-gray-400"
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Forms */}
      <form className="space-y-6">
        {currentStep === 0 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3 text-blue-500">👤</span>
              Learner's Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Enter first name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Enter last name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Name</label>
                <input
                  type="text"
                  name="guardian_name"
                  placeholder="Enter guardian's name"
                  value={formData.guardian_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Phone</label>
                <input
                  type="tel"
                  name="guardian_phone"
                  placeholder="Enter guardian's phone number"
                  value={formData.guardian_phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3 text-blue-500">📁</span>
              Upload Documents
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-200">
              <input
                type="file"
                name="documents"
                onChange={handleChange}
                className="hidden"
                id="documents"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                required
              />
              <label htmlFor="documents" className="cursor-pointer flex flex-col items-center justify-center">
                <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            <p className="text-lg font-medium text-gray-700 mb-2">
  {formData.documents && formData.documents.length > 0
    ? `Selected: ${formData.documents.map((f) => f.name).join(", ")}`
    : "Click to upload or drag and drop"}
</p>

                <p className="text-sm text-gray-500">Birth Certificate, KCPE Results, etc. (PDF, JPG, PNG)</p>
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Securely upload your documents. Files are encrypted and stored safely.
            </p>
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3 text-blue-500">🏫</span>
              Assign Class & Stream
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Grade/Class
  </label>
  <select
    name="grade"
    value={formData.grade}
    onChange={handleChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
    required
  >
    <option value="">Select Class</option>
    {classes.map((cls) => (
      <option key={cls.id} value={cls.name}>
        {cls.name} ({cls.category})
      </option>
    ))}
  </select>
</div>

            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 Tip: Choose the stream based on availability and learner's preferences.
              </p>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3 text-green-500">✅</span>
              Confirm Admission Details
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Name:</p>
                  <p className="font-semibold text-gray-900">{formData.first_name} {formData.last_name}</p>
                </div>
                <div>
                  <p className="text-gray-600">DOB:</p>
                  <p className="font-semibold text-gray-900">{formData.dob}</p>
                </div>
                <div>
                  <p className="text-gray-600">Guardian:</p>
                  <p className="font-semibold text-gray-900">{formData.guardian_name} ({formData.guardian_phone})</p>
                </div>
                <div>
                  <p className="text-gray-600">Class & Stream:</p>
                  <p className="font-semibold text-gray-900">{formData.grade} - {formData.stream}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-600">Documents:</p>
                  <p className={`font-semibold ${formData.documents ? 'text-green-900' : 'text-red-600'}`}>
                    {formData.documents?.name || "No documents uploaded yet"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-yellow-800">Please review all details carefully before submitting.</p>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Enhanced Navigation Buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}
        
        <div className="flex-1 text-center">
          <div className="text-sm text-gray-500 mb-2">Step {currentStep + 1} of {steps.length}</div>
        </div>
        
        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center ml-auto"
          >
            Next
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center ml-auto"
          >
            Generate Admission Letter
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}