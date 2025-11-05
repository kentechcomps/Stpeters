import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./Supabaseclient"; // ✅ import supabase client

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { email, role }
  const [parentData, setParentData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate();

  // 🔹 Login Function
  const login = async (email, password) => {
    try {
      // 1️⃣ Login with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      const loggedUser = data.user;
      if (!loggedUser) throw new Error("User not found after login.");

      console.log("✅ Logged in user:", loggedUser);

      // 2️⃣ Fetch role from profiles
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", loggedUser.id)
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profile) throw new Error("Profile not found for this user.");

      const userData = { email: loggedUser.email, role: profile.role };
      setUser(userData);

      // 3️⃣ If parent, fetch parent + student details
      if (profile.role === "parent") {
        console.log("Fetching parent details for:", loggedUser.id);

        // Fetch parent record
        const { data: parent, error: parentError } = await supabase
          .from("parents")
          .select("*")
          .eq("id", loggedUser.id)
          .maybeSingle();

        if (parentError) throw parentError;
        if (!parent) throw new Error("Parent record not found.");

        setParentData(parent);
        console.log("✅ Parent data:", parent);

        // Fetch student linked by parent's phone number
        const { data: student, error: studentError } = await supabase
          .from("students")
          .select("*")
          .eq("parent_phonenumber", parent.phone_number)
          .maybeSingle();

        if (studentError) throw studentError;
        if (!student) throw new Error("Student not found for this parent.");

        setStudentData(student);
        console.log("✅ Student data:", student);
      }

      // 4️⃣ Redirect based on role
      switch (profile.role) {
        case "admin":
          navigate("/dashboard");
          break;
        case "clerk":
          navigate("/clerksdashboard");
          break;
        case "parent":
          navigate("/parentsdashboard");
          break;
        case "teacher":
          navigate("/Teacherdashboard");
          break;
        case "student":
          navigate("/students");
          break;
        default:
          navigate("/login");
      }

      return { success: true };
    } catch (err) {
      console.error("❌ Login failed:", err.message);
      return { success: false, message: err.message };
    }
  };

  // 🔹 Logout Function
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setParentData(null);
    setStudentData(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        parentData,
        studentData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 Custom hook to use Auth context
export const useAuth = () => useContext(AuthContext);
