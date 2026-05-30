import React from 'react';

export default function Avatar({ name, image }) {
  // 1. Jika ada properti image, tampilkan foto dengan style asli figma kamu
  if (image) {
    return (
      <img 
        src={image} 
        alt={name || "User"} 
        className="w-10 h-10 rounded-md object-cover shrink-0"
      />
    );
  }

  // 2. Jika tidak ada image, fallback ke teks inisial nama
  const initial = name ? name.substring(0, 2).toUpperCase() : "??";
  return (
    <div className="w-10 h-10 rounded-md bg-slate-800 text-white flex items-center justify-center font-bold text-sm border-2 border-slate-700 shrink-0">
      {initial}
    </div>
  );
}