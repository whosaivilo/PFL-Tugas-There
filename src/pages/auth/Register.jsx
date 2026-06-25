import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImSpinner2 } from "react-icons/im";

import { usersAPI } from '../../services/usersAPI';
import { BsExclamationCircleFill, BsCheckCircleFill } from "react-icons/bs";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [dataForm, setDataForm] = useState({
    name: "",
    username: "",
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

    const result = await usersAPI.registerUser(dataForm);

  if (result.success) {
   navigate("/login"); // 1. Kita langsung pindah halaman (Register dihancurkan)
   setLoading(false);  // 2. React kebingungan! "Lho halamannya kan udah gak ada, kok disuruh matiin loading?"
}
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Create an Account</h2>
      <p className="text-sm text-gray-500 text-center mb-6">Bergabunglah untuk mengelola apotek Anda</p>

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
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" name="name" required value={dataForm.name} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input type="text" name="username" required value={dataForm.username} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="johndoe123" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" name="password" required value={dataForm.password} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="********" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex justify-center mt-2">
          {loading ? <ImSpinner2 className="animate-spin text-xl" /> : "Register"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Sudah punya akun? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login di sini</Link>
      </p>
    </div>
  );
}