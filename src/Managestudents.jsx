import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Search, X } from "lucide-react";
import { supabase } from "./Supabaseclient"; // adjust path if needed
import { motion, AnimatePresence } from "framer-motion";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // ✅ Dialog states
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editStudent, setEditStudent] = useState(null);

  // ✅ Fetch students from Supabase
  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .eq("role", "student");

    if (error) {
      console.error("Error fetching students:", error.message);
    } else {
      setStudents(data || []);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔍 Filter
  const filteredStudents = students.filter(
    (s) =>
      s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.class?.toLowerCase().includes(search.toLowerCase()) ||
      s.stream?.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // 🗑 Delete student
  const handleDelete = async (id) => {
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error.message);
    } else {
      setStudents(students.filter((s) => s.id !== id));
      setConfirmDelete(null);
    }
  };

  // ✏️ Update student
  const handleUpdate = async () => {
    if (!editStudent) return;
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: editStudent.full_name,
        email: editStudent.email,
        class: editStudent.class,
        stream: editStudent.stream,
      })
      .eq("id", editStudent.id);

    if (error) {
      console.error("Update error:", error.message);
    } else {
      setStudents(
        students.map((s) =>
          s.id === editStudent.id ? { ...s, ...editStudent } : s
        )
      );
      setEditStudent(null);
    }
  };

  return (
    <div className="p-6">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 mb-4">
        <span className="cursor-pointer text-purple-600">Admin</span> /{" "}
        <span className="cursor-pointer text-purple-600">
          Student Management
        </span>{" "}
        / <span className="font-semibold">Manage Students</span>
      </nav>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Manage Students
      </h1>

      {/* Search */}
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-100 text-left">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Full Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Class</th>
              <th className="p-3 border">Stream</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((s, index) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="p-3 border">{indexOfFirst + index + 1}</td>
                <td className="p-3 border">{s.full_name}</td>
                <td className="p-3 border">{s.email}</td>
                <td className="p-3 border">{s.class || "-"}</td>
                <td className="p-3 border">{s.stream || "-"}</td>
                <td className="p-3 border flex gap-2">
                  <button
                    onClick={() => setEditStudent({ ...s })}
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => setConfirmDelete(s)}
                    className="text-red-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === i + 1
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* 🗑 Confirm Delete Dialog */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-xl w-96"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-lg font-semibold mb-2 text-red-600">
                Confirm Delete
              </h2>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete{" "}
                <span className="font-semibold">
                  {confirmDelete.full_name}
                </span>
                ?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete.id)}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✏️ Edit Drawer */}
      <AnimatePresence>
        {editStudent && (
          <motion.div
            className="fixed inset-0 flex justify-end bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-96 h-full shadow-xl p-6 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Edit Student</h2>
                <button
                  onClick={() => setEditStudent(null)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <input
                  type="text"
                  value={editStudent.full_name}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, full_name: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  value={editStudent.email}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, email: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={editStudent.class || ""}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, class: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  placeholder="Class"
                />
                <input
                  type="text"
                  value={editStudent.stream || ""}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, stream: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  placeholder="Stream"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setEditStudent(null)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageStudents;
