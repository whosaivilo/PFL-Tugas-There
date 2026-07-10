import React, { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  BsGrid1X2Fill, BsPerson, BsClockHistory,
  BsGift, BsFileEarmarkMedical, BsBoxArrowRight,
  BsChevronDown, BsBell, BsCart3, BsHouseDoor,
  BsInstagram, BsTiktok, BsYoutube, BsWhatsapp, BsTelephone, BsEnvelope, BsCalendarWeek, BsClock
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
                  src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || profile?.username || "U")}&background=0d9488&color=fff`}
                  alt={profile?.full_name}
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

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>

      {/* ── RICH FOOTER ─────────────────────────────── */}
      <footer className="bg-white border-t border-gray-200 mt-10 pt-10 pb-6 text-sm text-gray-600">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          
          {/* Top Brand & Tagline */}
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm shrink-0">
              <FaHeartPulse className="text-white text-xl" />
            </div>
            <div>
              <span className="text-xl font-black text-gray-800 tracking-tight">PharmaCare</span>
              <span className="text-gray-500 ml-4 pl-4 border-l border-gray-300 font-medium">Digitalisasi Layanan Kesehatan & Farmasi.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            
            {/* Column 1: Perusahaan */}
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-800 text-[15px] mb-4">Perusahaan</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-teal-600 hover:text-teal-700 transition font-medium">Kemitraan Korporasi</a></li>
                  <li><a href="#" className="text-teal-600 hover:text-teal-700 transition font-medium">Syarat & Ketentuan</a></li>
                  <li><a href="#" className="text-teal-600 hover:text-teal-700 transition font-medium">Kebijakan Privasi</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-[15px] mb-3">Unduh PharmaCare</h4>
                <div className="flex items-center gap-3">
                  <div className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-6" />
                  </div>
                  <div className="w-12 h-12 bg-white border border-gray-200 rounded p-1">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=pharmacare" alt="QR Code" className="w-full h-full opacity-70" />
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Belanja */}
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-800 text-[15px] mb-4">Belanja</h4>
                <ul className="space-y-3">
                  <li><NavLink to="/member/katalog" className="text-teal-600 hover:text-teal-700 transition font-medium">Katalog Produk</NavLink></li>
                  <li><a href="#" className="text-teal-600 hover:text-teal-700 transition font-medium">Artikel Kesehatan</a></li>
                  <li><a href="#" className="text-teal-600 hover:text-teal-700 transition font-medium">Kontak Customer Service</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 text-[15px] mb-3">Langganan Buletin Kami</h4>
                <div className="flex gap-2">
                  <input type="email" placeholder="Email" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-500" />
                  <button className="bg-gray-200 text-gray-600 font-bold px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm">Berlangganan</button>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 text-[15px] mb-3">Metode Pembayaran</h4>
                <div className="flex flex-wrap gap-2">
                  {['BCA', 'BRI', 'BNI', 'Mandiri', 'OVO', 'QRIS', 'Mastercard'].map(bank => (
                    <span key={bank} className="px-2 py-1 bg-white border border-gray-200 text-blue-900 font-black italic text-[10px] rounded shadow-sm">{bank}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3: Ikuti Kami */}
            <div>
              <h4 className="font-bold text-gray-800 text-[15px] mb-4">Ikuti Kami</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-teal-600 transition">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-white">
                      <BsInstagram />
                    </div>
                    <span className="font-medium text-teal-600">@PharmaCare</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-teal-600 transition">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                      <BsTiktok />
                    </div>
                    <span className="font-medium text-teal-600">@PharmaCare</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-teal-600 transition">
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                      <BsYoutube />
                    </div>
                    <span className="font-medium text-teal-600">PharmaCare</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Customer Care */}
            <div>
              <h4 className="font-bold text-gray-800 text-[15px] mb-4">Customer Care</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <BsWhatsapp className="text-gray-400 text-lg" />
                  <span className="font-medium">08174979622</span>
                </li>
                <li className="flex items-center gap-3">
                  <BsTelephone className="text-gray-400 text-lg" />
                  <span className="font-medium">021-22213737</span>
                </li>
                <li className="flex items-center gap-3">
                  <BsEnvelope className="text-gray-400 text-lg" />
                  <span className="font-medium">customersupport@pharmacare.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <BsCalendarWeek className="text-gray-400 text-lg" />
                  <span className="font-medium">Senin s/d Minggu</span>
                </li>
                <li className="flex items-center gap-3">
                  <BsClock className="text-gray-400 text-lg" />
                  <span className="font-medium">08:00 - 21:00 WIB</span>
                </li>
              </ul>
              
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 font-black text-teal-600 text-xs">
                    <FaHeartPulse /> Kemenkes
                  </div>
                  <div className="font-black text-gray-800 text-[10px] border border-gray-300 px-1 py-0.5 rounded">
                    ISO 27001
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed text-gray-500">
                  PharmaCare adalah Penyelenggara Sistem Elektronik Farmasi yang tersertifikasi ISO 27001
                </p>
              </div>
            </div>

          </div>

          <div className="text-center text-xs text-gray-400 font-medium pt-6 border-t border-gray-100">
            &copy; {new Date().getFullYear()} PharmaCare Apotek. Hak Cipta Dilindungi. Melayani dengan sepenuh hati demi kesehatan Anda.
          </div>
        </div>
      </footer>

      <Toaster position="top-right" richColors />
    </div>
  );
}
