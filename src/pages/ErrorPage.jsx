import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage({ code, description, image }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {image && <img src={image} alt={`Error ${code}`} className="w-40 h-40 mb-6 opacity-80" />}
      <h1 className="text-6xl font-extrabold text-slate-800">{code}</h1>
      <h2 className="text-2xl font-bold text-slate-600 mt-2">Oops! Terjadi Kesalahan</h2>
      <p className="text-gray-500 mt-2 mb-8 text-center max-w-md">
        {description}
      </p>
      <Link to="/" className="px-6 py-3 border border-gray-300 text-slate-700 rounded-lg font-medium hover:bg-gray-50 transition">
        Kembali ke Dashboard Beranda
      </Link>
    </div>
  );
}