import React from 'react';

export default function SegmentCard({ title, count, icon, color, bg, desc, onClick, isActive }) {
  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-xl shadow-sm border transition cursor-pointer ${
        isActive ? 'border-teal-500 ring-2 ring-teal-100 bg-teal-50/10' : 'border-gray-200 bg-white hover:shadow-md hover:border-teal-300'
      }`}
    >
      <div className={`w-12 h-12 ${bg} ${color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-2 mb-4">{desc}</p>
      <div className="flex justify-between items-center border-t border-gray-100 pt-4">
        <span className="text-sm font-medium text-gray-600">Total Pasien:</span>
        <span className="text-lg font-bold text-slate-800">{count}</span>
      </div>
    </div>
  );
}