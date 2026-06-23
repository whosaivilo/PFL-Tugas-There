import React from "react";

import { BsCapsule, BsClock, BsCartPlus, BsLaptop, BsPhone, BsGeoAlt, BsCalendarCheck } from "react-icons/bs";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";

export default function MemberResep() {
  const currentUser = JSON.parse(localStorage.getItem("pharmacare_user")) || {};

  if (!currentUser) return null;

  const deviceIcon = currentUser.activity?.device?.includes("Mobile") ? <BsPhone /> : <BsLaptop />;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <PageHeader 
        title="Resep & Pengingat"
        description="Kelola obat rutinmu dan pantau aktivitas akunmu di sini."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* ── OBAT RUTIN / FREQUENT ITEMS ── */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-6">
            <BsCapsule className="text-teal-600" /> Sering Dibeli / Obat Rutin
          </h3>
          
          <div className="space-y-4">
            {currentUser.frequentItems?.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-teal-50/50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700">
                    <BsCapsule />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{item}</h4>
                    <p className="text-xs text-gray-500">Kebutuhan Rutin</p>
                  </div>
                </div>
                <Button type="primary">
                  <BsCartPlus /> Beli Lagi
                </Button>
              </div>
            ))}
            {(!currentUser.frequentItems || currentUser.frequentItems.length === 0) && (
              <p className="text-sm text-gray-500 italic text-center py-4">Belum ada data obat rutin.</p>
            )}
          </div>
        </div>

        {/* ── PENGINGAT (MOCK) & AKTIVITAS AKUN ── */}
        <div className="space-y-6">
          
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-6 md:p-8 rounded-2xl text-white shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <h3 className="text-lg font-bold flex items-center gap-2 mb-2 relative z-10">
              <BsClock /> Pengingat
            </h3>
            <p className="text-teal-50 text-sm mb-4 relative z-10">
              Jangan lupa untuk menebus resep bulanan kamu sebelum tanggal 28 bulan ini.
            </p>
            <div className="relative z-10 inline-block">
              <button className="bg-white text-teal-700 text-sm font-bold py-2 px-4 rounded-lg shadow-sm hover:bg-teal-50 transition">
                Atur Pengingat
              </button>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BsCalendarCheck className="text-gray-500" /> Aktivitas Akun Terakhir
            </h3>
            
            <div className="space-y-5">
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wide">Waktu Login Terakhir</p>
                <p className="text-[14px] font-bold text-gray-800">{currentUser.activity?.lastLogin || "Tidak diketahui"}</p>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5 uppercase tracking-wide">
                    {deviceIcon} Device
                  </p>
                  <p className="text-[14px] font-bold text-gray-800">{currentUser.activity?.device || "Tidak diketahui"}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5 uppercase tracking-wide">
                    <BsGeoAlt /> Lokasi
                  </p>
                  <p className="text-[14px] font-bold text-gray-800">{currentUser.activity?.location || "Tidak diketahui"}</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-2 uppercase tracking-wide">Aktivitas Dalam App</p>
                <div className="flex flex-wrap gap-2">
                  {currentUser.activity?.inAppActivity?.map((act, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                      {act}
                    </span>
                  ))}
                  {(!currentUser.activity?.inAppActivity || currentUser.activity.inAppActivity.length === 0) && (
                    <span className="text-sm text-gray-500 italic">Tidak ada</span>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wide">Durasi Penggunaan</p>
                <p className="text-[14px] font-bold text-gray-800">{currentUser.activity?.usageDurationMin || 0} Menit</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
