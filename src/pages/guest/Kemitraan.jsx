import React from "react";
import { BsShopWindow, BsGraphUpArrow, BsMegaphone } from "react-icons/bs";

export default function Kemitraan() {
  return (
    <div className="pt-36 pb-20 px-4 md:px-6 max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-[#001b3a] mb-6">Tingkatkan Penjualan & Jangkauan Apotek Anda</h1>
        <p className="text-lg text-gray-600">
          Kami siap membantu Apotek dari skala kecil hingga besar untuk menjangkau calon pelanggan potensial melalui berbagai ekosistem kami.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-6">
             <BsShopWindow />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Registrasi Cepat</h3>
          <p className="text-gray-500">Proses pendaftaran yang mudah dan cepat untuk membuka toko digital apotek fisik Anda.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform">
          <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center text-3xl mb-6">
             <BsGraphUpArrow />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Pertumbuhan Omzet</h3>
          <p className="text-gray-500">Tingkatkan transaksi harian dengan menjangkau lebih banyak pelanggan di wilayah Anda secara O2O.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-3xl mb-6">
             <BsMegaphone />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Dukungan Pemasaran</h3>
          <p className="text-gray-500">Dapatkan dukungan materi pemasaran digital dan CRM untuk meningkatkan loyalitas pelanggan.</p>
        </div>
      </div>
    </div>
  );
}
