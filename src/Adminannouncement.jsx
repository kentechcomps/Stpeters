import React, { useState, useEffect } from "react";

const getCategoryColor = (category) => {
  switch (category) {
    case "exam":
      return "bg-yellow-50 border-yellow-200 text-yellow-800";
    case "trip":
      return "bg-green-50 border-green-200 text-green-800";
    case "holiday":
      return "bg-blue-50 border-blue-200 text-blue-800";
    case "general":
    default:
      return "bg-gray-50 border-gray-200 text-gray-800";
  }
};

const getCategoryIcon = (category) => {
  switch (category) {
    case "exam":
      return "📘";
    case "trip":
      return "🚌";
    case "holiday":
      return "🎉";
    case "general":
    default:
      return "ℹ️";
  }
};

const Announcements = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch announcements
  useEffect(() => {
    fetch("http://localhost:5000/api/announcements")
      .then((res) => res.json())
      .then((data) => {
        // ensure array
        if (Array.isArray(data)) setAnnouncements(data);
        else setAnnouncements([]);
      })
      .catch(() => setAnnouncements([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, content, category, created_by: null };

    try {
      if (editingId) {
        const res = await fetch(
          `http://localhost:5000/api/announcements/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) throw new Error("Update failed");
        const updated = await res.json();
        setAnnouncements((prev) => prev.map((ann) => (ann.id === updated.id ? updated : ann)));
        setEditingId(null);
      } else {
        const res = await fetch("http://localhost:5000/api/announcements", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Create failed");
        const created = await res.json();
        setAnnouncements((prev) => [created, ...prev]);
      }

      setTitle("");
      setContent("");
      setCategory("general");
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/announcements/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setAnnouncements((prev) => prev.filter((ann) => ann.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message || "Could not delete");
    }
  };

  const handleEdit = (announcement) => {
    setEditingId(announcement.id);
    setTitle(announcement.title || "");
    setContent(announcement.content || "");
    setCategory(announcement.category || "general");
    // scroll to top of form (optional)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Left Side - Post/Edit Form */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "✏️ Edit Announcement" : "📢 Create Announcement"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full border rounded-lg px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your announcement details..."
            className="w-full border rounded-lg px-3 py-2 h-28"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="general">General</option>
            <option value="trip">Trip</option>
            <option value="exam">Exam</option>
            <option value="holiday">Holiday</option>
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {editingId ? "Update" : "Post"}
            </button>
            {editingId && (
              <button
                type="button"
                className="flex-1 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => {
                  setEditingId(null);
                  setTitle("");
                  setContent("");
                  setCategory("general");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Right Side - Recent Announcements */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">📰 Recent Announcements</h2>
        <div className="space-y-3 max-h-[70vh] overflow-y-auto">
          {announcements.length === 0 ? (
            <p className="text-gray-500">No announcements yet.</p>
          ) : (
            announcements.map((ann) => {
              const colorCls = getCategoryColor(ann.category);
              const icon = getCategoryIcon(ann.category);
              const createdAt = ann.created_at ? new Date(ann.created_at).toLocaleString() : "—";

              return (
                <div key={ann.id} className={`p-3 rounded-lg border ${colorCls}`}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold flex items-center gap-2">
                        <span className="text-xl">{icon}</span>
                        <span>{ann.title}</span>
                      </h3>
                      <p className="text-sm mt-1 text-gray-700">{ann.content}</p>
                      <div className="text-xs mt-2 text-gray-500">
                        {ann.category?.toUpperCase() ?? "GENERAL"} • {createdAt}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(ann)}
                        className="px-3 py-1 border rounded-lg text-sm hover:bg-white/30 bg-white/40"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(ann.id)}
                        className="px-3 py-1 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
