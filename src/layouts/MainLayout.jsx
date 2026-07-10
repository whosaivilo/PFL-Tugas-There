import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { BsList } from "react-icons/bs";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }) + " · " + date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };

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
            <h2 className="hidden md:block text-lg font-bold text-gray-800">
              Admin Workspace
            </h2>
          </div>

          <div className="flex items-center justify-end w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-teal-500 animate-pulse hidden md:block"></div>
              <div className="text-right flex flex-col justify-center">
                <p className="text-[14px] font-bold text-gray-800 leading-tight flex items-center gap-1 justify-end">{getGreeting()}</p>
                <p className="text-[12px] font-medium text-gray-500">{formatDate(currentDate)}</p>
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