import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightShort, BsHeartPulseFill, BsStarFill, BsChevronDown } from "react-icons/bs";
import { supabase } from "../../lib/supabase";

export default function GuestPage() {
  const [memberCount, setMemberCount] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "Apakah pendaftaran member ini gratis?", a: "Ya, 100% Gratis! Anda tidak perlu membayar biaya pendaftaran atau langganan bulanan. Cukup daftar dan langsung nikmati keuntungannya." },
    { q: "Bagaimana cara mendapatkan dan menggunakan Poin Loyalty?", a: "Poin akan otomatis bertambah ke akun Anda setiap kali transaksi obat diselesaikan. Poin tersebut dapat Anda tukarkan sebagai potongan harga langsung saat checkout berikutnya!" },
    { q: "Apakah resep dokter wajib diunggah?", a: "Untuk obat dengan logo K (Keras) wajib melampirkan resep, sedangkan obat bebas (hijau/biru) bisa langsung dibeli tanpa resep." },
    { q: "Berapa lama proses verifikasi pesanan?", a: "Pesanan Anda akan diverifikasi oleh apoteker kami dalam waktu maksimal 15-30 menit pada jam kerja operasional." },
    { q: "Apakah melayani pengiriman ke luar kota?", a: "Ya, kami bekerja sama dengan berbagai ekspedisi tepercaya untuk menjangkau pengiriman ke seluruh wilayah Indonesia dengan aman." }
  ];

  useEffect(() => {
    // Fetch total members from CRM Database
    const fetchStats = async () => {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'member');
      if (count !== null) setMemberCount(count);
      else setMemberCount(0);
    };

    // Fetch live 5-star reviews from CRM Database
    const fetchReviews = async () => {
      const { data } = await supabase
        .from('orders')
        .select(`
          id,
          rating,
          feedback_text,
          profiles(full_name)
        `)
        .eq('rating', 5)
        .not('feedback_text', 'is', null)
        .limit(3);
      
      if (data && data.length > 0) {
        setReviews(data);
      } else {
        // Fallback dummy data jika belum ada ulasan di database
        setReviews([
          {
            rating: 5,
            feedback_text: "Apotek digital terbaik! Pesan resep sangat mudah dan sinkronisasi datanya cepat.",
            profiles: { full_name: "Budi Santoso" }
          },
          {
            rating: 5,
            feedback_text: "Sistem poin loyalty-nya sangat menguntungkan. Sering dapat diskon tambahan!",
            profiles: { full_name: "Siti Aminah" }
          },
          {
            rating: 5,
            feedback_text: "Sangat puas dengan fitur CRM ini. Histori pesanan tercatat rapi.",
            profiles: { full_name: "Andi Wijaya" }
          }
        ]);
      }
      setIsLoadingReviews(false);
    };

    fetchStats();
    fetchReviews();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* ── HERO SECTION (Area TOP) ── */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 overflow-hidden relative">
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
              <img src="/img/obat2.jpg" alt="Dashboard Apotek" className="w-full h-auto object-cover" />
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
      
      {/* ── AREA MIDDLE: FEATURES ── */}
      <section id="fitur" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Satu Platform, Semua Kebutuhan Medis</h2>
            <p className="text-lg text-slate-600">Integrasi penuh dari pemesanan obat hingga sinkronisasi data dengan sistem apoteker kami secara real-time.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Pantau Riwayat Kesehatan</h3>
              <p className="text-slate-600 leading-relaxed">Akses riwayat pesanan dan resep secara terpusat untuk pelayanan klinis yang lebih tajam dan akurat.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Terhubung dengan Apoteker</h3>
              <p className="text-slate-600 leading-relaxed">Setiap pesanan Anda langsung tersinkronisasi real-time ke sistem dashboard Apoteker untuk diproses tanpa delay.</p>
            </div>

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

      {/* ── AREA TESTIMONI (Live dari Database) ── */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm font-bold mb-4">
              Live Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Apa Kata Member Kami?</h2>
            <p className="text-slate-600">Ulasan langsung dari pelanggan yang menggunakan sistem CRM kami.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {!isLoadingReviews && reviews.map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="flex gap-1 text-orange-400 mb-4 text-xl">
                  {[...Array(5)].map((_, i) => (
                    <BsStarFill key={i} />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-6">"{review.feedback_text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                    {review.profiles?.full_name?.substring(0, 1) || "A"}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{review.profiles?.full_name || "Member"}</h4>
                    <p className="text-xs text-slate-500">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-slate-600">Semua yang perlu Anda ketahui tentang layanan CRM PharmaCare.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`bg-slate-50 p-6 rounded-2xl shadow-sm border cursor-pointer transition-all ${openFaq === idx ? 'border-teal-500' : 'border-slate-100'}`}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex justify-between items-center outline-none">
                  <span className="text-lg font-bold text-slate-800">{faq.q}</span>
                  <BsChevronDown className={`text-teal-600 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </div>
                {openFaq === idx && (
                  <div className="mt-4 text-slate-600 leading-relaxed border-t border-slate-200 pt-4 animate-in slide-in-from-top-2 fade-in duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ── AREA BOTTOM: FINAL CTA ── */}
      <section id="daftar" className="py-24 bg-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C20,0 50,0 100,100 Z" fill="currentColor" />
          </svg>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-white text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Mulai Perjalanan Sehatmu Bersama Kami</h2>
            <p className="text-teal-100 text-lg mb-8 leading-relaxed">
              Bergabung dengan ribuan pelanggan lainnya. Kelola riwayat resep, kumpulkan poin, dan nikmati diskon spesial khusus member CRM PharmaCare.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-teal-100 font-medium">
              <span className="flex items-center gap-2">
                <BsHeartPulseFill className="text-orange-400 animate-pulse"/> 
                {memberCount !== null ? `${memberCount}+ Member Terdaftar` : "Memuat data member..."}
              </span>
              <span className="flex items-center gap-2"><BsHeartPulseFill className="text-orange-400"/> 100% Gratis</span>
            </div>
          </div>
          
          <div className="md:w-1/2 w-full">
            <div className="bg-white p-8 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Daftar Member Sekarang</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Silakan gunakan halaman Register resmi."); window.location.href='/register'; }}>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Email / Username</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50" placeholder="johndoe@email.com" />
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
    </div>
  );
}
