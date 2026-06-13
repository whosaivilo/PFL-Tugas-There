import React, { createContext, useContext, useState, useEffect } from "react";
import customersData from "../data/customersData.json";

const AuthContext = createContext(null);

// Password yang dipakai oleh semua member untuk login
const MEMBER_PASSWORD = "member123";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session dari localStorage saat pertama load
  useEffect(() => {
    const savedUser = localStorage.getItem("pharmacare_user");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("pharmacare_user");
      }
    }
    setLoading(false);
  }, []);

  /**
   * Login sebagai Member
   * Cari username di customersData, cocokkan password dengan MEMBER_PASSWORD
   * @returns {object} { success, user, error }
   */
  const loginMember = (username, password) => {
    if (password !== MEMBER_PASSWORD) {
      return { success: false, error: "Password salah. Gunakan password member Anda." };
    }

    const found = customersData.find(
      (c) => c.username.toLowerCase() === username.toLowerCase()
    );

    if (!found) {
      return { success: false, error: "Username tidak ditemukan." };
    }

    if (found.memberStatus === "Inactive") {
      return {
        success: false,
        error: "Akun Anda tidak aktif. Hubungi kami untuk bantuan.",
      };
    }

    const user = { ...found, role: "member" };
    setCurrentUser(user);
    localStorage.setItem("pharmacare_user", JSON.stringify(user));
    return { success: true, user };
  };

  /**
   * Logout, hapus session
   */
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("pharmacare_user");
  };

  const value = {
    currentUser,
    loading,
    loginMember,
    logout,
    isMember: currentUser?.role === "member",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook untuk konsumsi context
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus digunakan di dalam AuthProvider");
  return ctx;
}
