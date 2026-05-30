import React from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button'; 
import Badge from '../components/Badge';   
import StatCard from '../components/StatCard'; 
import InteractionLogItem from '../components/InteractionLogItem'; 
import { BsChatDotsFill, BsWhatsapp, BsEnvelopeAtFill, BsTelephoneFill, BsBriefcase } from 'react-icons/bs';

// IMPORT DATA JSON PASIEN DARI TAHAP 'IDENTIFY'
import patientsData from '../data/patientsData.json';

export default function Interactions() {
  const interactions = [
    { 
      name: patientsData[0]?.name || "Ali Hassan", 
      segment: patientsData[0]?.segment || "Kronis",
      phone: patientsData[0]?.phone || "0812-3456-7890",
      type: "WhatsApp", 
      icon: <BsWhatsapp className="text-green-500" />, 
      message: "Pengingat Otomatis: Stok obat rutin Anda diperkirakan habis dalam 3 hari. Balas 'YA' untuk proses refill resep.", 
      time: "Hari ini, 09:00", 
      status: "Terkirim",
      badgeVariant: "secondary"
    },
    { 
      name: patientsData[1]?.name || "Budi Santoso", 
      segment: patientsData[1]?.segment || "Umum",
      phone: patientsData[1]?.phone || "0821-1122-3344",
      type: "Email", 
      icon: <BsEnvelopeAtFill className="text-blue-500" />, 
      message: "Newsletter: Promo Bundling Vitamin C khusus pelanggan setia PharmaCare.", 
      time: "Kemarin, 14:30", 
      status: "Dibaca",
      badgeVariant: "info"
    },
    { 
      name: patientsData[2]?.name || "Siti Aminah", 
      segment: patientsData[2]?.segment || "Ibu & Anak",
      phone: patientsData[2]?.phone || "0852-9988-7766",
      type: "Konsultasi Apoteker", 
      icon: <BsChatDotsFill className="text-purple-500" />, 
      message: "Pasien konsultasi mengenai dosis vitamin anak. Apoteker menyarankan dosis 1 sendok teh sehari setelah makan.", 
      time: "12 Jan 2026, 10:15", 
      status: "Selesai",
      badgeVariant: "success"
    },
    { 
      name: patientsData[3]?.name || "Rina Wati", 
      segment: patientsData[3]?.segment || "Ibu & Anak",
      phone: patientsData[3]?.phone || "0813-4455-6677",
      type: "Telepon", 
      icon: <BsTelephoneFill className="text-orange-500" />, 
      message: "Follow up pasca-pembelian antibiotik. Pasien dihubungi untuk dipastikan menghabiskan obat sesuai resep dokter.", 
      time: "10 Jan 2026, 16:45", 
      status: "Selesai",
      badgeVariant: "success"
    },
  ];

  return (
    <div className="p-6 font-poppins">
      <PageHeader 
        title="Interaksi & Chat (Interact)" 
        description="Kelola jadwal pengingat obat (Reminder) dan riwayat komunikasi pasien." 
        actionButton={
          <Button type="success" onClick={() => alert("Pesan massal berhasil disebarkan ke WhatsApp pasien!")}>
            <BsWhatsapp /> Kirim Pesan Massal
          </Button>
        }
      />

      {/* 3 KOTAK STATCARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-6">
        <StatCard 
          title="Total Broadcast" value="1,245" icon={<BsChatDotsFill className="text-[32px] text-slate-500 mb-2" />} 
          borderColor="border-slate-300" subtext="View Broadcast History" bgFooter="bg-slate-100" 
        />
        <StatCard 
          title="Pesan Dibaca" value="89%" icon={<BsWhatsapp className="text-[32px] text-[#10b981] mb-2" />} 
          borderColor="border-[#10b981]" subtext="View Read Analytics" bgFooter="bg-[#d1fae5]" 
        />
        <StatCard 
          title="Refill Sukses" value="320" icon={<BsBriefcase className="text-[32px] text-[#38bdf8] mb-2" />} 
          borderColor="border-[#38bdf8]" subtext="View Refill Logs" bgFooter="bg-[#bae6fd]" 
        />
      </div>

      {/* Area Log Interaksi */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h3 className="text-sm font-bold text-gray-700">Log Interaksi Terkini</h3>
          <span className="text-xs font-medium text-blue-600 cursor-pointer hover:underline">Lihat Semua Data</span>
        </div>
        
        <div className="divide-y divide-gray-100">
          {interactions.map((log, index) => (
            <InteractionLogItem key={index} {...log} />
          ))}
        </div>
      </div>
    </div>
  );
}