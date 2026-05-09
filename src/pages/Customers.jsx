import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { BsSearch, BsFilter } from "react-icons/bs";
import Modal from "../components/Modal";
import patientsData from "../data/patientsData.json";

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- LOGIKA GENERATE ID OTOMATIS ---
  // 1. Ambil ID terakhir dari data JSON
  const lastPatient = patientsData[patientsData.length - 1];
  const lastId = lastPatient ? lastPatient.id : "PTN-000";

  // 2. Ambil angka setelah tanda '-' (misal: "030")
  const lastNumber = parseInt(lastId.split("-")[1]);

  // 3. Tambah 1 dan format kembali menjadi "PTN-XXX"
  const nextId = `PTN-${String(lastNumber + 1).padStart(3, "0")}`;

  // Filter pencarian
  const filteredPatients = patientsData.filter((patient) => {
    return (
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
    );
  });

  return (
    <div className="p-6">
      <PageHeader
        title="Data Pasien (Identify)"
        description="Kelola database pasien untuk pelayanan yang lebih personal."
        actionButton={
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition shadow-sm"
          >
            + Tambah Pasien Baru
          </button>
        }
      />

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama pasien, ID, atau no. telepon..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-600 text-sm">
          <BsFilter /> Filter Kategori
        </button>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">ID Pasien</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Nama Pasien</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-center">Kontak</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-500">{patient.id}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{patient.name}</td>
                  <td className="px-6 py-4 text-gray-600 text-center">{patient.phone}</td>
                  <td className="px-6 py-4 text-blue-600 font-bold cursor-pointer hover:underline text-center">Detail CRM</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-gray-400">Data tidak ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM DENGAN ID OTOMATIS */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tambah Pasien Baru"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">ID Pasien (Otomatis)</label>
              <input
                type="text"
                value={nextId}
                readOnly
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg outline-none text-sm font-bold text-slate-600 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Segmen</label>
              <select className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none text-sm">
                <option value="Umum">Umum</option>
                <option value="Kronis">Kronis</option>
                <option value="Ibu & Anak">Ibu & Anak</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nama Lengkap</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nomor Telepon</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="08XX-XXXX-XXXX"
            />
          </div>

          <div className="flex gap-3 mt-8">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border rounded-lg text-gray-400 text-sm">Batal</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700">Simpan Pasien</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}