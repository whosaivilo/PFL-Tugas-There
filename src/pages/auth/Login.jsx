import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImSpinner2 } from "react-icons/im";
import { BsExclamationCircleFill, BsApple, BsShieldLock, BsPerson } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { usersAPI } from '../../services/usersAPI';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { loginMember, setCurrentUser } = useAuth();

  const [role, setRole] = useState("admin"); // "admin" | "member"
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [dataForm, setDataForm] = useState({ username: "", password: "" });

  // Menggunakan useRef untuk mengakses elemen input Username secara langsung
  const usernameRef = useRef(null);

  // Fokuskan input username otomatis saat komponen pertama kali dimuat atau role berubah
  useEffect(() => {
    // Gunakan setTimeout kecil untuk menunggu animasi atau proses render selesai
    // Ini sangat berguna jika komponen di-load menggunakan lazy loading (Suspense) atau ada CSS animation
    const timer = setTimeout(() => {
      if (usernameRef.current) {
        usernameRef.current.focus();
      }
    }, 100);

    // Cleanup function untuk mencegah memory leak
    return () => clearTimeout(timer);
  }, [role]);

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    setErrorMsg(""); // clear error on type
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // ── Login via Supabase REST API (Untuk Admin & Member) ──
    try {
      const result = await usersAPI.loginUser(dataForm.username, dataForm.password);
      
      if (result.success) {
        const userRole = result.user.role;

        // Validasi tambahan: Pastikan role yang login sesuai dengan tab yang sedang dipilih di UI
        // (opsional, tapi bagus agar member tidak login lewat tab admin dan sebaliknya)
        if (userRole !== role) {
          setErrorMsg(`Akun ini terdaftar sebagai ${userRole}, bukan ${role}. Silakan pindah tab.`);
          setLoading(false);
          return;
        }

        // Simpan state user ke memory context
        setCurrentUser(result.user);
        
        // Arahkan ke halaman yang tepat berdasarkan role di database
        setTimeout(() => {
          navigate(userRole === "admin" ? "/admin" : "/member");
        }, 100);
      } else {
        setErrorMsg(result.error);
      }
    } catch (err) {
      setErrorMsg("Gagal terhubung ke server Supabase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-modal">

      {/* ── HEADING ───────────────────────────────── */}
      <h1 className="text-[32px] md:text-[36px] font-semi-bold text-[#111] tracking-tight leading-none mb-3">
        Welcome back!
      </h1>
      <p className="text-[15px] font-medium text-[#222] mb-8">
        Enter your Credentials to access your account
      </p>

      {/* ── ROLE TOGGLE ───────────────────────────── */}
      <div className="flex rounded-xl border border-gray-200 p-1 mb-8 bg-gray-50">
        <button
          type="button"
          onClick={() => { setRole("admin"); setErrorMsg(""); setDataForm({ username: "", password: "" }); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
            role === "admin"
              ? "bg-white text-[#3c5e2d] shadow-sm border border-gray-100"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <BsShieldLock className={`text-base ${role === "admin" ? "text-[#3c5e2d]" : "text-gray-400"}`} />
          Admin / Apoteker
        </button>
        <button
          type="button"
          onClick={() => { setRole("member"); setErrorMsg(""); setDataForm({ username: "", password: "" }); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
            role === "member"
              ? "bg-white text-teal-600 shadow-sm border border-gray-100"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <BsPerson className={`text-base ${role === "member" ? "text-teal-600" : "text-gray-400"}`} />
          Member
        </button>
      </div>

      {/* ── INFO HINT ─────────────────────────────── */}
      {role === "member" && (
        <div className="mb-6 p-3 bg-teal-50 border border-teal-100 rounded-xl text-[12px] text-teal-700 font-medium">
          💡 Coba: <strong>ali.hassan</strong> · password: <strong>member123</strong>
        </div>
      )}
      {role === "admin" && (
        <div className="mb-6 p-3 bg-green-50 border border-green-100 rounded-xl text-[12px] text-green-700 font-medium">
          💡 Coba: <strong>emilys</strong> · password: <strong>emilyspass</strong>
        </div>
      )}

      {/* ── ERROR ALERT ───────────────────────────── */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-center text-[14px] font-medium animate-pulse">
          <BsExclamationCircleFill className="mr-2 text-lg shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* ── FORM ──────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Username / Email */}
        <div>
          <label className="block text-[14px] font-medium text-[#111] mb-2">
            {role === "member" ? "Username Member" : "Email address / Username"}
          </label>
          <input
            type="text"
            name="username"
            ref={usernameRef} // Tautkan useRef ke elemen ini
            key={`username-${role}`}
            required
            value={dataForm.username}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-medium outline-none focus:border-[#3c5e2d] focus:ring-1 focus:ring-[#3c5e2d] transition placeholder-gray-300"
            placeholder={role === "member" ? "Masukkan username kamu" : "Enter your email / username"}
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-[14px] font-medium text-[#111]">Password</label>
            <Link to="/forgot" className="text-[12px] font-semibold text-blue-700 hover:underline">
              forgot password
            </Link>
          </div>
          <input
            type="password"
            name="password"
            key={`password-${role}`}
            required
            value={dataForm.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-medium outline-none focus:border-[#3c5e2d] focus:ring-1 focus:ring-[#3c5e2d] transition placeholder-gray-300"
            placeholder="Enter your password"
          />
        </div>

        {/* Remember */}
        <div className="flex items-center pt-1">
          <input
            type="checkbox"
            id="remember"
            className="w-[14px] h-[14px] text-[#3c5e2d] bg-white border-gray-400 rounded focus:ring-[#3c5e2d] cursor-pointer"
          />
          <label htmlFor="remember" className="ml-2 text-[12px] font-medium text-[#222] cursor-pointer">
            Remember for 30 days
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white text-[15px] font-semibold py-3.5 px-4 rounded-xl transition mt-2 ${
            role === "member"
              ? "bg-teal-600 hover:bg-teal-700"
              : "bg-[#3c5e2d] hover:bg-[#2e4a22]"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <ImSpinner2 className="animate-spin mr-2 text-xl" />
              Memproses...
            </span>
          ) : role === "member" ? "Masuk ke Member Portal" : "Login"}
        </button>
      </form>

      {/* ── DIVIDER + SOCIAL (hanya tampil saat admin) ── */}
      {role === "admin" && (
        <>
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-[11px] font-semibold text-[#888]">Or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="flex-1 flex items-center justify-center py-2.5 border border-gray-200 rounded-full hover:bg-gray-50 transition">
              <FcGoogle className="text-xl mr-2" />
              <span className="text-[13px] font-medium text-[#111]">Sign in with Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center py-2.5 border border-gray-200 rounded-full hover:bg-gray-50 transition">
              <BsApple className="text-xl mr-2 text-black" />
              <span className="text-[13px] font-medium text-[#111]">Sign in with Apple</span>
            </button>
          </div>
        </>
      )}

      {/* ── FOOTER ────────────────────────────────── */}
      <div className="text-center mt-4">
        <p className="text-[14px] font-medium text-[#222]">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-700 font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}