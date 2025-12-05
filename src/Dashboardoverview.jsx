import React, { useEffect, useState } from "react";
import { Users, BookOpen, UserCheck, Wallet, Bell, Activity } from "lucide-react";
import { supabase } from "./Supabaseclient";

const Admindashboardoverview = () => {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    parents: 0,
    feesCollected: "KES 0",
    feesPending: "KES 0",
    notifications: 0,
  });


  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      // Count students
      const { count: studentsCount } = await supabase
        .from("students")
        .select("id", { count: "exact", head: true });

 const { count: teachersCount, error } = await supabase
  .from("profiles")
  .select("id", { count: "exact", head: true })
  .eq("role", "teacher");

if (error) {
  console.error("Error fetching teacher count:", error);
} else {
  console.log("Number of teachers:", teachersCount);
}

      // Count parents
      const { count: parentsCount } = await supabase
        .from("parents")
        .select("id", { count: "exact", head: true });

      // Sum fees collected
      const { data: collectedData, error: collectedError } = await supabase
        .from("recordedpayments")
        .select("amount");

      if (collectedError) throw collectedError;

      const feesCollected = collectedData.reduce(
        (sum, p) => sum + Number(p.amount || 0),
        0
      );

      // Sum total expected fees
      const { data: feesData, error: feesError } = await supabase
        .from("fees")
        .select("amount");

      if (feesError) throw feesError;

      const totalFees = feesData.reduce((sum, f) => sum + Number(f.amount || 0), 0);
      const feesPending = totalFees - feesCollected;

      // Notifications count (optional table)
      const { count: notificationsCount } = await supabase
        .from("notifications")
        .select("id", { count: "exact", head: true });

      setStats({
        students: studentsCount || 0,
        teachers: teachersCount || 0,
        parents: parentsCount || 0,
        feesCollected: `KES ${feesCollected.toLocaleString()}`,
        feesPending: `KES ${feesPending.toLocaleString()}`,
        notifications: notificationsCount || 0,
      });
    } catch (err) {
      console.error("Error fetching stats:", err.message);
    }
  };

  // Fetch recent activity


  useEffect(() => {
    fetchStats();
    
  }, []);

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




      </div>

    </div>
  );
};

export default Admindashboardoverview;
