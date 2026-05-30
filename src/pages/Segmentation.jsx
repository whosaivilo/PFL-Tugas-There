import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Modal from '../components/Modal';
import SegmentCard from '../components/SegmentCard';
import InputField from '../components/InputField';
import { BsTagsFill, BsHeartPulseFill, BsShieldPlus } from 'react-icons/bs';

export default function Segmentation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const segments = [
    { title: "Pasien Penyakit Kronis", count: 145, icon: <BsHeartPulseFill />, color: "text-red-500", bg: "bg-red-50", desc: "Rutin menebus obat bulanan (Diabetes, Hipertensi, dll)." },
    { title: "Kesehatan Ibu & Anak", count: 320, icon: <BsShieldPlus />, color: "text-pink-500", bg: "bg-pink-50", desc: "Sering membeli vitamin anak, susu, dan suplemen kehamilan." },
    { title: "Pelanggan Umum", count: 850, icon: <BsTagsFill />, color: "text-blue-500", bg: "bg-blue-50", desc: "Pembelian obat bebas (OTC), vitamin umum, dan P3K." },
  ];

  return (
    <div className="p-6 font-poppins">
      <PageHeader 
        title="Segmentasi Pasien (Differentiate)" 
        description="Kelompokkan pasien berdasarkan kebutuhan medis untuk prioritas layanan." 
        actionButton={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800"
          >
            + Buat Segmen Baru
          </button>
        }
      />

      {/* GRID KARTU SEGMEN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {segments.map((seg, index) => (
          <SegmentCard
            key={index}
            title={seg.title}
            count={seg.count}
            icon={seg.icon}
            color={seg.color}
            bg={seg.bg}
            desc={seg.desc}
          />
        ))}
      </div>

      {/* TOP PASIEN PRIORITAS */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-md font-bold text-gray-800 mb-4">Top Pasien Prioritas (Segmen Kronis)</h3>
        <ul className="space-y-3">
          <li className="flex justify-between items-center py-2 border-b border-gray-50">
            <div>
              <p className="text-sm font-bold text-gray-800">Ali Hassan</p>
              <p className="text-xs text-gray-500">Tebus Rutin: Insulin Novorapid</p>
            </div>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">Prioritas Tinggi</span>
          </li>
          <li className="flex justify-between items-center py-2">
            <div>
              <p className="text-sm font-bold text-gray-800">Siti Aminah</p>
              <p className="text-xs text-gray-500">Tebus Rutin: Amlodipine 10mg</p>
            </div>
            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs font-semibold">Prioritas Sedang</span>
          </li>
        </ul>
      </div>

      {/* MODAL BUAT SEGMEN */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Buat Segmen Pasien Baru">
        <form className="space-y-4">
          <InputField label="Nama Segmen" placeholder="Contoh: Pasien Hipertensi" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kriteria Segmen</label>
            <textarea className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none" rows="3" placeholder="Contoh: Pasien dengan riwayat pembelian obat Amlodipine..."></textarea>
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 mt-4">Konfirmasi Segmen</button>
        </form>
      </Modal>
    </div>
  );
}