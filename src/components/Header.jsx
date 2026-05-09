import React from 'react';
import { BsSearch, BsBellFill, BsGlobe2 } from "react-icons/bs";

export default function Header() {
  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8 border-b border-gray-100">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2 w-96 border border-gray-200">
        <BsSearch className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search for anything here..." 
          className="bg-transparent border-none outline-none ml-3 w-full text-sm text-gray-700"
        />
      </div>

      {/* Right Side Tools */}
      <div className="flex items-center gap-6">
        {/* Language & Date */}
        <div className="hidden md:flex flex-col items-end border-r border-gray-200 pr-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            <BsGlobe2 /> English (US)
          </div>
          <p className="text-xs text-gray-400 mt-1">14 January 2026 22:45:04</p>
        </div>

        {/* Notifications */}
        <button className="relative text-gray-500 hover:text-blue-600">
          <BsBellFill size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold">
            AD
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-gray-800">Super Admin</p>
            <p className="text-xs text-green-500 font-medium">Online</p>
          </div>
        </div>
      </div>
    </header>
  );
}