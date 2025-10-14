import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Search, X, Users } from "lucide-react";
import { supabase } from "./Supabaseclient";
import { motion, AnimatePresence } from "framer-motion";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // For user-facing errors

  // ✅ Fetch students from Supabase (added full_name and email)
  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from("students")
      .select(`
        id,
        admission_number,
        dob,
        gender,
        class_name ,
        class_category ,
        parent_phonenumber ,
        full_name,
        created_at     
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching students:", error.message);
      setErrorMessage("Failed to load students. Check console for details.");
    } else {
      console.log("Fetched students:", data);
      setStudents(data || []);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔍 Filter
  const filteredStudents = students.filter(
    (s) =>
      s.class_name.toLowerCase().includes(search.toLowerCase()) ||
      s.class_category.toLowerCase().includes(search.toLowerCase()) ||
      s.parent_phonenumber?.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // 🗑 Delete student (added logging and user error)
  const handleDelete = async (id) => {
    console.log("Attempting to delete ID:", id); // Debug log
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error.message);
      setErrorMessage(`Delete failed: ${error.message}`);
    } else {
      console.log("Delete successful for ID:", id); // Debug log
      setStudents(students.filter((s) => s.id !== id));
      setConfirmDelete(null);
      setErrorMessage(""); // Clear any prior errors
    }
  };

  // ✏️ Update student
  const handleUpdate = async () => {
    if (!editStudent) return;
    const { error } = await supabase
      .from("students")
      .update({
        full_name: editStudent.full_name,
        email: editStudent.email,
        class: editStudent.class, // TODO: If this should be class_id, query for ID first
        stream: editStudent.stream,
      })
      .eq("id", editStudent.id);

    if (error) {
      console.error("Update error:", error.message);
      setErrorMessage(`Update failed: ${error.message}`);
    } else {
      setStudents(
        students.map((s) =>
          s.id === editStudent.id ? { ...s, ...editStudent } : s
        )
      );
      setEditStudent(null);
      setErrorMessage("");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Error Toast (optional - shows user errors) */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
        >
          {errorMessage}
          <button onClick={() => setErrorMessage("")} className="ml-4 text-red-500 hover:text-red-700">
            ×
          </button>
        </motion.div>
      )}

      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1 text-sm text-gray-600 mb-6 font-medium">
        <span className="cursor-pointer hover:text-purple-600 transition-colors">
          Admin
        </span>
        <span className="text-gray-400">/</span>
        <span className="cursor-pointer hover:text-purple-600 transition-colors">
          Student Management
        </span>
        <span className="text-gray-400">/</span>
        <span className="font-semibold text-purple-700">Manage Students</span>
      </nav>

      {/* Title */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Manage Students
          </h1>
          <p className="text-gray-500 text-sm">
            View, edit, and manage student records efficiently
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by class, category, or parent phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white shadow-sm placeholder-gray-400 transition-all duration-200"
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Fullname
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                 gender
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Admission No.
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Class Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Date of Birth
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Parent Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <Users className="w-16 h-16 text-gray-300" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        No students found
                      </h3>
                      <p className="text-sm text-gray-500">
                        {search ? `Try adjusting your search: "${search}"` : "Start by adding your first student record."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentStudents.map((s, index) => (  // ✅ Fixed: Use currentStudents, not students
                  <motion.tr
                    key={s.id}
                    className="hover:bg-gray-50 transition-all duration-200 ease-in-out"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      {indexOfFirst + index + 1}  {/* ✅ Fixed index for pagination */}
                    </td>
                     <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {s.full_name}
                    </td>
                     <td className="px-6 py-4 text-sm capitalize text-gray-700">
                      {s.gender}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {s.admission_number}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {s.class_name || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                        {s.class_category || "-"}
                      </span>
                    </td>
                   
                    <td className="px-6 py-4 text-sm text-gray-600 italic">
                      {new Date(s.dob).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-mono">
                      {s.parent_phonenumber || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setEditStudent({ 
                            ...s, 
                            class: s.class_name || '', 
                            stream: s.class_category || '' 
                          })}
                          className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 shadow-sm"
                          title="Edit Student"
                        >
                          <Pencil size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setConfirmDelete(s)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 shadow-sm"
                          title="Delete Student"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-xl p-2 border border-gray-200 shadow-md">
            {Array.from({ length: totalPages }, (_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-sm ${
                  currentPage === i + 1
                    ? "bg-purple-600 text-white shadow-purple-300"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </motion.button>
            ))}
          </div>
        </div>
      )}

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
              className="bg-white p-8 rounded-2xl shadow-2xl w-96 border border-gray-100"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold mb-3 text-red-600 flex items-center gap-2">
                <Trash2 size={20} />
                Confirm Delete
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-800">
                  {confirmDelete.full_name || "this student"}  {/* ✅ Fallback if still missing */}
                </span>
                ? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete.id)}
                  className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium shadow-md transition-all duration-200"
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
              className="bg-white w-96 h-full shadow-2xl rounded-l-2xl p-8 overflow-y-auto border-l border-gray-200"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Pencil size={20} />
                  Edit Student
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditStudent(null)}
                  className="text-gray-400 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editStudent.full_name || ""} 
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, full_name: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-200"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editStudent.email || ""}  
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, email: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-200"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Class
                  </label>
                  <input
                    type="text"
                    value={editStudent.class || ""}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, class: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-200"
                    placeholder="Enter class"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stream
                  </label>
                  <input
                    type="text"
                    value={editStudent.stream || ""}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, stream: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-200"
                    placeholder="Enter stream"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setEditStudent(null)}
                  className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-6 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 font-medium shadow-md transition-all duration-200"
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