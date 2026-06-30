import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRightShort, BsHeartPulseFill } from "react-icons/bs";

export default function GuestPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* ── NAVBAR (Area TOP) ── */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white">
                <BsHeartPulseFill />
              </div>
              <span className="font-bold text-xl text-teal-900 tracking-tight">PharmaCare CRM</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#fitur" className="text-gray-500 hover:text-teal-600 font-medium transition">Fitur Utama</a>
              <a href="#solusi" className="text-gray-500 hover:text-teal-600 font-medium transition">Keuntungan Member</a>
              <a href="#faq" className="text-gray-500 hover:text-teal-600 font-medium transition">FAQ</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-teal-600 font-semibold hover:text-teal-700 transition">
                Masuk
              </Link>
              <Link to="/register" className="bg-teal-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-teal-700 transition shadow-md shadow-teal-500/20">
                Daftar Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION (Area TOP) ── */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 overflow-hidden relative">
        {/* Background Ornaments */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-teal-50 rounded-full blur-3xl opacity-50 z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] bg-orange-50 rounded-full blur-3xl opacity-50 z-0"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          {/* Teks Hero */}
          <div className="md:w-1/2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mb-6 border border-orange-200">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Sistem CRM Apotek Terintegrasi
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] mb-6 tracking-tight">
              Pesan Obat Mudah, <span className="text-teal-600 relative">Kumpulkan Poin<svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-400 opacity-60" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,10 Q50,20 100,10" stroke="currentColor" strokeWidth="4" fill="none"/></svg></span> Sehatmu!
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
              Tingkatkan pengalaman berbelanja resep Anda. Kelola riwayat medis, dapatkan poin loyalitas dari setiap pembelian, dan nikmati diskon eksklusif dari ratusan mitra apotek kami.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <a href="#daftar" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-600 text-white px-8 py-3.5 rounded-full font-bold hover:bg-teal-700 hover:scale-105 transition-all shadow-lg shadow-teal-600/30">
                Mulai Gabung Sekarang <BsArrowRightShort className="text-2xl" />
              </a>
              <Link to="/katalog-produk" className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                Jelajahi Produk
              </Link>
            </div>
          </div>

          {/* Visual Pendukung */}
          <div className="md:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&q=80" alt="Dashboard Apotek" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent flex flex-col justify-end p-8">
                <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-xl max-w-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                      RP
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500">Poin Loyalty Bertambah!</p>
                      <p className="text-sm font-bold text-slate-800">+250 Pts dari Transaksi #991</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
