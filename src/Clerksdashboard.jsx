// ClerkDashboard.jsx
import React from "react";
import { Link ,NavLink ,Outlet } from "react-router-dom";
import { UserPlus, Wallet, AlertCircle, LogOut, FileText, Home } from "lucide-react";
import { useAuth } from "./Authcontext"
const ClerkDashboard = () => {
    const { logout } = useAuth(); // ✅ access logout function
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-800 text-white flex flex-col">
        <div className="px-6 py-4 font-bold text-2xl border-b border-purple-700">
          Clerk Panel
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <Link to="/clerksdashboard/clerkoptions" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded">
            <Home size={18} /> <span>Dashboard</span>
          </Link>
          <Link to="/clerksdashboard/ManageStudents" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded">
            <UserPlus size={18} /> <span>Student Records</span>
          </Link>
          <Link to="/clerksdashboard/ManageTeachers" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded">
            <UserPlus size={18} /> <span> Teachers Records</span>
          </Link>
          <Link to="/clerksdashboard/feemanagement" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded">
            <Wallet size={18} /> <span>Fees & Payments</span>
          </Link>
            <Link to="/clerksdashboard/notices" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded">
            <Wallet size={18} /> <span>Notices</span>
          </Link>
            <Link to="/clerksdashboard/reports" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded">
            <Wallet size={18} /> <span>Reports</span>
          </Link>
          
        </nav>
        <div className="p-4 border-t border-purple-700">
          <button className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded w-full cursor-pointer" onClick={logout}>
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto mt-16">
        {/* Breadcrumb */}  
          <Outlet /> {/* Child routes will render here */}    
      </main>
    </div>
  );
};

export default ClerkDashboard;
