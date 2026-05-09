import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div id="app-container" className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar - Fix Width */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header di bagian atas */}
        <Header />

        {/* Area Konten Page */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer Kecil (Opsional) */}
        <footer className="px-8 py-4 bg-white border-t border-gray-200 text-xs text-gray-400">
          Pharma One System v1.0 - Managed by Super Admin
        </footer>
      </div>
    </div>
  );
}