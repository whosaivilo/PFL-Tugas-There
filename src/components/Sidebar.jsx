import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BsGrid1X2,
  BsBoxSeam,
  BsGraphUp,
  BsGear,
  BsPeople,
  BsBell,
  BsChatDots,
  BsPhone,
  BsQuestionCircle,
  BsBoxArrowRight,
} from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { FaCartPlus } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Sidebar() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("pharmacare_user"));

  const handleLogout = () => {
    localStorage.removeItem("pharmacare_user");
    window.location.href = "/login";
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: <BsGrid1X2 className="text-[18px]" />,
    },
    {
      title: "Inventory",
      path: "/admin/inventory",
      icon: <BsBoxSeam className="text-[18px]" />,
    },
    {
      title: "Reports",
      path: "/admin/reports",
      icon: <BsGraphUp className="text-[18px]" />,
    },
    {
      title: "Segmentasi",
      path: "/admin/segmentation",
      icon: <BsGear className="text-[18px]" />,
      isLastInGroup: true,
    },

    {
      title: "Data Pasien",
      path: "/admin/customers",
      icon: <BsPeople className="text-[18px]" />,
      isFirstInGroup: true,
    },
    {
      title: "Interaksi",
      path: "/admin/interactions",
      icon: <BsChatDots className="text-[18px]" />,
      isLastInGroup: true,
    },

    {
      title: "Data Pengguna",
      path: "/admin/users",
      icon: <BsPeople className="text-[18px]" />,
      isFirstInGroup: true,
    },
    {
      title: "Covid -19",
      path: "/admin/covid",
      icon: <BsPhone className="text-[18px]" />,
    },
    {
      title: "Get Technical Help",
      path: "/admin/help",
      icon: <BsQuestionCircle className="text-[18px]" />,
    },
  ];
  
  // Ambil nama dari user yang sedang login, atau fallback ke "Admin"
  const adminName = currentUser?.name || currentUser?.username || "Admin";
  const adminInitials = adminName.substring(0, 2).toUpperCase();

  return (
    <div className="w-[260px] bg-[#1d232c] text-gray-300 min-h-screen flex flex-col shrink-0 z-20">
      {/* Logo Area */}
      <div className="h-[72px] flex items-center px-6 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="bg-[#ffcc00] p-1.5 rounded-md">
            <FaCartPlus className="text-blue-900 text-lg" />
          </div>
          <h1 className="text-[20px] font-bold tracking-wide text-white">
            MedConnect
          </h1>
        </div>
      </div>

      <div className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* Panggil komponen Avatar dengan path gambar public kamu */}
            <Avatar className="w-10 h-10 border border-gray-200">
              {/* Kalau link gambar ini mati/kosong, dia otomatis turun ke AvatarFallback */}
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Theresa Olivia"
              />
              <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                {adminInitials}
              </AvatarFallback>
            </Avatar>

            {/* Dot online hijau tetap di posisinya */}
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#1d232c] rounded-full"></div>
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-white leading-tight">
              {adminName}
            </h3>
            <p className="text-[11px] font-medium text-[#ffcc00] capitalize">
              {currentUser?.role || "Admin"}
            </p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          title="Logout"
          className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-md transition-colors"
        >
          <BsBoxArrowRight className="text-xl" />
        </button>
      </div>

      {/* Menu Area dengan NavLink Aktif */}
      <div className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-0.5">
          {menuItems.map((menu, index) => (
            <li
              key={index}
              className={`
                ${menu.isLastInGroup ? "border-b border-gray-700/50 pb-4" : ""} 
                ${menu.isFirstInGroup ? "mt-2" : ""}
              `}
            >
              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-6 py-3 transition-colors ${
                    isActive
                      ? "bg-[#00a6a6] text-white"
                      : "hover:bg-gray-800 text-gray-400 hover:text-white"
                  }`
                }
              >
                <div className="flex items-center gap-4">
                  {menu.icon}
                  <span className="text-[14px] font-medium">{menu.title}</span>
                </div>

                {/* Render Icon Panah atau Badge jika ada */}
                {menu.hasArrow && <FiChevronDown className="text-sm" />}
                {menu.badge && (
                  <span className="bg-[#f0483e] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {menu.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Sidebar */}
      <div className="px-6 py-4 bg-[#181d24] flex justify-between items-center">
        <p className="text-[10px] text-gray-500 font-medium">
          Powered by Subash © 2022
        </p>
        <p className="text-[10px] text-gray-500 font-medium">v 1.1.2</p>
      </div>
    </div>
  );
}
