import React from "react";
import { BsAwardFill } from "react-icons/bs";

export default function TierBenefits() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-5 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
        <BsAwardFill className="text-teal-500 text-xl" />
        <h3 className="font-bold text-gray-800">Keuntungan Member (Tier)</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        
        {/* Silver Card */}
        <div className="p-6 text-center hover:bg-gray-50 transition-colors">
          <div className="w-14 h-14 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
            <BsAwardFill className="text-2xl drop-shadow-sm" />
          </div>
          <h4 className="font-black text-gray-800 text-lg">Silver</h4>
          <p className="text-xs font-bold text-gray-400 mb-3 bg-gray-100 inline-block px-3 py-1 rounded-full">0 - 999 Poin</p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Kumpulkan poin dari setiap transaksi dan tukarkan dengan voucher belanja & diskon.
          </p>
        </div>
        
        {/* Gold Card */}
        <div className="p-6 text-center relative overflow-hidden bg-gradient-to-b from-yellow-50/30 to-transparent hover:bg-yellow-50/50 transition-colors">
          <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-sm">
            Paling Populer
          </div>
          <div className="w-14 h-14 mx-auto bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600 rounded-2xl flex items-center justify-center mb-4 shadow-inner ring-4 ring-yellow-50">
            <BsAwardFill className="text-2xl drop-shadow-sm" />
          </div>
          <h4 className="font-black text-yellow-700 text-lg">Gold</h4>
          <p className="text-xs font-bold text-yellow-600 mb-3 bg-yellow-100 inline-block px-3 py-1 rounded-full">1.000 - 4.999 Poin</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Semua keuntungan Silver <strong>+ Gratis Ongkir</strong> bulanan & Diskon Spesial prioritas.
          </p>
        </div>
        
        {/* Platinum Card */}
        <div className="p-6 text-center hover:bg-violet-50/30 transition-colors">
          <div className="w-14 h-14 mx-auto bg-gradient-to-br from-violet-100 to-violet-200 text-violet-600 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
            <BsAwardFill className="text-2xl drop-shadow-sm" />
          </div>
          <h4 className="font-black text-violet-700 text-lg">Platinum</h4>
          <p className="text-xs font-bold text-violet-500 mb-3 bg-violet-100 inline-block px-3 py-1 rounded-full">5.000+ Poin</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Akses prioritas tanpa antre, <strong>Layanan Konsultasi Gratis</strong>, dan Reward Eksklusif bulanan.
          </p>
        </div>

      </div>
    </div>
  );
}
