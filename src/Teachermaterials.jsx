// TeacherMaterials.jsx
import React, { useState } from "react";

const TeacherMaterials = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      alert(`Uploaded file: ${file.name}`);
      setFile(null);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="text-sm text-gray-600 mb-6">Teacher / <span className="text-purple-600 font-semibold">Upload Materials</span></div>
      <h1 className="text-2xl font-bold mb-6">Upload Teaching Materials</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow max-w-md">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full border p-2 rounded-lg mb-4" />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Upload</button>
      </form>
    </div>
  );
};

export default TeacherMaterials;
