import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImSpinner2 } from "react-icons/im";
import { BsExclamationCircleFill, BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [dataForm, setDataForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post("https://dummyjson.com/user/login", {
        username: dataForm.username,
        password: dataForm.password,
      });

      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Gagal terhubung ke server";
      setErrorMsg(String(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-modal">
      {/* TIPOGRAFI H1: Cukup besar, hitam pekat, tebal, dan agak rapat (tracking-tight) */}
      <h1 className="text-[32px] md:text-[36px] font-semi-bold text-[#111] tracking-tight leading-none mb-3">
        Welcome back!
      </h1>
      {/* TIPOGRAFI SUBTITLE: Medium weight, ukuran sedang */}
      <p className="text-[15px] font-medium text-[#222] mb-10">
        Enter your Credentials to access your account
      </p>

      {/* Alert Error */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-center text-[14px] font-medium animate-pulse">
          <BsExclamationCircleFill className="mr-2 text-lg shrink-0" />
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Email Address */}
        <div>
          <label className="block text-[14px] font-medium text-[#111] mb-2">Email address</label>
          <input
            type="text"
            name="username"
            required
            onChange={handleChange}
            // Border sangat halus, placeholder pudar (text-gray-300)
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-medium outline-none focus:border-[#3c5e2d] focus:ring-1 focus:ring-[#3c5e2d] transition placeholder-gray-300"
            placeholder="Enter your email"
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
            required
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-medium outline-none focus:border-[#3c5e2d] focus:ring-1 focus:ring-[#3c5e2d] transition placeholder-gray-300"
            placeholder="Name"
          />
        </div>

        {/* Checkbox */}
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

        {/* Login Button: Warna Hijau Daun (#3c5e2d) */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3c5e2d] hover:bg-[#2e4a22] text-white text-[15px] font-semibold py-3.5 px-4 rounded-xl transition mt-2"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <ImSpinner2 className="animate-spin mr-2 text-xl" />
              Memproses...
            </span>
          ) : (
            "Login"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-4 text-[11px] font-semibold text-[#888]">Or</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Social Login Buttons: Pill shape (rounded-full) */}
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

      {/* Footer Navigasi */}
      <div className="text-center">
        <p className="text-[14px] font-medium text-[#222]">
          Don't have an account? <Link to="/register" className="text-blue-700 font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}