import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ImSpinner2 } from "react-icons/im";
import { BsExclamationCircleFill, BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { supabase } from '../../lib/supabase'; // Import supabase client

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [dataForm, setDataForm] = useState({ email: "", password: "" });

  const emailRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (emailRef.current) {
        emailRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    setErrorMsg(""); // clear error on type
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: dataForm.email,
        password: dataForm.password,
      });

      if (error) {
        setErrorMsg(error.message);
      }
      // Jika berhasil, AuthContext akan mendeteksi session baru dan 
      // otomatis me-redirect via App.jsx
    } catch (err) {
      setErrorMsg("Terjadi kesalahan pada jaringan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-modal">
      <h1 className="text-[32px] md:text-[36px] font-semi-bold text-[#111] tracking-tight leading-none mb-3">
        Welcome back!
      </h1>
      <p className="text-[15px] font-medium text-[#222] mb-8">
        Enter your Credentials to access your account
      </p>

      <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-xl text-[12px] text-blue-700 font-medium">
        💡 Sistem menggunakan autentikasi Supabase. Silakan gunakan <strong>Email</strong> yang terdaftar.
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-center text-[14px] font-medium animate-pulse">
          <BsExclamationCircleFill className="mr-2 text-lg shrink-0" />
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[14px] font-medium text-[#111] mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            required
            value={dataForm.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-medium outline-none focus:border-[#3c5e2d] focus:ring-1 focus:ring-[#3c5e2d] transition placeholder-gray-300"
            placeholder="Enter your email"
          />
        </div>

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
            required
            value={dataForm.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-medium outline-none focus:border-[#3c5e2d] focus:ring-1 focus:ring-[#3c5e2d] transition placeholder-gray-300"
            placeholder="Enter your password"
          />
        </div>

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

        <button
          type="submit"
          disabled={loading}
          className="w-full text-white text-[15px] font-semibold py-3.5 px-4 rounded-xl transition mt-2 bg-[#3c5e2d] hover:bg-[#2e4a22]"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <ImSpinner2 className="animate-spin mr-2 text-xl" />
              Memproses...
            </span>
          ) : "Login"}
        </button>
      </form>

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

      <div className="text-center mt-4">
        <p className="text-[14px] font-medium text-[#222]">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-700 font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}