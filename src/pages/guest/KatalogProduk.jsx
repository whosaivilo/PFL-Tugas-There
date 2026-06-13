import React from "react";
import { BsBagCheckFill } from "react-icons/bs";

export default function KatalogProduk() {
  const products = [
    { name: "Susu Peptisol 600g", desc: "Nutrisi Khusus", price: "Rp 150.000", img: "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=300&q=80" },
    { name: "Thermometer Digital", desc: "Alat Kesehatan", price: "Rp 45.000", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80" },
    { name: "Panadol Biru Strip", desc: "Anti Nyeri & Demam", price: "Rp 12.000", img: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=300&q=80" },
    { name: "Masker Medis 3Ply", desc: "Alat Kesehatan", price: "Rp 25.000", img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=300&q=80" },
    { name: "Vitamin C IPI", desc: "Suplemen & Vitamin", price: "Rp 8.000", img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=300&q=80" },
    { name: "Betadine 15ml", desc: "P3K & Antiseptik", price: "Rp 18.000", img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=300&q=80" },
    { name: "Kain Kasa Steril", desc: "P3K & Antiseptik", price: "Rp 10.000", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&q=80" },
    { name: "Minyak Kayu Putih", desc: "Ibu & Bayi", price: "Rp 22.000", img: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=300&q=80" },
  ];

  return (
    <div className="pt-36 pb-20 px-4 md:px-6 max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-[#001b3a] mb-2">Katalog Produk</h1>
        <p className="text-gray-500">Jelajahi ribuan produk kesehatan yang tersedia di Apotek PharmaCare.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((prod, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all flex flex-col group cursor-pointer">
            <div className="h-40 md:h-48 overflow-hidden bg-gray-100 relative">
              <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4 md:p-5 flex flex-col flex-1">
              <p className="text-xs font-semibold text-gray-400 mb-1">{prod.desc}</p>
              <h3 className="font-bold text-gray-800 text-base md:text-lg mb-4 line-clamp-2">{prod.name}</h3>
              <div className="mt-auto flex items-center justify-between">
                <span className="font-black text-orange-600 text-base md:text-lg">{prod.price}</span>
                <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <BsBagCheckFill className="text-sm md:text-base" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
