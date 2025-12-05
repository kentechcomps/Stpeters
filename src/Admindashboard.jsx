import { useState } from "react";
import {Link , NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaUsers, FaChalkboardTeacher, FaUserGraduate, FaMoneyBill, FaBell, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Clear auth token/session
    console.log("Logged out");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 mt-16">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg p-5 transition-all duration-300 ${isOpen ? "w-64" : "w-20"} flex flex-col`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-6 text-gray-700 focus:outline-none"
        >
          {isOpen ? "⏪" : "⏩"}
        </button>

        <nav className="flex flex-col gap-4 text-gray-700 font-medium ">
          <NavLink to="/dashboard/admindashboardoverview" className="flex items-center gap-3 hover:text-red-600">
            <FaUsers /> {isOpen && "Home"}
          </NavLink>
          <Link to="/dashboard/users" className="flex items-center gap-3 hover:text-red-600">
            <FaChalkboardTeacher /> {isOpen && "ManageUsers"}
          </Link>
          <Link to="/dashboard/ManageStudents" className="flex items-center gap-3 hover:text-red-600">
            <FaUserGraduate /> {isOpen && "Students"}
          </Link>
          <Link to="/dashboard/feemanagement" className="flex items-center gap-3 hover:text-red-600">
            <FaMoneyBill /> {isOpen && "Finance"}
          </Link>
          <Link to="/dashboard/notices" className="flex items-center gap-3 hover:text-red-600">
            <FaBell /> {isOpen && "Notices"}
          </Link>
          <Link to="/dashboard/reports" className="flex items-center gap-3 hover:text-red-600">
            <FaChartBar /> {isOpen && "Reports"}
          </Link>
          <Link to="/dashboard/settings" className="flex items-center gap-3 hover:text-red-600">
            <FaCog /> {isOpen && "Settings"}
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-600 mt-auto hover:text-red-800"
          >
            <FaSignOutAlt /> {isOpen && "Logout"}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        {/* Top Navbar */}
       <header className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-50">

          <h1 className="text-xl font-bold text-gray-700">🎓 School Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-10 h-10 rounded-full border"
            />
            <span className="text-gray-700 font-semibold">Admin</span>
          </div>
        </header>

        {/* Main Display */}
        <main className="p-6 overflow-y-auto mt-4">
          <Outlet /> {/* Child routes will render here */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
