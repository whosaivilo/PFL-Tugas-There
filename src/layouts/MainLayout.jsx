import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { BsSearch } from "react-icons/bs";
import { MdOutlineGTranslate } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#f4f7f6] font-sans">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* HEADER (Sama persis dengan referensi) */}
        <div className="bg-white h-[72px] border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10 shrink-0">
          
          {/* Search Bar */}
          <div className="relative w-[400px]">
            <input 
              type="text" 
              placeholder="Search for anything here.." 
              className="w-full bg-[#f4f5f7] text-[13px] font-medium py-2.5 pl-4 pr-10 rounded-md outline-none text-gray-700"
            />
            <BsSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold" />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer">
              <MdOutlineGTranslate className="text-[20px] text-gray-600" />
              <span className="text-[13px] font-semibold text-gray-700">English (US)</span>
              <FiChevronDown className="text-gray-500" />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#ffcc00]"></div>
              <div className="text-right flex flex-col justify-center">
                <p className="text-[13px] font-bold text-gray-800 leading-tight flex items-center gap-1 justify-end">Good Morning</p>
                <p className="text-[11px] font-medium text-gray-500">14 January 2022 · 22:45:04</p>
              </div>
            </div>
          </div>
        </div>

        {/* AREA KONTEN (Dashboard) */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}