import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <h1 className="text-3xl font-bold text-red-700 mb-4">Access Denied</h1>
      <p className="text-gray-700 mb-6">You are not authorized to view this page.</p>
      <Link
        to="/login"
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default Unauthorized;
