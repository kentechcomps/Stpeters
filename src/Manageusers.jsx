import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Search, X } from "lucide-react";
import Swal from "sweetalert2";
import { supabase } from "./Supabaseclient";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const usersPerPage = 5;

  // Fetch users from Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) console.error("Error fetching users:", error);
      else setUsers(data);
    };
    fetchUsers();
  }, []);

  // Filter users
  const filteredUsers = users.filter(
    (user) =>
      user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.role?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Delete User
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const { error } = await supabase.from("profiles").delete().eq("id", id);
      if (error) {
        Swal.fire("Error!", error.message, "error");
      } else {
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire("Deleted!", "User has been removed.", "success");
      }
    }
  };

  // Open Edit Drawer
  const handleEdit = (user) => {
    setEditingUser(user);
    setShowEditDrawer(true);
  };

  // Handle Edit Submit
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedUser = {
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      role: formData.get("role"),
    };

    const { error } = await supabase
      .from("profiles")
      .update(updatedUser)
      .eq("id", editingUser.id);

    if (error) {
      Swal.fire("Error!", error.message, "error");
    } else {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...updatedUser } : user
        )
      );
      Swal.fire("Updated!", "User details have been updated.", "success");
      setShowEditDrawer(false);
      setEditingUser(null);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6 text-gray-600">
        <span className="hover:underline cursor-pointer">Dashboard</span> &gt;{" "}
        <span className="hover:underline cursor-pointer">Users</span> &gt;{" "}
        <span className="text-purple-700 font-medium">Manage Users</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Users</h2>

        {/* Search Input */}
        <div className="flex items-center bg-white border rounded-lg shadow-sm px-3 py-2">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-full text-sm text-gray-700"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-purple-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{user.full_name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{user.role}</td>
                  <td className="px-6 py-3 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-500 italic"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Drawer */}
      {showEditDrawer && editingUser && (
        <div className="fixed inset-0 flex justify-end z-50">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowEditDrawer(false)}
          ></div>

          {/* Drawer */}
          <div className="relative bg-white w-full max-w-md h-full shadow-xl animate-slideInRight">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold text-purple-700">
                Edit User
              </h2>
              <button
                onClick={() => setShowEditDrawer(false)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  defaultValue={editingUser.full_name}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editingUser.email}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600">Role</label>
                <select
                  name="role"
                  defaultValue={editingUser.role}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
                >
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                  <option value="clerk">Clerk</option>
                  <option value="parent">Parent</option>
                  <option value="student">Student</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditDrawer(false)}
                  className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Animation style */}
      <style>
        {`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .animate-slideInRight {
            animation: slideInRight 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default ManageUsers;
