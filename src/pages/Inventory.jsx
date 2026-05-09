import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import inventoryData from "../data/inventoryData.json";
import { BsSearch, BsFilter } from 'react-icons/bs';

export default function Inventory() {
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
    <div className="p-6">
      <PageHeader
        title="Inventory List of Medicines (298)"
        description="List of medicines available for sales."
        actionButton={
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600"
          >
            + Add New Item
          </button>
        }
      />
      {/* 2. Fitur Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 mt-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama obat, ID, atau grup..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-600 text-sm">
          <BsFilter /> Filter Group
        </button>
      </div>

     {/* 3. Tabel Inventori */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-600 uppercase">Medicine Name</th>
              <th className="px-6 py-3 font-semibold text-gray-600 uppercase text-center">Medicine ID</th>
              <th className="px-6 py-3 font-semibold text-gray-600 uppercase">Group Name</th>
              <th className="px-6 py-3 font-semibold text-gray-600 uppercase text-center">Stock</th>
              <th className="px-6 py-3 font-semibold text-gray-600 uppercase text-center">Expiry Date</th>
              <th className="px-6 py-3 font-semibold text-gray-600 uppercase text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map((med, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{med.name}</td>
                  <td className="px-6 py-4 text-gray-500 text-center">{med.id}</td>
                  <td className="px-6 py-4 text-gray-600">{med.group}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800 text-center">{med.stock}</td>
                  <td className="px-6 py-4 text-center">
                    {/* Logika warna kadaluarsa: Merah jika sebelum Oktober 2026 */}
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      new Date(med.expiry) < new Date('2026-10-01') 
                      ? "bg-red-100 text-red-600" 
                      : "bg-green-100 text-green-600"
                    }`}>
                      {med.expiry}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-blue-600 font-semibold cursor-pointer hover:underline text-center">
                    Detail
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  Tidak ada obat yang cocok dengan pencarian "{searchTerm}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Modal Tambah Obat */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Medicine to Inventory"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Medicine Name</label>
            <input type="text" className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. Paracetamol 500mg" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Medicine ID</label>
              <input type="text" className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none" placeholder="MED-XXXX" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Group</label>
              <select className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none appearance-none">
                <option value="">- Select Group -</option>
                <option value="Generic Medicine">Generic Medicine</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Hypertension">Hypertension</option>
                <option value="OTC Medicine">OTC Medicine</option>
                <option value="Vitamins">Vitamins</option>
                <option value="First Aid">First Aid</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Quantity</label>
              <input type="number" className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none" placeholder="0" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Expiry Date</label>
              <input type="date" className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md transition font-bold">Save Details</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}