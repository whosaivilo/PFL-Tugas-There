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
      {/* ── AREA MIDDLE: FEATURES & FAQ ── */}
      {/* Feature Section */}
      <section id="fitur" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Satu Platform, Semua Kebutuhan Medis</h2>
            <p className="text-lg text-slate-600">Integrasi penuh dari pemesanan obat hingga sinkronisasi data dengan sistem apoteker kami secara real-time.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Fitur 1 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                <i className="bi bi-clipboard2-pulse"></i>
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Pantau Riwayat Kesehatan</h3>
              <p className="text-slate-600 leading-relaxed">Akses riwayat pesanan dan resep secara terpusat untuk pelayanan klinis yang lebih tajam dan akurat.</p>
            </div>

            {/* Fitur 2 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Terhubung dengan Apoteker</h3>
              <p className="text-slate-600 leading-relaxed">Setiap pesanan Anda langsung tersinkronisasi real-time ke sistem dashboard Apoteker untuk diproses tanpa delay.</p>
            </div>

            {/* Fitur 3 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Loyalty Points & Tiering</h3>
              <p className="text-slate-600 leading-relaxed">Sistem poin cerdas yang otomatis bertambah setiap transaksi dan dapat ditukar dengan diskon khusus apotek.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-slate-600">Semua yang perlu Anda ketahui tentang layanan CRM PharmaCare.</p>
          </div>
          
          <div className="space-y-4">
            <details className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer open:border-teal-500 transition-all">
              <summary className="text-lg font-bold text-slate-800 marker:text-teal-600 flex justify-between items-center outline-none">
                Apakah pendaftaran member ini gratis?
              </summary>
              <div className="mt-4 text-slate-600 leading-relaxed border-t pt-4">
                Ya, 100% Gratis! Anda tidak perlu membayar biaya pendaftaran atau langganan bulanan. Cukup daftar dan langsung nikmati keuntungannya.
              </div>
            </details>
            
            <details className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer open:border-teal-500 transition-all">
              <summary className="text-lg font-bold text-slate-800 marker:text-teal-600 flex justify-between items-center outline-none">
                Bagaimana cara mendapatkan dan menggunakan Poin Loyalty?
              </summary>
              <div className="mt-4 text-slate-600 leading-relaxed border-t pt-4">
                Poin akan otomatis bertambah ke akun Anda setiap kali transaksi obat diselesaikan. Poin tersebut dapat Anda tukarkan sebagai potongan harga langsung saat checkout berikutnya!
              </div>
            </details>
          </div>
        </div>
      {/* ── AREA BOTTOM: FINAL CTA & FOOTER ── */}
      {/* CTA Section dengan Form Registrasi Langsung */}
      <section id="daftar" className="py-24 bg-teal-600 relative overflow-hidden">
        {/* Dekorasi Latar */}
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C20,0 50,0 100,100 Z" fill="currentColor" />
          </svg>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-white text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Mulai Perjalanan Sehatmu Bersama Kami</h2>
            <p className="text-teal-100 text-lg mb-8 leading-relaxed">
              Bergabung dengan puluhan ribu pelanggan lainnya. Kelola riwayat resep, kumpulkan poin, dan nikmati diskon spesial khusus member CRM PharmaCare.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-teal-100 font-medium">
              <span className="flex items-center gap-2"><BsHeartPulseFill className="text-orange-400"/> 1000+ Member</span>
              <span className="flex items-center gap-2"><BsHeartPulseFill className="text-orange-400"/> 100% Gratis</span>
            </div>
          </div>
          
          <div className="md:w-1/2 w-full">
            <div className="bg-white p-8 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Daftar Member Sekarang</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Pendaftaran Berhasil! Silakan Login."); window.location.href='/login'; }}>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50" placeholder="johndoe123" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                  <input type="password" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50" placeholder="••••••••" />
                </div>
                <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 mt-2">
                  Daftarkan Akun Saya
                </button>
              </form>
              <p className="text-center text-sm text-slate-500 mt-4">
                Sudah punya akun? <Link to="/login" className="text-teal-600 font-bold hover:underline">Masuk di sini</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Jangkar Kredibilitas) */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white">
                <BsHeartPulseFill />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">PharmaCare</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">Platform manajemen apotek terpadu yang memadukan layanan kasir, inventory, dan CRM cerdas untuk pelayanan pasien yang maksimal.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Produk</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition">Sistem Kasir Apotek</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Manajemen Resep</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Loyalty CRM</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Kemitraan</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Kontak</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Keamanan & Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Syarat & Ketentuan</a></li>
              <li><span className="inline-block px-3 py-1 bg-slate-800 rounded border border-slate-700 text-xs font-bold text-slate-300 mt-2">Tersertifikasi HIPAA</span></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} PharmaCare Technology. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <a href="#" className="text-slate-500 hover:text-white transition"><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-slate-500 hover:text-white transition"><i className="bi bi-twitter"></i></a>
            <a href="#" className="text-slate-500 hover:text-white transition"><i className="bi bi-instagram"></i></a>
          </div>
        </div>
      </footer>

    </div>
  );
}
