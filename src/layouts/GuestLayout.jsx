import React from "react";
import { Link, Outlet } from "react-router-dom";
import { RiStore2Line } from "react-icons/ri";
import Button from "../components/Button";

export default function GuestLayout() {
  return (
    <div className="min-h-screen bg-slate-50 font-[Poppins,sans-serif] animate-in fade-in duration-700 relative pb-20 md:pb-0 flex flex-col">
      
      {/* ── FLOATING NAVBAR (Pill Shape GoApotik Reference) ── */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl bg-white rounded-full shadow-lg px-4 md:px-8 py-3 flex items-center justify-between border border-gray-100">
        
        <Link to="/" className="flex items-center gap-2 shrink-0 cursor-pointer">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-sm">
            <RiStore2Line className="text-white text-lg md:text-xl" />
          </div>
          <div>
              <span className="text-lg md:text-[22px] font-black text-blue-900 tracking-tight block leading-none">PharmaCare</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-[15px] font-bold text-gray-700">
          <Link to="/kemitraan" className="hover:text-orange-500 transition">Kemitraan</Link>
          <Link to="/katalog-produk" className="hover:text-orange-500 transition">Katalog Produk</Link>
          <Link to="/kontak-kami" className="hover:text-orange-500 transition">Kontak Kami</Link>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <Link to="/login">
            <Button type="primary">
               <span className="px-2 md:px-4 text-sm bg-orange-500 hover:bg-orange-600 rounded-full border-none text-white">Masuk / Daftar</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* ── MAIN CONTENT (Dipusatkan lewat Outlet) ── */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-white pt-16 pb-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-sm">
                <RiStore2Line className="text-white text-xl" />
              </div>
              <span className="text-2xl font-black tracking-tight text-blue-900">PharmaCare</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Penyedia layanan kesehatan digital yang tersertifikasi. Melayani dengan cepat, lengkap, dan tepercaya untuk seluruh wilayah Indonesia.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-gray-800">Perusahaan</h4>
            <ul className="text-sm text-gray-500 space-y-3">
              <li><Link to="/" className="hover:text-orange-500 transition">Tentang Kami</Link></li>
              <li><Link to="/kemitraan" className="hover:text-orange-500 transition">Kemitraan Korporasi</Link></li>
              <li><a href="#" className="hover:text-orange-500 transition">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Kebijakan Privasi</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-gray-800">Belanja</h4>
            <ul className="text-sm text-gray-500 space-y-3">
              <li><Link to="/katalog-produk" className="hover:text-orange-500 transition">Katalog Produk</Link></li>
              <li><a href="#" className="hover:text-orange-500 transition">Metode Pembayaran</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Metode Pengiriman</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-gray-800">Kontak & Aplikasi</h4>
            <ul className="text-sm text-gray-500 space-y-3 mb-6">
              <li><span className="font-bold">Hotline:</span> 021-1234567</li>
              <li><span className="font-bold">Email:</span> cs@pharmacare.com</li>
            </ul>
            <Button type="primary">
                 <span className="w-full text-center bg-orange-500 hover:bg-orange-600 border-none rounded text-white py-1">Unduh Aplikasi Mobile</span>
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
          © 2026 PharmaCare. Seluruh hak cipta dilindungi.
        </div>
      </footer>

    </div>
  );
}
