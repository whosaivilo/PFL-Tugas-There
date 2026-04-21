import { useState } from "react";
import "./tailwind.css";
import cafeData from "./cafeData.json";
import CafeCard from "./CafeCard";   
import CafeTable from "./CafeTable"; 

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

    const matchesWifi = dataForm.selectedWifi
      ? cafe.facilities.wifi.toString() === dataForm.selectedWifi
      : true;
    

    return matchesSearch && matchesStatus && matchesWifi;
  });

  const allStatuses = [...new Set(cafeData.map((cafe) => cafe.status))];

  return (
    <div className="relative min-h-screen bg-slate-50 p-6 md:p-12 lg:p-16 overflow-hidden z-0 text-slate-800">
      
      
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-200/40 blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-orange-200/30 blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full bg-blue-200/20 blur-[100px] -z-10 pointer-events-none"></div>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 text-center relative z-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
          Pekanbaru <span className="text-amber-600">Cafe Directory</span>
        </h1>
        <p className="text-sm md:text-lg text-slate-500 mt-2 font-medium">
          Cari cafe buat nongki dan nugasmu disini!
        </p>
      </div>

      
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
            Guest View (Card)
          </button>
          <button
            onClick={() => setViewMode("admin")}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-500 ${
              viewMode === "admin"
                ? "bg-slate-800/90 backdrop-blur-md text-white shadow-lg border border-slate-700/50"
                : "text-slate-500 hover:bg-white/60 hover:text-slate-900"
            }`}
          >
            Admin View (Table)
          </button>
        </div>
      </div>

      {/* Search & Filter */}
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


      {filteredCafes.length === 0 ? (
        <div className="max-w-7xl mx-auto text-center py-20 bg-white/60 backdrop-blur-2xl rounded-[3rem] border border-white/80 shadow-sm relative z-10">
          <p className="text-4xl mb-4">☕</p>
          <p className="text-2xl font-bold text-slate-800">Cafe Tidak Ditemukan</p>
          <p className="text-slate-500 mt-2 font-medium">
            Coba gunakan kata kunci lain atau reset filternya.
          </p>
        </div>
      ) : viewMode === "guest" ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in relative z-10">
          {filteredCafes.map((item) => (
            <CafeCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <CafeTable cafes={filteredCafes} />
      )}
    </div>
  );
}