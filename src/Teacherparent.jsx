// TeacherParents.jsx
import React from "react";

const TeacherParents = () => {
  const parents = [
    { id: 1, student: "John Mwangi", name: "Mr. Mwangi", phone: "0712345678", email: "mwangi@example.com" },
    { id: 2, student: "Mary Atieno", name: "Mrs. Atieno", phone: "0723456789", email: "atieno@example.com" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="text-sm text-gray-600 mb-6">Teacher / <span className="text-purple-600 font-semibold">Parent Contacts</span></div>
      <h1 className="text-2xl font-bold mb-6">Parent Contact Details</h1>

      <table className="w-full bg-white border rounded-xl shadow">
        <thead className="bg-purple-100">
          <tr>
            <th className="p-3 text-left">Student</th>
            <th className="p-3 text-left">Parent</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {parents.map((p) => (
            <tr key={p.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{p.student}</td>
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.phone}</td>
              <td className="p-3">{p.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherParents;
