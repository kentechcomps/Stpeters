import React, { useEffect, useState } from "react";
import { supabase } from "./Supabaseclient";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";   // ✅ NEW IMPORT
import * as XLSX from "xlsx";


const ReportsDashboard = () => {
  const [announcements, setAnnouncements] = useState(null);
  const [students, setStudents] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const [systemUsage, setSystemUsage] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      const { data: annData } = await supabase.rpc("announcements_summary");
      const { data: stuData } = await supabase.rpc("students_summary");
      const { data: teachData } = await supabase.rpc("teachers_summary");
      const { data: sysData } = await supabase.rpc("system_usage_summary");

      setAnnouncements(annData?.[0]);
      setStudents(stuData?.[0]);
      setTeachers(teachData?.[0]);
      setSystemUsage(sysData?.[0]);
    };

    fetchReports();
  }, []);

  if (!announcements || !students || !teachers || !systemUsage) {
    return <div className="text-center p-6">Loading reports...</div>;
  }

  // ✅ Doughnut data for students
  const genderData = [
    { name: "Male", value: students.male },
    { name: "Female", value: students.female },
  ];
  const COLORS = ["#3182CE", "#E53E3E"];

  // ✅ Export to PDF
const exportPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("School Management Reports", 14, 20);

  // ✅ Use autoTable(doc, {...}) instead of doc.autoTable
  autoTable(doc, {
    startY: 30,
    head: [["Category", "Data"]],
    body: [
      ["Total Announcements", announcements.total_announcements],
      ["Exam Announcements", announcements.exam],
      ["Trip Announcements", announcements.trip],
      ["Academic Announcements", announcements.academic],
      ["Event Announcements", announcements.event],
      ["Total Students", students.total_students],
      ["Male Students", students.male],
      ["Female Students", students.female],
      ["Total Teachers", teachers.total_teachers],
      ["Teacher Announcements", teachers.announcements_sent],
      ["Active Users (30 days)", systemUsage.active_users],
      ["Logins in last 24h", systemUsage.last_24h_logins],
    ],
  });

  doc.save("reports.pdf");
};


  // ✅ Export to Excel
  const exportExcel = () => {
    const worksheetData = [
      ["Category", "Data"],
      ["Total Announcements", announcements.total_announcements],
      ["Exam Announcements", announcements.exam],
      ["Trip Announcements", announcements.trip],
      ["Academic Announcements", announcements.academic],
      ["Event Announcements", announcements.event],
      ["Total Students", students.total_students],
      ["Male Students", students.male],
      ["Female Students", students.female],
      ["Total Teachers", teachers.total_teachers],
      ["Teacher Announcements", teachers.announcements_sent],
      ["Active Users (30 days)", systemUsage.active_users],
      ["Logins in last 24h", systemUsage.last_24h_logins],
    ];

    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reports");

    XLSX.writeFile(wb, "reports.xlsx");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Export buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={exportPDF}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
        >
          📄 Export PDF
        </button>
        <button
          onClick={exportExcel}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
        >
          📊 Export Excel
        </button>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Announcements */}
        <div className="bg-gradient-to-r from-indigo-100 to-indigo-200 p-6 shadow-lg rounded-2xl">
          <h2 className="text-lg font-bold text-indigo-800 mb-4">📢 Announcements</h2>
          <p>Total: {announcements.total_announcements}</p>
          <p>Exam: {announcements.exam}</p>
          <p>Trip: {announcements.trip}</p>
          <p>Academic: {announcements.academic}</p>
          <p>Event: {announcements.event}</p>
        </div>

        {/* Students (with doughnut) */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 shadow-lg rounded-2xl flex flex-col items-center">
          <h2 className="text-lg font-bold text-blue-800 mb-4">🎓 Students</h2>
          <p>Total: {students.total_students}</p>
          <PieChart width={250} height={220}>
            <Pie
              data={genderData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={50}
              paddingAngle={3}
            >
              {genderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Teachers */}
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 shadow-lg rounded-2xl">
          <h2 className="text-lg font-bold text-green-800 mb-4">👩‍🏫 Teachers</h2>
          <p>Total Teachers: {teachers.total_teachers}</p>
          <p>Announcements Sent: {teachers.announcements_sent}</p>
        </div>

        {/* System Usage */}
        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 shadow-lg rounded-2xl">
          <h2 className="text-lg font-bold text-purple-800 mb-4">⚙️ System Usage</h2>
          <p>Active in last 30 days: {systemUsage.active_users}</p>
          <p>Logins in last 24h: {systemUsage.last_24h_logins}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;
