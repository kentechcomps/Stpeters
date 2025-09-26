// TeacherAnnouncements.jsx
import React, { useState } from "react";

const TeacherAnnouncements = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Announcement sent: ${message}`);
    setMessage("");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="text-sm text-gray-600 mb-6">Teacher / <span className="text-purple-600 font-semibold">Announcements</span></div>
      <h1 className="text-2xl font-bold mb-6">Send Announcement</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow max-w-lg">
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your announcement here..." className="w-full border p-2 rounded-lg mb-4 h-32"></textarea>
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Send</button>
      </form>
    </div>
  );
};

export default TeacherAnnouncements;
