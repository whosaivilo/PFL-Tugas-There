import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader"; 
import Modal from "../components/Modal";
import Button from "../components/Button";
import Table from "../components/Table";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { BsSearch, BsPlus, BsFilter, BsPencil, BsTrash } from 'react-icons/bs';
import { FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { toast } from "sonner";
import { supabase } from "../lib/supabase"; // Import Supabase Client

export default function Inventory() {
  const [medicines, setMedicines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("- Select Group -");
  const [isLoading, setIsLoading] = useState(true);
  
  const [formState, setFormState] = useState({
    id: "",
    name: "",
    group: "- Select Group -",
    stock: "",
    price: "",
    expiryDate: "",
    imageUrl: ""
  });

  // 1. Load data from Supabase on mount
  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      toast.error("Gagal mengambil data dari Supabase!");
      console.error(error);
    } else if (data) {
      // Mapping kolom supabase ke state lokal
      const mappedData = data.map(med => ({
        id: med.id,
        name: med.name,
        group: med.group_name, // kategori di db = group_name di state lokal
        stock: med.stock,
        price: med.price,
        expiryDate: med.expiry_date,
        imageUrl: med.image_url
      }));
      setMedicines(mappedData);
    }
    setIsLoading(false);
  };

  // Filter Logic
  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch =
      med.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.group?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDropdown = 
      selectedGroup === "- Select Group -" || selectedGroup === "" ||
      med.group === selectedGroup;

    return matchesSearch && matchesDropdown;
  });

  const generateNewId = () => {
    if (medicines.length === 0) return "MED-001";
    const ids = medicines.map(m => parseInt(m.id.replace("MED-", "")) || 0);
    const maxId = Math.max(...ids);
    return `MED-${String(maxId + 1).padStart(3, "0")}`;
  };

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setFormState({
      id: generateNewId(),
      name: "",
      group: "- Select Group -",
      stock: "",
      price: "",
      expiryDate: "",
      imageUrl: ""
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (med) => {
    setIsEditMode(true);
    setFormState({
      ...med,
      stock: "" // Mulai dengan kosong untuk field tambahan stok
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah kamu yakin ingin menghapus obat ini dari inventori?")) {
      const { error } = await supabase
        .from('medicines')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error("Gagal menghapus obat!");
        console.error(error);
      } else {
        setMedicines(prev => prev.filter(m => m.id !== id));
        toast.success("Obat berhasil dihapus!");
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formState.name || formState.group === "- Select Group -") {
      toast.error("Mohon lengkapi nama obat dan grupnya!");
      return;
    }

    if (isEditMode) {
      // Cari obat lama untuk mengetahui stok sebelumnya
      const oldMed = medicines.find(m => m.id === formState.id);
      const additionalStock = parseInt(formState.stock) || 0;
      const newStock = (parseInt(oldMed.stock) || 0) + additionalStock;

      const { error } = await supabase
        .from('medicines')
        .update({
          name: formState.name,
          group_name: formState.group,
          stock: newStock,
          price: parseInt(formState.price) || oldMed.price,
          expiry_date: formState.expiryDate || oldMed.expiryDate,
          image_url: formState.imageUrl || oldMed.imageUrl
        })
        .eq('id', formState.id);

      if (error) {
        toast.error("Gagal memperbarui stok obat!");
        console.error(error);
      } else {
        setMedicines(prev => prev.map(m => 
          m.id === formState.id 
            ? { ...m, name: formState.name, group: formState.group, stock: newStock, price: formState.price || m.price, expiryDate: formState.expiryDate || m.expiryDate, imageUrl: formState.imageUrl || m.imageUrl } 
            : m
        ));
        toast.success(`Stok ${formState.name} berhasil diperbarui!`);
      }
    } else {
      // ADD NEW MODE
      const newStock = parseInt(formState.stock) || 0;
      const newPrice = parseInt(formState.price) || 0;

      const { error } = await supabase
        .from('medicines')
        .insert([{
          id: formState.id,
          name: formState.name,
          group_name: formState.group,
          stock: newStock,
          price: newPrice,
          expiry_date: formState.expiryDate || null,
          image_url: formState.imageUrl || null
        }]);

      if (error) {
        toast.error("Gagal menambahkan obat baru!");
        console.error(error);
      } else {
        setMedicines(prev => [...prev, { ...formState, stock: newStock, price: newPrice }]);
        toast.success(`${formState.name} berhasil ditambahkan!`);
      }
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 font-poppins animate-in fade-in duration-500">
      
      <PageHeader
        title={`List of Medicines (${filteredMedicines.length})`}
        description="List of medicines available for sales."
        actionButton={
          <Button type="dark" onClick={handleOpenAddModal}>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
          />
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm">
          <BsFilter className="text-lg text-gray-500" />
          <div className="w-[160px]">
            <SelectField 
              options={["- Select Group -", "Generic Medicine", "Diabetes", "Hypertension", "Suplemen & Vitamin", "Ibu & Bayi"]} 
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* TABEL INVENTORI */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Medicine Name</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Medicine ID</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Group Name</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Stock</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Price (Rp)</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500 font-medium">
                  Memuat data dari database...
                </td>
              </tr>
            ) : filteredMedicines.length > 0 ? (
              filteredMedicines.map((med) => (
                <tr key={med.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-gray-800">
                    <div className="flex items-center gap-3">
                      {med.imageUrl && (
                        <img src={med.imageUrl} alt={med.name} className="w-10 h-10 rounded-md object-cover border border-gray-200" />
                      )}
                      <div>
                        {med.name}
                        <div className="text-xs text-gray-400 font-normal">Exp: {med.expiryDate || "-"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-500">{med.id}</td>
                  <td className="py-4 px-6 text-gray-600">{med.group}</td>
                  <td className="py-4 px-6 text-gray-800 font-semibold">{med.stock}</td>
                  <td className="py-4 px-6 text-orange-600 font-bold">{med.price ? med.price.toLocaleString("id-ID") : "-"}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                        onClick={() => handleOpenEditModal(med)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white transition"
                        title="Edit Stok & Obat"
                      >
                        <BsPencil />
                      </button>
                      <button 
                        onClick={() => handleDelete(med.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition"
                        title="Hapus Obat"
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-400 font-medium">
                  Tidak ada obat yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* MODAL INPUT & EDIT */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditMode ? "Edit Medicine" : "Add New Medicine"}>
        <form onSubmit={handleSave} className="space-y-4">
          <InputField 
            label="Medicine Name" 
            placeholder="e.g. Paracetamol 500mg" 
            value={formState.name}
            onChange={(e) => setFormState({...formState, name: e.target.value})}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <InputField 
              label="Medicine ID" 
              placeholder="MED-XXXX" 
              value={formState.id}
              readOnly={true}
            />
            <SelectField 
              label="Group" 
              options={["- Select Group -", "Generic Medicine", "Diabetes", "Hypertension", "OTC Medicine", "Suplemen & Vitamin", "Ibu & Bayi", "Alat Kesehatan", "Batuk & Flu", "P3K & Antiseptik"]} 
              value={formState.group}
              onChange={(e) => setFormState({...formState, group: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField 
              label={isEditMode ? "Tambahan Stok (+)" : "Initial Stock"} 
              type="number" 
              placeholder="0" 
              value={formState.stock}
              onChange={(e) => setFormState({...formState, stock: e.target.value})}
            />
            <InputField 
              label="Expiry Date" 
              type="date" 
              value={formState.expiryDate}
              onChange={(e) => setFormState({...formState, expiryDate: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField 
              label="Harga (Rp)" 
              type="number" 
              placeholder="Contoh: 15000" 
              value={formState.price}
              onChange={(e) => setFormState({...formState, price: e.target.value})}
            />
            <InputField 
              label="URL Gambar (Opsional)" 
              type="text" 
              placeholder="https://..." 
              value={formState.imageUrl}
              onChange={(e) => setFormState({...formState, imageUrl: e.target.value})}
            />
          </div>

          {isEditMode && (
            <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-100">
              <strong>Info:</strong> Stok lama tidak akan tertimpa. Angka yang Anda masukkan akan <strong>ditambahkan</strong> ke stok yang sudah ada. Harga dan Gambar baru juga akan menimpa data lama.
            </div>
          )}

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