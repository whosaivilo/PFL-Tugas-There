import React, { useState } from "react";
import Modal from "../components/Modal";
import inventoryData from "../data/inventoryData.json";
import { BsSearch, BsPlus, BsFilter } from 'react-icons/bs';
import { FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { HiOutlineChevronDoubleRight, HiOutlineSelector } from "react-icons/hi";

export default function Inventory() {
  // 1. STATE MANAGEMENT (Dari Kodinganmu)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredMedicines = inventoryData.filter((med) => {
    return (
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.group.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="w-full flex flex-col p-2">
      
      {/* 2. HEADER HALAMAN (Gaya Figma) */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[24px] mb-1">
            <span className="font-bold text-gray-500">Inventory</span>
            <span className="mx-2 text-gray-400">›</span>
            {/* Angka total obat dinamis dari panjang array JSON */}
            <span className="font-bold text-gray-800">List of Medicines ({inventoryData.length})</span>
          </h2>
          <p className="text-[14px] font-medium text-gray-600">List of medicines available for sales.</p>
        </div>
        
        {/* Tombol Add New Item (Trigger Modal) */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#f0483e] text-white px-4 py-2 rounded text-[14px] font-medium hover:bg-red-600 transition shadow-sm"
        >
          <BsPlus className="text-xl" /> Add New Item
        </button>
      </div>

      {/* 3. FILTER & SEARCH BAR (Gaya Figma + Logika Kodinganmu) */}
      <div className="flex justify-between items-center mb-4">
        {/* Search */}
        <div className="relative w-[380px]">
          <input
            type="text"
            placeholder="Search Medicine Inventory.."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-300 text-[13px] font-medium py-2.5 pl-4 pr-10 rounded outline-none text-gray-700 focus:border-gray-400"
          />
          <BsSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-800 font-bold" />
        </div>
        
        {/* Select Group Filter */}
        <div className="flex items-center gap-4">
          <BsFilter className="text-2xl text-gray-600 cursor-pointer" />
          <div className="relative w-[200px]">
            <select className="w-full bg-white border border-gray-300 text-[14px] font-medium py-2 px-4 rounded outline-none text-gray-700 appearance-none cursor-pointer">
              <option>- Select Group -</option>
              <option value="Generic Medicine">Generic Medicine</option>
              <option value="Diabetes">Diabetes</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
          </div>
        </div>
      </div>

      {/* 4. TABEL INVENTORI (Gaya Figma + Map Data JSON) */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden mb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-white">
              <th className="py-4 px-6 text-[15px] font-medium text-gray-800">
                <div className="flex items-center gap-2">Medicine Name <HiOutlineSelector className="text-gray-400 text-lg cursor-pointer" /></div>
              </th>
              <th className="py-4 px-6 text-[15px] font-medium text-gray-800">
                <div className="flex items-center gap-2">Medicine ID <HiOutlineSelector className="text-gray-400 text-lg cursor-pointer" /></div>
              </th>
              <th className="py-4 px-6 text-[15px] font-medium text-gray-800">
                <div className="flex items-center gap-2">Group Name <HiOutlineSelector className="text-gray-400 text-lg cursor-pointer" /></div>
              </th>
              <th className="py-4 px-6 text-[15px] font-medium text-gray-800">
                <div className="flex items-center gap-2">Stock in Qty <HiOutlineSelector className="text-gray-400 text-lg cursor-pointer" /></div>
              </th>
              <th className="py-4 px-6 text-[15px] font-medium text-gray-800">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map((med, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-6 text-[14px] font-medium text-gray-700">{med.name}</td>
                  <td className="py-4 px-6 text-[14px] font-medium text-gray-600">{med.id}</td>
                  <td className="py-4 px-6 text-[14px] font-medium text-gray-600">{med.group}</td>
                  <td className="py-4 px-6 text-[14px] font-medium text-gray-600">{med.stock}</td>
                  <td className="py-4 px-6 text-[14px] font-medium text-gray-700 cursor-pointer hover:text-black">
                    <div className="flex items-center gap-1">
                      View Full Detail <HiOutlineChevronDoubleRight className="text-gray-400 text-xs" />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500 font-medium">
                  Tidak ada obat yang cocok dengan pencarian "{searchTerm}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 5. PAGINATION (BAGIAN BAWAH) */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-[14px] font-medium text-gray-600">Showing 1 - {filteredMedicines.length} results of {inventoryData.length}</p>
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition">
            <FiChevronLeft className="text-gray-400" />
          </button>
          <div className="text-[14px] font-medium text-gray-700 flex items-center gap-1 cursor-pointer">
            Page 01 <FiChevronDown className="text-gray-500" />
          </div>
          <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition">
            <FiChevronRight className="text-gray-800" />
          </button>
        </div>
      </div>

      {/* 6. MODAL TAMBAH OBAT (Dari Kodinganmu) */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Medicine to Inventory"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase mb-1">Medicine Name</label>
            <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-gray-400" placeholder="e.g. Paracetamol 500mg" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Medicine ID</label>
              <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-gray-400" placeholder="MED-XXXX" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Group</label>
              <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none appearance-none focus:ring-1 focus:ring-gray-400">
                <option value="">- Select Group -</option>
                <option value="Generic Medicine">Generic Medicine</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Hypertension">Hypertension</option>
                <option value="OTC Medicine">OTC Medicine</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Quantity</label>
              <input type="number" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-gray-400" placeholder="0" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Expiry Date</label>
              <input type="date" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-gray-400" />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition font-medium">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-[#f0483e] text-white rounded-md hover:bg-red-600 transition font-medium">Save Details</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}