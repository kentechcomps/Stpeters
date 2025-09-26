import React from "react";
import {
  Users,
  BookOpen,
  UserCheck,
  Wallet,
  Bell,
  Activity,
} from "lucide-react";

const Admindashboardoverview = () => {
  // Dummy stats (later connect with backend API)
  const stats = {
    students: 1200,
    teachers: 45,
    parents: 980,
    feesCollected: "KES 2,500,000",
    feesPending: "KES 500,000",
    notifications: 8,
  };

  const recentActivity = [
    { id: 1, action: "Student John Mwangi registered in Form 1", time: "2 hrs ago" },
    { id: 2, action: "KES 15,000 fees paid by Parent Wanjiru", time: "4 hrs ago" },
    { id: 3, action: "New teacher Mr. Otieno added to Maths Department", time: "Yesterday" },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <p className="text-gray-600">Quick overview of school activities and statistics</p>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4">
          <Users className="text-red-600" size={40} />
          <div>
            <h2 className="text-2xl font-bold">{stats.students}</h2>
            <p className="text-gray-500">Students</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4">
          <BookOpen className="text-blue-600" size={40} />
          <div>
            <h2 className="text-2xl font-bold">{stats.teachers}</h2>
            <p className="text-gray-500">Teachers</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4">
          <UserCheck className="text-green-600" size={40} />
          <div>
            <h2 className="text-2xl font-bold">{stats.parents}</h2>
            <p className="text-gray-500">Parents</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4">
          <Wallet className="text-yellow-600" size={40} />
          <div>
            <h2 className="text-xl font-bold">{stats.feesCollected}</h2>
            <p className="text-gray-500">Fees Collected</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4">
          <Wallet className="text-gray-600" size={40} />
          <div>
            <h2 className="text-xl font-bold">{stats.feesPending}</h2>
            <p className="text-gray-500">Fees Pending</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4">
          <Bell className="text-purple-600" size={40} />
          <div>
            <h2 className="text-2xl font-bold">{stats.notifications}</h2>
            <p className="text-gray-500">New Notifications</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Activity className="text-red-600" /> Recent Activity
        </h2>
        <ul className="mt-4 space-y-3">
          {recentActivity.map((item) => (
            <li key={item.id} className="flex justify-between border-b pb-2 text-gray-700">
              <span>{item.action}</span>
              <span className="text-sm text-gray-400">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admindashboardoverview;
