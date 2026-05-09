import React from 'react';
import PageHeader from '../components/PageHeader';
import { BsStars, BsBandaidFill, BsCapsule, BsPersonCheckFill } from 'react-icons/bs';

export default function Services() {
  const customServices = [
    {
      title: "Paket Manajemen Diabetes",
      target: "Segmen: Pasien Kronis",
      desc: "Layanan kustomisasi dosis insulin dan pengingat cek gula darah rutin mingguan.",
      icon: <BsCapsule />,
      status: "Aktif",
      color: "blue"
    },
    {
      title: "Layanan Home Care",
      target: "Segmen: Lansia / Pasien Rawat Jalan",
      desc: "Kunjungan apoteker ke rumah untuk edukasi obat dan pemantauan kondisi fisik.",
      icon: <BsPersonCheckFill />,
      status: "Tersedia",
      color: "green"
    },
    {
      title: "Bundling Vitamin Personalisasi",
      target: "Segmen: Umum & Ibu Anak",
      desc: "Paket vitamin yang diracik khusus sesuai usia dan riwayat kesehatan individu.",
      icon: <BsStars />,
      status: "Promo",
      color: "purple"
    }
  ];

  return (
    <div className="p-6">
      <PageHeader 
        title="Layanan Khusus (Customize)" 
        description="Berikan solusi medis yang dipersonalisasi untuk meningkatkan loyalitas pasien." 
        actionButton={
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 shadow-sm transition flex items-center gap-2">
            + Buat Program Baru
          </button>
        }
      />

      {/* Intro Section dari Management Process PDF */}
      <div className="bg-blue-600 rounded-2xl p-6 mb-8 text-white shadow-lg shadow-blue-200">
        <h3 className="text-xl font-bold mb-2">Step 02: Customized Solution Design</h3>
        <p className="text-blue-100 text-sm max-w-2xl">
          Berdasarkan referensi "Pharmacy Management Process", tahap ini adalah memberikan solusi khusus yang menjawab tantangan kesehatan unik tiap pasien. [cite: 63, 67]
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {customServices.map((service, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition group">
            <div className={`h-2 bg-${service.color}-500`}></div>
            <div className="p-6">
              <div className={`w-12 h-12 bg-${service.color}-50 text-${service.color}-600 rounded-full flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition`}>
                {service.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-800">{service.title}</h4>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mt-1">{service.target}</span>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                {service.desc}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  service.status === 'Aktif' ? 'bg-green-100 text-green-700' : 
                  service.status === 'Promo' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {service.status}
                </span>
                <button className="text-blue-600 text-xs font-bold hover:underline">Kelola Layanan &gt;</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="mt-10 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <BsBandaidFill className="text-slate-400 text-xl" />
          <h3 className="font-bold text-slate-700">Strategi Kustomisasi</h3>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="text-blue-600 font-bold">•</span>
            Gunakan data dari halaman <strong>Segmentation</strong> untuk menentukan siapa yang berhak mendapatkan paket Home Care.
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="text-blue-600 font-bold">•</span>
            Kirimkan penawaran ini secara otomatis melalui fitur di halaman <strong>Interactions</strong>.
          </li>
        </ul>
      </div>
    </div>
  );
}