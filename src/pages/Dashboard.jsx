import React from 'react';
import PageHeader from '../components/PageHeader';
import { BsShieldCheck, BsCashStack, BsBoxSeam, BsExclamationTriangleFill } from 'react-icons/bs';

export default function Dashboard() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader 
        title="Dashboard Utama" 
        description="Ringkasan data inventori apotek dan performa CRM." 
        actionButton={
          <button className="bg-white border border-gray-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm">
            Download Laporan
          </button>
        }
      />

      {/* Bagian Statistik Utama (Dari PDF Pharma One) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 flex items-center justify-center flex-col border-b-4 border-green-500">
            <BsShieldCheck className="text-3xl text-green-500 mb-2" />
            <h3 className="text-xl font-bold text-gray-800">Aman</h3>
            <p className="text-xs text-gray-500 mt-1">Status Inventori</p>
          </div>
          <div className="bg-gray-50 py-2 text-center text-xs text-green-600 font-semibold hover:bg-green-100 cursor-pointer transition">Lihat Detail &gt;&gt;</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 flex items-center justify-center flex-col border-b-4 border-yellow-400">
            <BsCashStack className="text-3xl text-yellow-500 mb-2" />
            <h3 className="text-xl font-bold text-gray-800">Rp 8.558.750</h3>
            <p className="text-xs text-gray-500 mt-1">Pendapatan Bulan Ini</p>
          </div>
          <div className="bg-gray-50 py-2 text-center text-xs text-yellow-600 font-semibold hover:bg-yellow-100 cursor-pointer transition">Lihat Laporan &gt;&gt;</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 flex items-center justify-center flex-col border-b-4 border-blue-500">
            <BsBoxSeam className="text-3xl text-blue-500 mb-2" />
            <h3 className="text-xl font-bold text-gray-800">298</h3>
            <p className="text-xs text-gray-500 mt-1">Total Obat Tersedia</p>
          </div>
          <div className="bg-gray-50 py-2 text-center text-xs text-blue-600 font-semibold hover:bg-blue-100 cursor-pointer transition">Kunjungi Inventori &gt;&gt;</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 flex items-center justify-center flex-col border-b-4 border-red-500 bg-red-50">
            <BsExclamationTriangleFill className="text-3xl text-red-500 mb-2" />
            <h3 className="text-xl font-bold text-red-700">01</h3>
            <p className="text-xs text-red-600 mt-1">Obat Hampir Habis</p>
          </div>
          <div className="bg-red-100 py-2 text-center text-xs text-red-700 font-bold hover:bg-red-200 cursor-pointer transition">Selesaikan Sekarang &gt;&gt;</div>
        </div>
      </div>

      {/* Bagian Widget CRM IDIC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Widget Segmentasi */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-md font-bold text-slate-800 mb-4 border-b border-gray-100 pb-3">Distribusi Pasien (Segmentasi)</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-600">Pasien Penyakit Kronis</span>
                <span className="font-bold text-slate-800">145 (11%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '11%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-600">Kesehatan Ibu & Anak</span>
                <span className="font-bold text-slate-800">320 (24%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-pink-400 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-600">Pelanggan Umum</span>
                <span className="font-bold text-slate-800">850 (65%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Widget Interaksi Terjadwal */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-md font-bold text-slate-800 mb-4 border-b border-gray-100 pb-3">Pengingat & Interaksi Hari Ini</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-sm text-gray-600 flex-1">Kirim reminder tebus resep <span className="font-bold text-gray-800">Ali Hassan</span></p>
              <span className="text-xs text-gray-400">09:00</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <p className="text-sm text-gray-600 flex-1">Follow-up alergi obat <span className="font-bold text-gray-800">Budi Santoso</span></p>
              <span className="text-xs text-gray-400">11:30</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <p className="text-sm text-gray-600 flex-1">Siapkan paket promo vitamin khusus <span className="font-bold text-gray-800">Segmen Ibu & Anak</span></p>
              <span className="text-xs text-gray-400">15:00</span>
            </li>
          </ul>
          <button className="w-full mt-5 bg-slate-50 text-blue-600 text-sm font-semibold py-2 rounded-lg hover:bg-slate-100 transition">
            Lihat Semua Jadwal &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
}