import React, { useState } from "react";
import PageHeader from "../components/PageHeader"; 
import Modal from "../components/Modal";
import Button from "../components/Button";
import Table from "../components/Table";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import inventoryData from "../data/inventoryData.json";
import { BsSearch, BsPlus, BsFilter } from 'react-icons/bs';
import { FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { HiOutlineChevronDoubleRight, HiOutlineSelector } from "react-icons/hi";

export default function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // 💡 1. Tambah state untuk menampung pilihan grup filter obat
  const [selectedGroup, setSelectedGroup] = useState("- Select Group -");
  
  // 💡 2. Jalankan logika filter gabungan (Search + Dropdown)
  const filteredMedicines = inventoryData.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.group.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDropdown = 
      selectedGroup === "- Select Group -" || selectedGroup === "" ||
      med.group === selectedGroup;

    return matchesSearch && matchesDropdown;
  });

  return (
    <div className="p-6 font-poppins">
      
      {/* SEKSI HEADER HALAMAN */}
      <PageHeader
        title={`List of Medicines (${inventoryData.length})`}
        description="List of medicines available for sales."
        actionButton={
          <Button type="dark" onClick={() => setIsModalOpen(true)}>
            <BsPlus className="text-xl" /> Add New Item
          </Button>
        }
      />

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row gap-4 my-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Medicine Inventory.."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm">
          <BsFilter className="text-lg text-gray-500" />
          <div className="w-[160px]">
            {/* 💡 3. Hubungkan SelectField ke state pilihan group */}
            <SelectField 
              options={["- Select Group -", "Generic Medicine", "Diabetes"]} 
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* TABEL INVENTORI */}
      <Table>
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
              <div className="flex items-center gap-2">Medicine Name </div>
            </th>
            <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
              <div className="flex items-center gap-2">Medicine ID </div>
            </th>
            <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
              <div className="flex items-center gap-2">Group Name</div>
            </th>
            <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
              <div className="flex items-center gap-2">Stock in Qty </div>
            </th>
            <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((med, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-semibold text-gray-800">{med.name}</td>
                <td className="py-4 px-6 font-medium text-gray-500">{med.id}</td>
                <td className="py-4 px-6 text-gray-600">{med.group}</td>
                <td className="py-4 px-6 text-gray-600">{med.stock}</td>
                <td className="py-4 px-6 text-blue-600 font-bold cursor-pointer hover:underline">
                  <div className="flex items-center gap-1">
                    View Full Detail <HiOutlineChevronDoubleRight className="text-gray-400 text-xs" />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                Tidak ada obat yang cocok dengan filter atau pencarian Anda.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* PAGINATION */}
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

      {/* MODAL INPUT */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Medicine to Inventory">
        <form className="space-y-4">
          <InputField label="Medicine Name" placeholder="e.g. Paracetamol 500mg" />
          
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Medicine ID" placeholder="MED-XXXX" />
            <SelectField label="Group" options={["- Select Group -", "Generic Medicine", "Diabetes", "Hypertension", "OTC Medicine"]} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField label="Quantity" type="number" placeholder="0" />
            <InputField label="Expiry Date" type="date" />
          </div>

          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition font-medium">Cancel</button>
            <Button type="dark">
              Save Details
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}