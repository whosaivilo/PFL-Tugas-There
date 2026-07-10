import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { BsSearch, BsList } from "react-icons/bs";
import { MdOutlineGTranslate } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f4f7f6] font-sans relative">
      
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-full w-full">
        
        <div className="bg-white h-[72px] border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shadow-sm z-10 shrink-0">
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <BsList className="text-2xl" />
            </button>
            <div className="relative w-full md:w-[400px]">
              <input 
                type="text" 
                placeholder="Search for anything here.." 
                className="w-full bg-[#f4f5f7] text-[13px] font-medium py-2.5 pl-4 pr-10 rounded-md outline-none text-gray-700"
              />
              <BsSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold" />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
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

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
      
      <Toaster position="top-right" richColors />
    </div>
  );
}