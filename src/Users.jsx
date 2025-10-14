import React, { useState, useEffect, use } from "react";
import { PlusCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Authcontext";

const MyUsers = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [classes, setClasses] = useState([]);
  const [parents, setParents] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const navigate = useNavigate();

  const { user } = useAuth(); // Get current user role

  useEffect(() => {
    console.log(`Current User Role: ${user.role}`);
    
  }, [user]);

  // Fetch classes and parents when modal opens
  useEffect(() => {
    if (showModal) {
      fetchClasses();
      fetchParents();
    }
  }, [showModal]);

  const fetchClasses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/classes");
      const data = await res.json();
      setClasses(data);
      console.log("Classes fetched:", data);
      
    } catch (err) {
      console.error("Error fetching classes:", err.message);
    }
  };

  const fetchParents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/parents");
      const data = await res.json();
      setParents(data);
    } catch (err) {
      console.error("Error fetching parents:", err.message);
    }
  };

  // Handle Parent Selection → auto-fill phone
  const handleParentChange = (e) => {
    const parentId = e.target.value;
    setSelectedParentId(parentId);

    const parent = parents.find((p) => p.id.toString() === parentId);
    setParentPhone(parent ? parent.phone_number : "");
  };

  // Handle Add User Submit
  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const newUser = Object.fromEntries(formData.entries());

    // Attach parent_id and remove parent_phone since it's auto-set
    if (role === "student") {
      newUser.parent_id = selectedParentId;
      delete newUser.parent_phone;
    }

    try {
      const response = await fetch("http://localhost:5000/api/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create user");

      alert("✅ " + data.message);
      setShowModal(false);
    } catch (err) {
      console.error("Error creating user:", err.message);
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-purple-700 mb-8">
        Admin Dashboard
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add User Card */}
        <div
          onClick={() => setShowModal(true)}
          className="cursor-pointer flex flex-col items-center justify-center p-10 bg-white rounded-2xl shadow hover:shadow-lg transition"
        >
          <PlusCircle className="w-16 h-16 text-purple-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Add User</h2>
          <p className="text-gray-500 text-sm mt-2">
            Create a new user and assign roles
          </p>
        </div>

        {/* Manage Users Card */}
        <div
          onClick={() => navigate("/dashboard/ManageUsers")}
          className="cursor-pointer flex flex-col items-center justify-center p-10 bg-white rounded-2xl shadow hover:shadow-lg transition"
        >
          <Users className="w-16 h-16 text-purple-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Manage Users</h2>
          <p className="text-gray-500 text-sm mt-2">
            View, edit, and delete existing users
          </p>
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
              Add New User
            </h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              {/* Role */}
              <div>
                <label className="block text-gray-600 text-sm mb-1">Role</label>
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
 <option value="">Select Role</option>
  {user.role === "clerk" ? (
    <>
      <option value="parent">Parent</option>
      <option value="student">Student</option>
    </>
  ) : (
    <>
      <option value="admin">Admin</option>
      <option value="teacher">Teacher</option>
      <option value="clerk">Clerk</option>
      <option value="parent">Parent</option>
      <option value="student">Student</option>
    </>
  )}

                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-600 text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Parent Extra Fields */}
              {role === "parent" && (
                <div>
                  <label className="block text-gray-600 text-sm mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    required
                    pattern="^07[0-9]{8}$"
                    maxLength="10"
                    placeholder="07XXXXXXXX"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Must be 10 digits and start with 07
                  </p>
                </div>
              )}

              {/* Student Extra Fields */}
              {role === "student" && (
                <>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      required
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      required
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      Admission Number
                    </label>
                    <input
                      type="text"
                      name="admission_number"
                      required
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>

                  {/* Class Dropdown */}
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      Class Name
                    </label>
                    <select
                      name="class_name"
                      required
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="">Select Class</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.name}>
                          {cls.name} ({cls.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Parent Dropdown */}
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      Parent
                    </label>
                    <select
                      name="parent_id"
                      value={selectedParentId}
                      onChange={handleParentChange}
                      required
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="">Select Parent</option>
                      {parents.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.full_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Auto-filled Parent Phone */}
                  {parentPhone && (
                    <div>
                      <label className="block text-gray-600 text-sm mb-1">
                        Parent Phone
                      </label>
                      <input
                        type="text"
                        value={parentPhone}
                        disabled
                        className="w-full p-3 border bg-gray-100 rounded-lg"
                      />
                    </div>
                  )}
                </>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  {loading ? "Adding..." : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyUsers;
