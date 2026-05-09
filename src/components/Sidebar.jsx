import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsGrid1X2Fill, BsPeopleFill, BsTagsFill, BsChatDotsFill, BsBoxSeam, BsGraphUp } from "react-icons/bs";

export default function Sidebar() {
  const menuItems = [
    { title: "Dashboard", path: "/", icon: <BsGrid1X2Fill /> },
    { title: "Data Pasien (Identify)", path: "/customers", icon: <BsPeopleFill /> },
    { title: "Segmentasi (Differentiate)", path: "/segmentation", icon: <BsTagsFill /> },
    { title: "Interaksi & Chat (Interact)", path: "/interactions", icon: <BsChatDotsFill /> },
    { title: "Inventori Obat", path: "/inventory", icon: <BsBoxSeam /> },
    { title: "Laporan & Analitik", path: "/reports", icon: <BsGraphUp /> },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col transition-all duration-300 shadow-xl">
      {/* Logo Area */}
      <div className="h-20 flex items-center justify-center border-b border-slate-700">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-blue-400">Pharma</span><span className="text-white">Care</span>
        </h1>
      </div>

      {/* Menu Area */}
      <div className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((menu, index) => (
            <li key={index}>
              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <span className="text-lg">{menu.icon}</span>
                <span className="font-medium text-sm">{menu.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Sidebar */}
      <div className="p-4 border-t border-slate-700 text-xs text-slate-400 text-center">
        <p>PharmaCare Admin © 2026</p>
      </div>
    </div>
  );
}