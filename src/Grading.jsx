// src/UploadMarks.jsx
import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const subjects = [
  "English",
  "Kiswahili",
  "Mathematics",
  "Science",
  "Social Studies",
  "CRE",
  "Agriculture",
  "Computer Studies",
  "Arts & Music",
];

const grades = ["A", "B", "C", "D", "E"];
const gradePoints = { A: 80, B: 65, C: 50, D: 35, E: 20 };

const TeacherGrades = () => {
  const [classLevel, setClassLevel] = useState("Class 7");
  const [term, setTerm] = useState("Term 1");

  const [students, setStudents] = useState([
    { id: 1, name: "John Mwangi" },
    { id: 2, name: "Mary Wambui" },
    { id: 3, name: "Peter Otieno" },
  ]);

  const [marks, setMarks] = useState({});
  const [showAnalytics, setShowAnalytics] = useState(false);

  const handleGradeChange = (studentId, subject, grade) => {
    setMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subject]: grade,
      },
    }));
  };

  const handleSubmit = () => {
    setShowAnalytics(true);
    alert("Marks have been submitted successfully!");
  };

  // --- ANALYTICS CALCULATIONS ---
  const computeAnalytics = () => {
    if (!showAnalytics) return null;

    // Class averages
    let subjectTotals = {};
    let subjectCounts = {};
    let studentScores = [];

    students.forEach((student) => {
      let total = 0;
      let count = 0;

      subjects.forEach((subj) => {
        const grade = marks[student.id]?.[subj];
        if (grade) {
          total += gradePoints[grade];
          count++;
          subjectTotals[subj] = (subjectTotals[subj] || 0) + gradePoints[grade];
          subjectCounts[subj] = (subjectCounts[subj] || 0) + 1;
        }
      });

      studentScores.push({
        name: student.name,
        avg: count ? total / count : 0,
      });
    });

    const subjectAverages = subjects.map((subj) => ({
      subject: subj,
      avg: subjectCounts[subj] ? subjectTotals[subj] / subjectCounts[subj] : 0,
    }));

    const topStudent = studentScores.reduce(
      (a, b) => (a.avg > b.avg ? a : b),
      { name: "N/A", avg: 0 }
    );

    return { subjectAverages, studentScores, topStudent };
  };

  const analytics = computeAnalytics();

  const colors = ["#6366F1", "#F59E0B", "#10B981", "#EF4444", "#3B82F6"];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <nav className="text-gray-600 mb-4">
        <ol className="flex space-x-2">
          <li>Teacher</li>
          <li>/</li>
          <li>Marks</li>
          <li>/</li>
          <li className="text-purple-600 font-semibold">Upload Marks</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-purple-700 mb-6">Upload Marks</h1>

      {/* Class & Term Selection */}
      <div className="flex space-x-4 mb-6">
        <select
          value={classLevel}
          onChange={(e) => setClassLevel(e.target.value)}
          className="border p-2 rounded-lg shadow-sm"
        >
          <option>Class 7</option>
          <option>Class 8</option>
          <option>Form 1</option>
          <option>Form 2</option>
          <option>Form 3</option>
          <option>Form 4</option>
        </select>

        <select
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="border p-2 rounded-lg shadow-sm"
        >
          <option>Term 1</option>
          <option>Term 2</option>
          <option>Term 3</option>
        </select>
      </div>

      {/* Student Marks Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full text-sm border">
          <thead className="bg-purple-100">
            <tr>
              <th className="p-2 border">Student Name</th>
              {subjects.map((subj, idx) => (
                <th key={idx} className="p-2 border">{subj}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="p-2 border font-medium">{student.name}</td>
                {subjects.map((subj, idx) => (
                  <td key={idx} className="p-2 border">
                    <select
                      value={marks[student.id]?.[subj] || ""}
                      onChange={(e) =>
                        handleGradeChange(student.id, subj, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="">-</option>
                      {grades.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md"
        >
          Submit Marks
        </button>
      </div>

      {/* --- ANALYTICS SECTION --- */}
      {showAnalytics && analytics && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Class Analytics ({classLevel} - {term})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Subject Average Bar Chart */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-3">Subject Averages</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.subjectAverages}>
                  <XAxis dataKey="subject" angle={-30} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avg" fill="#6366F1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Student Performance Pie Chart */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-3">Student Performance Share</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.studentScores}
                    dataKey="avg"
                    nameKey="name"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {analytics.studentScores.map((_, index) => (
                      <Cell key={index} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Student */}
          <div className="mt-6 bg-green-100 border border-green-300 rounded-lg p-4">
            <p className="font-bold text-green-800">
              🏆 Top Student: {analytics.topStudent.name} 
              (Average: {analytics.topStudent.avg.toFixed(1)}%)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherGrades
