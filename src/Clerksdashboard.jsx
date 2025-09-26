// ClerkDashboard.jsx
import React from "react";
import { Link ,NavLink } from "react-router-dom";
import { UserPlus, Wallet, AlertCircle, LogOut, FileText, Home } from "lucide-react";

const ClerkDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-800 text-white flex flex-col">
        <div className="px-6 py-4 font-bold text-2xl border-b border-purple-700">
          Clerk Panel
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <Link to="" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded">
            <Home size={18} /> <span>Dashboard</span>
          </Link>
          <NavLink to="/managestudent" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded">
            <UserPlus size={18} /> <span>Student Records</span>
          </NavLink>
          <NavLink to="/feemanagement" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded">
            <Wallet size={18} /> <span>Fees & Payments</span>
          </NavLink>
          <Link to="" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded">
            <FileText size={18} /> <span>Reports</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-purple-700">
          <button className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded w-full">
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          Dashboard / Clerk
        </div>

        <h1 className="text-2xl font-bold text-purple-900 mb-6">Clerk Dashboard</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add Student */}
          <Link
            to="/clerk/students/add"
            className="bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Add Student</h2>
              <UserPlus className="text-purple-600" size={30} />
            </div>
            <p className="text-gray-500 mt-2">Register a new student.</p>
          </Link>

          {/* Record Payment */}
          <Link
            to="/clerk/payments/add"
            className="bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Record Payment</h2>
              <Wallet className="text-green-600" size={30} />
            </div>
            <p className="text-gray-500 mt-2">Log fees payment & issue receipts.</p>
          </Link>

          {/* Outstanding Fees */}
          <Link
            to="/clerk/payments/outstanding"
            className="bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Outstanding Fees</h2>
              <AlertCircle className="text-red-600" size={30} />
            </div>
            <p className="text-gray-500 mt-2">Check unpaid balances.</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ClerkDashboard;
