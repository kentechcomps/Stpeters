// TeacherDashboard.jsx
import React, { useState } from "react";
import { BookOpen, FileUp, Megaphone, Users, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Manage Students",
      desc: "View and manage students in your class",
      icon: <Users className="w-10 h-10 text-purple-600" />,
      path: "/managestudent",
    },
    {
      title: "Upload Grades",
      desc: "Upload student marks/grades",
      icon: <BookOpen className="w-10 h-10 text-purple-600" />,
      path: "/grade",
    },
    {
      title: "Upload Materials",
      desc: "Upload notes, assignments, resources",
      icon: <FileUp className="w-10 h-10 text-purple-600" />,
      path: "/materials",
    },
    {
      title: "Announcements",
      desc: "Send announcements to your class",
      icon: <Megaphone className="w-10 h-10 text-purple-600" />,
      path: "/announcement",
    },
    {
      title: "Parent Contacts",
      desc: "View parent details of your students",
      icon: <Phone className="w-10 h-10 text-purple-600" />,
      path: "/teacherparent",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-600 mb-6">
        Dashboard / <span className="text-purple-600 font-semibold">Teacher</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Teacher Dashboard</h1>

      {/* Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((s, idx) => (
          <div
            key={idx}
            onClick={() => navigate(s.path)}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg border border-gray-200 cursor-pointer transition flex flex-col items-center text-center"
          >
            {s.icon}
            <h2 className="text-lg font-semibold mt-4 text-gray-800">{s.title}</h2>
            <p className="text-gray-500 text-sm mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;
