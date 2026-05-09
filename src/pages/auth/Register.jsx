import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImSpinner2 } from "react-icons/im";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulasi loading
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Create an Account</h2>
      <p className="text-sm text-gray-500 text-center mb-6">Bergabunglah untuk mengelola apotek Anda</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" required className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" required className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" required className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="********" />
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