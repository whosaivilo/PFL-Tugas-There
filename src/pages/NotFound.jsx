import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
      <h2 className="text-3xl font-bold text-slate-800 mt-4">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-500 mt-2 mb-8 text-center max-w-md">
        Maaf, halaman yang Anda cari mungkin telah dihapus, diubah namanya, atau tidak tersedia untuk sementara waktu.
      </p>
      <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
        Kembali ke Dashboard
      </Link>
    </div>
  );
}