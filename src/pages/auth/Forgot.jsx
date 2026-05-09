import React from 'react';
import { Link } from 'react-router-dom';

export default function Forgot() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Lupa Password?</h2>
      <p className="text-sm text-gray-500 text-center mb-6">Masukkan email Anda dan kami akan mengirimkan instruksi untuk mereset password.</p>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" required className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="you@example.com" />
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mt-2">
          Kirim Link Reset
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Ingat password Anda? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Kembali ke Login</Link>
      </p>
    </div>
  );
}