import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "./Supabaseclient"; // ✅ import supabase client

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { email, role }
  const navigate = useNavigate();

  // Login function
  const login = async (email, password) => {
    try {
      // 1. Supabase auth login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // 2. Fetch role from profiles
      const { data: profile, error: profileError } = await supabase
        .from("profiles")        
        .select("role")
        .eq("id",data.user.id) // match user.id from supabase
        .maybeSingle();
      
   
      console.log("profile:", profile);
      
     
        
      if (profileError) throw profileError;

      if (!profile) throw new Error("Profile not found");

      
       
      const userData = { email: data.user.email, role: profile.role };
      setUser(userData);

      // 3. Redirect based on role
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
      console.error("Login failed:", err.message);
      return { success: false, message: err.message };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
