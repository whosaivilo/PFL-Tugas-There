import React, { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  BsGrid1X2Fill, BsPerson, BsClockHistory,
  BsGift, BsFileEarmarkMedical, BsBoxArrowRight,
  BsChevronDown, BsBell, BsCart3, BsHouseDoor
} from "react-icons/bs";
import { FaHeartPulse } from "react-icons/fa6";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export default function MemberLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("pharmacare_user");
    window.location.href = "/login";
  };

  const levelBadge = {
    Silver: "bg-gray-100 text-gray-600 border border-gray-300",
    Gold: "bg-amber-100 text-amber-700 border border-amber-300",
    Platinum: "bg-violet-100 text-violet-700 border border-violet-300",
  };

  const navItems = [
    { title: "Beranda",            path: "/member",            icon: <BsHouseDoor />,            end: true },
    { title: "Katalog Obat",       path: "/member/katalog",    icon: <BsCart3 /> },
    { title: "Riwayat",            path: "/member/riwayat",    icon: <BsClockHistory /> },
    { title: "Loyalty & Reward",   path: "/member/loyalty",    icon: <BsGift /> },
    { title: "Resep & Pengingat",  path: "/member/resep",      icon: <BsFileEarmarkMedical /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-[Poppins,sans-serif]">

      {/* ── TOP NAVBAR ─────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">

          {/* Brand */}
          <NavLink to="/member" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
              <FaHeartPulse className="text-white text-sm" />
            </div>
            <span className="text-[15px] font-bold text-gray-800 hidden sm:block">PharmaCare</span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-teal-600 text-white shadow-md shadow-teal-200"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  }`
                }
              >
                <span className="text-[14px]">{item.icon}</span>
                {item.title}
              </NavLink>
            ))}
          </nav>

          {/* Right Side: Bell + Avatar Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Notif */}
            <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition">
              <BsBell className="text-gray-500 text-lg" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>

            {/* Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition"
              >
                <img
                  src={profile?.avatar_url}
                  alt={profile?.full_name}
                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || profile?.username || "U")}&background=0d9488&color=fff`; }}
                  className="w-7 h-7 rounded-lg object-cover"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-[12px] font-bold text-gray-800 leading-none">{(profile?.full_name || profile?.username || "Member").split(" ")[0]}</p>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${levelBadge[profile?.member_level || "Silver"]}`}>
                    {profile?.member_level || "Silver"}
                  </span>
                </div>
                <BsChevronDown className={`text-gray-400 text-xs transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-3 border-b border-gray-50">
                      <p className="text-xs font-bold text-gray-800">{profile?.full_name || "Member"}</p>
                      <p className="text-[11px] text-gray-400">@{profile?.username || "member"}</p>
                      <p className="text-[11px] font-semibold text-teal-600 mt-0.5">
                        {(profile?.loyalty_points || 0).toLocaleString("id-ID")} poin
                      </p>
                    </div>
                    <div className="p-1.5">
                      <NavLink to="/member/profile" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition">
                        <BsPerson /> Profil Saya
                      </NavLink>
                      <NavLink to="/member/loyalty" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition">
                        <BsGift /> Loyalty & Reward
                      </NavLink>
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-medium text-red-500 hover:bg-red-50 transition">
                        <BsBoxArrowRight /> Keluar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-gray-100 transition"
            >
              <span className={`w-4.5 h-0.5 bg-gray-600 rounded transition-all duration-200 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-4.5 h-0.5 bg-gray-600 rounded transition-all duration-200 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-4.5 h-0.5 bg-gray-600 rounded transition-all duration-200 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive = item.end
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                    isActive
                      ? "bg-teal-600 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.title}
                </NavLink>
              );
            })}
            <button onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-red-500 hover:bg-red-50 transition">
              <BsBoxArrowRight /> Keluar
            </button>
          </div>
        )}
      </header>

      {/* ── PAGE CONTENT ───────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        <Outlet />
      </main>

      <Toaster position="top-right" richColors />
    </div>
  );
}
