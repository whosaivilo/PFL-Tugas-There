import React from 'react';
import PageHeader from '../components/PageHeader';
import { BsChatDotsFill, BsWhatsapp, BsEnvelopeAtFill, BsTelephoneFill } from 'react-icons/bs';

// IMPORT DATA JSON PASIEN DARI TAHAP 'IDENTIFY'
import patientsData from '../data/patientsData.json';

export default function Interactions() {
  // Kita ambil 4 pasien pertama dari JSON untuk dijadikan contoh log interaksi
  // Jadi kalau nama pasien di JSON diubah, di halaman ini otomatis ikut berubah!
  const interactions = [
    { 
      name: patientsData[0].name, 
      segment: patientsData[0].segment,
      phone: patientsData[0].phone,
      type: "WhatsApp", 
      icon: <BsWhatsapp className="text-green-500" />, 
      message: "Pengingat Otomatis: Stok obat rutin Anda diperkirakan habis dalam 3 hari. Balas 'YA' untuk proses refill resep.", 
      time: "Hari ini, 09:00", 
      status: "Terkirim",
    },
    { 
      name: patientsData[1].name, 
      segment: patientsData[1].segment,
      phone: patientsData[1].phone,
      type: "Email", 
      icon: <BsEnvelopeAtFill className="text-blue-500" />, 
      message: "Newsletter: Promo Bundling Vitamin C khusus pelanggan setia PharmaCare.", 
      time: "Kemarin, 14:30", 
      status: "Dibaca",
    },
    { 
      name: patientsData[3].name, // Mengambil pasien ke-4 (Rina Wati - Ibu & Anak)
      segment: patientsData[3].segment,
      phone: patientsData[3].phone,
      type: "Konsultasi Apoteker", 
      icon: <BsChatDotsFill className="text-purple-500" />, 
      message: "Pasien konsultasi mengenai dosis vitamin anak. Apoteker menyarankan dosis 1 sendok teh sehari setelah makan.", 
      time: "12 Jan 2026, 10:15", 
      status: "Selesai",
    },
    { 
      name: patientsData[8].name, // Mengambil pasien ke-9 (Guntur Wijaya - Kronis)
      segment: patientsData[8].segment,
      phone: patientsData[8].phone,
      type: "Telepon", 
      icon: <BsTelephoneFill className="text-orange-500" />, 
      message: "Follow up pasca-pembelian antibiotik. Pasien dihubungi untuk dipastikan menghabiskan obat sesuai resep dokter.", 
      time: "10 Jan 2026, 16:45", 
      status: "Selesai",
    },
  ];

  return (
    <div className="p-6">
      <PageHeader 
        title="Interaksi & Chat (Interact)" 
        description="Kelola jadwal pengingat obat (Reminder) dan riwayat komunikasi pasien." 
        actionButton={
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 shadow-sm transition flex items-center gap-2">
            <BsWhatsapp /> Kirim Pesan Massal
          </button>
        }
      />

      {/* Statistik Cepat */}
      <div className="grid grid-cols-3 gap-4 mt-6 mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 font-bold uppercase mb-1">Total Broadcast</p>
          <h4 className="text-2xl font-extrabold text-slate-800">1,245</h4>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 font-bold uppercase mb-1">Pesan Dibaca</p>
          <h4 className="text-2xl font-extrabold text-blue-600">89%</h4>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 font-bold uppercase mb-1">Refill Sukses</p>
          <h4 className="text-2xl font-extrabold text-green-600">320</h4>
        </div>
      </div>

      {/* Log Interaksi */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h3 className="text-sm font-bold text-gray-700">Log Interaksi Terkini</h3>
          <span className="text-xs font-medium text-blue-600 cursor-pointer hover:underline">Lihat Semua Data</span>
        </div>
        
        <div className="divide-y divide-gray-100">
          {interactions.map((log, index) => (
            <div key={index} className="p-5 hover:bg-slate-50 transition flex gap-4 items-start">
              {/* Icon */}
              <div className="mt-1 bg-white p-3 border border-gray-100 rounded-full shadow-sm">
                {log.icon}
              </div>
              
              {/* Konten */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-800">{log.name}</p>
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      {log.segment}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{log.time}</span>
                </div>
                
                <p className="text-xs text-slate-500 font-semibold mb-2 flex items-center gap-1">
                  Jalur Komunikasi: <span className="text-slate-800">{log.type}</span> 
                  <span className="text-gray-400 font-normal">({log.phone})</span>
                </p>
                
                <p className="text-sm text-gray-600 bg-white p-3 border border-gray-100 rounded-lg rounded-tl-none inline-block shadow-sm w-full md:w-3/4">
                  "{log.message}"
                </p>
                
                <div className="mt-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    log.status === 'Terkirim' ? 'bg-gray-100 text-gray-600' : 
                    log.status === 'Dibaca' ? 'bg-blue-100 text-blue-700' : 
                    'bg-green-100 text-green-700'
                  }`}>
                    Status: {log.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}