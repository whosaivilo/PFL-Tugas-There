import React from 'react';
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

export default function StatCard({ title, value, icon, borderColor, subtext, bgFooter }) {
  return (
    <div className={`bg-white rounded border ${borderColor} flex flex-col h-[150px]`}>
      {/* Bagian Isi Konten Rata Tengah */}
      <div className="flex-1 flex flex-col items-center justify-center pt-2">
        {icon}
        <h3 className="text-[20px] font-bold text-gray-800 leading-none mb-1">{value}</h3>
        <p className="text-[13px] font-medium text-gray-600">{title}</p>
      </div>
      
      {/* Bagian Sabuk Kaki Berwarna di Bawah */}
      <div className={`${bgFooter} py-2 flex items-center justify-center gap-1 text-[12px] text-gray-700 font-medium cursor-pointer`}>
        {subtext} <HiOutlineChevronDoubleRight />
      </div>
    </div>
  );
}