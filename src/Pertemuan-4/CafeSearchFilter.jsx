import { useState } from "react";
import "./tailwind.css";
import cafeData from "./cafeData.json";

export default function CafeDirectory() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedStatus: "",
    selectedWifi: "",
  });

  const [viewMode, setViewMode] = useState("guest");

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const _searchTerm = dataForm.searchTerm.toLowerCase();

  const filteredCafes = cafeData.filter((cafe) => {
    const matchesSearch =
      cafe.name.toLowerCase().includes(_searchTerm) ||
      cafe.description.toLowerCase().includes(_searchTerm);

    const matchesStatus = dataForm.selectedStatus
      ? cafe.status === dataForm.selectedStatus
      : true;

    let matchesWifi = true;
    if (dataForm.selectedWifi !== "") {
      const isWifiRequired = dataForm.selectedWifi === "true";
      matchesWifi = cafe.facilities.wifi === isWifiRequired;
    }

    return matchesSearch && matchesStatus && matchesWifi;
  });

  const allStatuses = [...new Set(cafeData.map((cafe) => cafe.status))];

  return (
    // 1. Background putih bersih (slate-50) dengan overflow-hidden & relative
    <div className="relative min-h-screen bg-slate-50 p-6 md:p-12 lg:p-16 overflow-hidden z-0 text-slate-800">
      {/* 2. RAHASIA GLASS EFFECT: Dekorasi Blur di belakang layar */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-200/40 blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-orange-200/30 blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full bg-blue-200/20 blur-[100px] -z-10 pointer-events-none"></div>

      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto mb-8 text-center relative z-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Pekanbaru <span className="text-amber-600">Cafe Directory</span>
        </h1>
        <p className="text-sm md:text-lg text-slate-500 mt-2 font-medium">
          Cari cafe buat nongki dan nugasmu disini!
        </p>
      </div>

      {/* --- TOGGLE BUTTON VIEW (REAL GLASS EFFECT) --- */}
      <div className="flex justify-center mb-10 relative z-10">
        <div className="bg-white/40 backdrop-blur-2xl p-2 rounded-full border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] inline-flex gap-2">
          <button
            onClick={() => setViewMode("guest")}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-500 ${
              viewMode === "guest"
                ? "bg-slate-800/90 backdrop-blur-md text-white shadow-lg border border-slate-700/50"
                : "text-slate-500 hover:bg-white/60 hover:text-slate-900"
            }`}
          >
            Guest
          </button>
          <button
            onClick={() => setViewMode("admin")}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-500 ${
              viewMode === "admin"
                ? "bg-slate-800/90 backdrop-blur-md text-white shadow-lg border border-slate-700/50"
                : "text-slate-500 hover:bg-white/60 hover:text-slate-900"
            }`}
          >
            Admin
          </button>
        </div>
      </div>

      {/* --- SECTION SEARCH & FILTER --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 mb-10 relative z-10">
        <input
          type="text"
          name="searchTerm"
          placeholder="Cari nama atau deskripsi cafe..."
          onChange={handleChange}
          className="flex-1 p-4 border border-white/60 bg-white/60 backdrop-blur-md rounded-2xl focus:ring-2 focus:ring-amber-500 shadow-sm text-slate-800 placeholder-slate-400 font-medium outline-none"
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            name="selectedStatus"
            onChange={handleChange}
            className="w-full sm:w-48 p-4 border border-white/60 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm text-slate-700 font-medium outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Semua Status</option>
            {allStatuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            name="selectedWifi"
            onChange={handleChange}
            className="w-full sm:w-48 p-4 border border-white/60 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm text-slate-700 font-medium outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Semua Fasilitas WiFi</option>
            <option value="true">Ada WiFi</option>
            <option value="false">Tanpa WiFi</option>
          </select>
        </div>
      </div>

      {/* --- KONDISI TAMPILAN: KOSONG, GUEST, atau ADMIN --- */}
      {filteredCafes.length === 0 ? (
        <div className="max-w-7xl mx-auto text-center py-20 bg-white/60 backdrop-blur-2xl rounded-[3rem] border border-white/80 shadow-sm relative z-10">
          <p className="text-4xl mb-4">☕</p>
          <p className="text-2xl font-bold text-slate-800">
            Cafe Tidak Ditemukan
          </p>
          <p className="text-slate-500 mt-2 font-medium">
            Coba gunakan kata kunci lain atau reset filternya.
          </p>
        </div>
      ) : viewMode === "guest" ? (
        /* --- TAMPILAN GUEST (CARD 3 KOLOM) --- */
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in relative z-10">
          {filteredCafes.map((item) => (
            <div
              key={item.id}
              className="group relative w-full h-[480px] sm:h-[520px] rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/40"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>

              <div className="absolute top-6 left-6">
                <span className="bg-white/20 backdrop-blur-xl border border-white/30 text-white text-[10px] font-bold px-4 py-2 rounded-full">
                  {item.status}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 m-4 p-6 rounded-[2rem] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h2 className="text-lg lg:text-xl font-bold text-white leading-tight drop-shadow-md truncate">
                    {item.name}
                  </h2>

                  <span className="shrink-0 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                    ⭐ {item.rating}
                  </span>
                </div>

                <p className="text-white/80 text-xs mb-5 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Bagian Lokasi & Fasilitas (Rata Kiri) */}
                <div className="space-y-2 mb-6 text-[11px] lg:text-xs text-white/80 font-medium">
                  <div className="flex items-start gap-2">
                    {/* Lebar tetap w-16 agar titik dua sejajar */}
                    <span className="shrink-0 w-16 font-bold text-white/90 text-[9px] mt-0.5">
                      Lokasi
                    </span>
                    <span className="shrink-0 mt-0.5">:</span>
                    <span className="text-white">{item.location.city}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="shrink-0 w-16 font-bold text-white  text-[9px] mt-0.5">
                      Fasilitas
                    </span>
                    <span className="shrink-0 mt-0.5">:</span>
                    <span className="text-white">
                      {item.facilities.wifi ? "High-Speed WiFi" : "No WiFi"}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-white/90 hover:bg-white text-slate-900 font-bold text-sm py-3 rounded-xl transition-colors shadow-sm">
                  Detail Lokasi
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* --- TAMPILAN ADMIN (TABEL REAL GLASS) --- */
        <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-2xl rounded-[2.5rem] shadow-xl border border-white/80 overflow-hidden animate-fade-in relative z-10">
          <div className="overflow-x-auto p-2 sm:p-6">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200/60 text-slate-400 text-xs tracking-wider uppercase">
                  <th className="p-4 font-bold">No</th>
                  <th className="p-4 font-bold">Nama Cafe</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-center">Rating</th>
                  <th className="p-4 font-bold">Lokasi</th>
                  <th className="p-4 font-bold">Fasilitas Utama</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {filteredCafes.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/50 transition-colors text-sm text-slate-700"
                  >
                    <td className="p-4 font-medium text-slate-400">
                      {index + 1}
                    </td>
                    <td className="p-4 font-bold text-slate-800">
                      {item.name}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1.5 rounded-md text-[12px] font-bold${
                          item.status === "Buka"
                            ? "bg-green-100/70 text-green-700 border border-green-200/50"
                            : "bg-red-100/70 text-red-700 border border-red-200/50"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold text-amber-500">
                      ⭐ {item.rating}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-slate-500 text-xs">
                          {item.location.street}
                        </span>
                        <span className="font-bold text-slate-800">
                          {item.location.city}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {item.facilities.wifi && (
                          <span className="bg-blue-50/80 text-blue-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-blue-100">
                            WiFi
                          </span>
                        )}
                        <span className="bg-slate-100/80 text-slate-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-slate-200/50">
                          Parkir {item.facilities.parkingCapacity}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
