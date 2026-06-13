import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { BsExclamationCircleFill, BsShieldLock, BsPerson } from "react-icons/bs";
import { FaHeartPulse } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";

export default function MemberLogin() {
  const navigate = useNavigate();
  const { loginMember } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Simulasi delay sedikit supaya ada feel "processing"
    await new Promise((r) => setTimeout(r, 700));

    const result = loginMember(form.username, form.password);
    if (result.success) {
      navigate("/member");
    } else {
      setErrorMsg(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex items-center justify-center p-4 font-[Poppins,sans-serif]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-80 h-80 bg-teal-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-emerald-200 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-teal-100">

          {/* Logo / Brand */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <FaHeartPulse className="text-white text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              PharmaCare Member
            </h1>
            <p className="text-sm text-gray-500 mt-1 text-center">
              Masuk ke portal member Anda untuk menikmati benefit eksklusif
            </p>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5 flex items-center text-sm font-medium gap-2">
              <BsExclamationCircleFill className="text-lg shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Username Member
              </label>
              <div className="relative">
                <BsPerson className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  name="username"
                  required
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Masukkan username Anda"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition placeholder-gray-300"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
              </div>
              <div className="relative">
                <BsShieldLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition placeholder-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold transition border-none bg-transparent p-0"
                >
                  {showPass ? "Sembunyikan" : "Lihat"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white text-sm font-bold py-3.5 px-4 rounded-xl transition shadow-lg shadow-teal-200 mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <ImSpinner2 className="animate-spin text-lg" />
                  Memproses...
                </>
              ) : (
                "Masuk ke Member Portal"
              )}
            </button>
          </form>

          {/* Info hint */}
          <div className="mt-5 p-3 bg-teal-50 rounded-xl border border-teal-100">
            <p className="text-xs text-teal-700 font-medium text-center">
              💡 Coba: <strong>ali.hassan</strong> / <strong>member123</strong>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center space-y-2">
            <p className="text-sm text-gray-500">
              Bukan member?{" "}
              <a href="#" className="text-teal-600 font-semibold hover:underline">
                Daftar Sekarang
              </a>
            </p>
            <p className="text-sm text-gray-500">
              Login sebagai{" "}
              <Link to="/login" className="text-gray-700 font-semibold hover:underline">
                Admin / Apoteker
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
