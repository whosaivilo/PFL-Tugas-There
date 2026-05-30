import React from 'react';

export default function SummaryCard({ title, actionText, actionIcon, value1, label1, value2, label2 }) {
  return (
    <div className="bg-white border border-gray-200 rounded p-5">
      {/* Bagian Atas Kartu */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
        <h3 className="font-bold text-gray-800 text-[16px]">{title}</h3>
        <span className="text-[13px] font-medium text-gray-600 flex items-center gap-1 cursor-pointer">
          {actionText} {actionIcon}
        </span>
      </div>
      
      {/* Bagian Isi Konten (2 Kolom Sejajar) */}
      <div className="flex justify-between px-2 pt-2">
        <div className="w-1/2">
          <p className="text-[22px] font-bold text-gray-800 mb-1">{value1}</p>
          <p className="text-[13px] font-medium text-gray-600">{label1}</p>
        </div>
        <div className="w-1/2">
          <p className="text-[22px] font-bold text-gray-800 mb-1">{value2}</p>
          <p className="text-[13px] font-medium text-gray-600">{label2}</p>
        </div>
      </div>
    </div>
  );
}