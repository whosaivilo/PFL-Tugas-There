import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      {/* Container Box */}
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md transition-all">
        {/* Branding PharmaCare */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
            <span className="text-white text-3xl font-bold">P</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Pharma<span className="text-blue-600">Care</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">Inventory & CRM Management</p>
        </div>

        {/* Area Form Login/Register */}
        <div className="min-h-[300px]">
          <Outlet />
        </div>

        {/* Footer Branding */}
        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            &copy; 2026 Pharma One Practice Management Solutions. [cite: 39, 42]
          </p>
        </div>
      </div>
    </div>
  );
}