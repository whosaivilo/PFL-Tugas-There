import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-6">
      
      {/* Gambar sekarang ngambil langsung dari URL internet (Icon 404) */}
      <img src="./public/img/404.png" alt="Icon Error" className="w-28 h-28 mb-8 drop-shadow-lg" />

      <h1 className="text-8xl md:text-9xl font-extrabold text-blue-600 tracking-tight">404</h1>
      <h2 className="text-3xl font-bold text-slate-800 mt-4 text-center">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-500 mt-3 mb-10 text-center max-w-md leading-relaxed">
        Maaf, halaman yang Anda cari mungkin telah dihapus, diubah namanya, atau tidak tersedia untuk sementara waktu.
      </p>
      
      <Link 
        to="/" 
        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}