import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  BsSearch, BsArrowRightShort, BsWhatsapp, BsBagCheckFill, BsGeoAlt, BsShop, BsBoxSeam
} from "react-icons/bs";
import { FaHeartPulse, FaPills, FaStethoscope, FaBaby } from "react-icons/fa6";
import Button from "../../components/Button";
import InputField from "../../components/InputField";

// Komponen helper untuk animasi angka berjalan
const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString('id-ID')}</span>;
};

export default function GuestPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [waNumber, setWaNumber] = useState("");

  const categories = [
    { name: "Batuk & Flu", icon: <FaStethoscope />, color: "bg-blue-50 text-blue-600" },
    { name: "Suplemen & Vitamin", icon: <FaPills />, color: "bg-orange-50 text-orange-500" },
    { name: "Alat Kesehatan", icon: <FaHeartPulse />, color: "bg-teal-50 text-teal-600" },
    { name: "Ibu & Bayi", icon: <FaBaby />, color: "bg-pink-50 text-pink-500" },
  ];

  const products = [
    { name: "Vitamin C 1000mg", desc: "Suplemen & Vitamin", price: "Rp 45.000", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80" },
    { name: "Paracetamol 500mg", desc: "Anti Nyeri & Demam", price: "Rp 15.000", img: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=300&q=80" },
    { name: "Kotak P3K Lengkap", desc: "Alat Kesehatan", price: "Rp 120.000", img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=300&q=80" },
    { name: "Minyak Telon Plus", desc: "Ibu & Bayi", price: "Rp 35.000", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&q=80" },
  ];

  return (
    <>
      {/* ── HERO SECTION (Tentang PharmaCare / GoApotik Style with Animated Numbers) ── */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 bg-[#001b3a] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1576602976047-174e57a47881?w=1200&q=80" alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001b3a] via-[#001b3a]/90 to-[#001b3a]/40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
              Tentang PharmaCare
            </h1>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-100">
              Solusi terlengkap untuk kebutuhan kesehatan harian Anda
            </h2>
            <p className="text-lg text-blue-200/90 leading-relaxed mb-12">
              Dapatkan semua kebutuhan kesehatan Anda dengan mudah melalui ekosistem kami. Kami bermitra dengan ribuan mitra yang menyediakan puluhan ribu produk dan menjangkau ratusan kota di seluruh Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mb-12">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <BsShop className="text-4xl text-orange-400" />
                <div className="text-4xl md:text-5xl font-black">
                  <CountUp end={7000} duration={2500} />+
                </div>
              </div>
              <p className="text-lg font-bold text-blue-200">Mitra PharmaCare</p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <BsBoxSeam className="text-4xl text-blue-400" />
                <div className="text-4xl md:text-5xl font-black">
                  <CountUp end={50000} duration={2500} />+
                </div>
              </div>
              <p className="text-lg font-bold text-blue-200">Produk Tersedia</p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <BsGeoAlt className="text-4xl text-red-500" />
                <div className="text-4xl md:text-5xl font-black">
                  <CountUp end={480} duration={2500} />+
                </div>
              </div>
              <p className="text-lg font-bold text-blue-200">Jangkauan Kota</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/katalog-produk" className="px-6 py-2.5 rounded-full border-2 border-yellow-400 text-yellow-400 font-bold hover:bg-yellow-400 hover:text-[#001b3a] transition-all">
              Belanja Produk
            </Link>
            <Link to="/kemitraan" className="px-6 py-2.5 rounded-full border-2 border-yellow-400 text-yellow-400 font-bold hover:bg-yellow-400 hover:text-[#001b3a] transition-all">
              Menjadi Mitra Kami
            </Link>
          </div>
        </div>
      </section>

      {/* ── SMART SEARCH ── */}
      <section className="py-8 bg-white border-b border-gray-100 relative z-20 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
           <div className="flex items-center bg-gray-50 rounded-full px-6 py-2 border-2 border-orange-100 focus-within:bg-white focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-50 transition-all shadow-inner">
            <BsSearch className="text-orange-500 text-xl" />
            <input 
              type="text" 
              placeholder="Ketik nama obat, vitamin, atau keluhan Anda..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none ml-4 w-full text-base text-gray-700 py-3 font-medium"
            />
            <Button type="primary">
               <span className="bg-orange-500 hover:bg-orange-600 border-none px-4 rounded-full text-white">Cari</span>
            </Button>
          </div>
        </div>
      </section>

      {/* ── KATEGORI PRODUK ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Kategori Populer</h2>
            <p className="text-gray-500">Pilih kategori sesuai dengan kondisi kesehatan Anda saat ini.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
             {categories.map((cat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md cursor-pointer transition-all hover:-translate-y-1">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${cat.color}`}>
                        {cat.icon}
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm md:text-base">{cat.name}</h3>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* ── KATALOG PRODUK SHOWCASE ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Belanja Aneka Produk Kesehatan</h2>
              <p className="text-gray-500">Mulai dari obat sampai dengan produk kecantikan.</p>
            </div>
            <Link to="/katalog-produk" className="hidden sm:flex items-center gap-1 text-orange-600 font-semibold hover:underline">
              Lihat Katalog Produk <BsArrowRightShort className="text-xl" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((prod, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all flex flex-col group cursor-pointer">
                <div className="h-40 md:h-48 overflow-hidden bg-gray-100 relative">
                  <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-orange-600 uppercase">Resmi</div>
                </div>
                <div className="p-4 md:p-5 flex flex-col flex-1">
                  <p className="text-xs font-semibold text-gray-400 mb-1">{prod.desc}</p>
                  <h3 className="font-bold text-gray-800 text-base md:text-lg mb-4 line-clamp-2">{prod.name}</h3>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-black text-orange-600 text-base md:text-xl">{prod.price}</span>
                    <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <BsBagCheckFill className="text-sm md:text-base" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRM / NEWSLETTER (O2O Concept / Diskon) ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-[#001b3a] rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 md:w-1/2 space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-orange-400 text-sm font-bold tracking-widest uppercase mb-2">
                O2O Promo & Layanan Pelanggan
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Langganan Buletin Kami & <br/>Klaim Diskon Khusus
              </h2>
              <p className="text-blue-100 text-lg">
                Masukkan WhatsApp Anda. Dapatkan info tren kesehatan, diskon khusus, dan barcode promo yang bisa ditebus di Apotek Fisik / Online kami!
              </p>
            </div>

            <div className="relative z-10 w-full md:w-1/2 max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Terima kasih! Nomor Anda telah terdaftar."); setWaNumber(""); }}>
                <InputField 
                  label="Nomor WhatsApp" 
                  placeholder="Contoh: 081234567890" 
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                />
                <Button type="primary">
                  <span className="w-full text-center flex items-center justify-center gap-2 bg-orange-500 border-none rounded hover:bg-orange-600 text-white py-1">
                    <BsWhatsapp className="text-lg" /> Berlangganan Sekarang
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FLOATING ACTION BUTTON (FAB) ── */}
      <button 
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 hover:scale-110 transition-all group"
        onClick={() => alert("Membuka Chatbot Dukungan Pelanggan...")}
      >
        <BsWhatsapp className="text-2xl" />
        <span className="absolute right-16 bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Kontak Customer Service
        </span>
      </button>
    </>
  );
}
