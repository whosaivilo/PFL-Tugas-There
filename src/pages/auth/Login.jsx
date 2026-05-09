import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImSpinner2 } from "react-icons/im";
import { BsExclamationCircleFill, BsPersonFill, BsLockFill } from "react-icons/bs";
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [dataForm, setDataForm] = useState({
    username: "", // DummyJSON menggunakan username, bukan email
    password: "",
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // Menggunakan API DummyJSON untuk simulasi login
      const response = await axios.post("https://dummyjson.com/user/login", {
        username: dataForm.username,
        password: dataForm.password,
      });

      if (response.status === 200) {
        // Simpan token jika perlu, lalu pindah ke dashboard
        navigate("/");
      }
    } catch (err) {
      // Pengaman agar error selalu terbaca sebagai teks (mencegah crash)
      const message = err.response?.data?.message || err.message || "Gagal terhubung ke server";
      setErrorMsg(String(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-modal">
      <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Welcome Back 👋</h2>
      <p className="text-sm text-gray-500 text-center mb-8">Silakan masuk ke akun PharmaCare Anda</p>

      {/* Alert Error */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-center text-sm font-medium animate-pulse">
          <BsExclamationCircleFill className="mr-2 text-lg shrink-0" />
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Input Username */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Username</label>
          <div className="relative">
            <BsPersonFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="username"
              required
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Username (kminchelle)"
            />
          </div>
        </div>

        {/* Input Password */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
            <Link to="/forgot" className="text-xs font-semibold text-blue-600 hover:underline">Lupa?</Link>
          </div>
          <div className="relative">
            <BsLockFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="•••••••• (0lelplR)"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition flex justify-center items-center shadow-lg shadow-slate-200 disabled:bg-slate-400 mt-4"
        >
          {loading ? (
            <>
              <ImSpinner2 className="animate-spin mr-2 text-xl" />
              Memproses...
            </>
          ) : (
            "Masuk Sekarang"
          )}
        </button>
      </form>

      {/* Footer Navigasi */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Belum punya akun?{' '}
          <Link to="/register" className="text-blue-600 font-bold hover:underline">
            Daftar Apotek
          </Link>
        </p>
      </div>
    </div>
  );
}