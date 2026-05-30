import React from 'react';
import Badge from './Badge'; // Pastikan import badge kustom kamu

export default function InteractionLogItem({ name, segment, type, phone, message, time, icon, status, badgeVariant }) {
  return (
    <div className="p-5 hover:bg-slate-50 transition flex gap-4 items-start">
      {/* Kolom Icon Bulat */}
      <div className="mt-1 bg-white p-3 border border-gray-100 rounded-full shadow-sm shrink-0">
        {icon}
      </div>
      
      {/* Kolom Konten Teks */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-gray-800">{name}</p>
            <Badge variant="secondary">
              {segment || "Umum"}
            </Badge>
          </div>
          <span className="text-xs text-gray-400 font-medium">{time}</span>
        </div>
        
        <p className="text-xs text-slate-500 font-semibold mb-2 flex items-center gap-1">
          Jalur Komunikasi: <span className="text-slate-800">{type}</span> 
          <span className="text-gray-400 font-normal">({phone})</span>
        </p>
        
        <p className="text-sm text-gray-600 bg-white p-3 border border-gray-100 rounded-lg rounded-tl-none inline-block shadow-sm w-full md:w-3/4 leading-relaxed">
          "{message}"
        </p>
        
        <div className="mt-3">
          <Badge variant={badgeVariant}>
            Status: {status}
          </Badge>
        </div>
      </div>
    </div>
  );
}