import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImSpinner2 } from "react-icons/im";
import { BsExclamationCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { supabase } from '../../lib/supabase'; // Import supabase client

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [dataForm, setDataForm] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Panggil Supabase SignUp
      const { data, error } = await supabase.auth.signUp({
        email: dataForm.email,
        password: dataForm.password,
        options: {
          data: {
            full_name: dataForm.name,
            username: dataForm.username,
            role: "member" // default role untuk pendaftaran terbuka
          }
        }
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg("Pendaftaran berhasil! Mengarahkan ke Dashboard...");
        // Jika berhasil, Supabase akan men-trigger login otomatis (jika auto-confirm email aktif)
        // atau AuthContext akan memproses sesi.
        setTimeout(() => navigate('/member'), 2000);
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-modal">
      <h2 className="text-[28px] md:text-[32px] font-bold text-[#111] mb-2 text-center tracking-tight">Create an Account</h2>
      <p className="text-[14px] text-gray-500 text-center mb-6 font-medium">Bergabunglah dengan CRM PharmaCare</p>

      {/* Alert Error */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-center text-sm font-medium animate-pulse">
          <BsExclamationCircleFill className="mr-2 text-lg shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Alert Success */}
      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center text-sm font-medium animate-pulse">
          <BsCheckCircleFill className="mr-2 text-lg shrink-0" />
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Full Name</label>
          <input type="text" name="name" required value={dataForm.name} onChange={handleChange} className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-[14px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Username</label>
          <input type="text" name="username" required value={dataForm.username} onChange={handleChange} className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-[14px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" placeholder="johndoe123" />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Email</label>
          <input type="email" name="email" required value={dataForm.email} onChange={handleChange} className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-[14px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Password</label>
          <input type="password" name="password" required value={dataForm.password} onChange={handleChange} className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-[14px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" placeholder="********" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 flex justify-center mt-4">
          {loading ? <ImSpinner2 className="animate-spin text-xl" /> : "Register Account"}
        </button>
      </form>

      <p className="text-center text-[13px] font-medium text-gray-600 mt-6">
        Sudah punya akun? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login di sini</Link>
      </p>
    </div>
  );
}