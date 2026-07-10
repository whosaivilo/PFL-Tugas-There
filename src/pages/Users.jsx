import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { BsSearch, BsFilter, BsPersonBadge, BsPencilSquare, BsTrash } from "react-icons/bs";
import { usersAPI } from "../services/usersAPI";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function Users() {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [selectedRole, setSelectedRole] = useState(() => {
    if (location.pathname.includes("members")) return "Member";
    if (location.pathname.includes("admins")) return "Admin";
    return "- Semua Peran -";
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: "",
    username: "",
    password: "",
    role: "member"
  });
  const [editingUser, setEditingUser] = useState({
    id: "",
    name: "",
    username: "",
    password: "",
    role: "member",
    status: "Active"
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (location.pathname.includes("members")) setSelectedRole("Member");
    else if (location.pathname.includes("admins")) setSelectedRole("Admin");
    else setSelectedRole("- Semua Peran -");
  }, [location.pathname]);

  const fetchUsers = async () => {
    setLoading(true);
    const result = await usersAPI.getAllUsers();
    if (result.success) {
      setUsers(result.data);
    } else {
      setErrorMsg(result.error);
    }
    setLoading(false);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await usersAPI.registerUser(newUserForm);
    if (result.success) {
      setIsModalOpen(false);
      setNewUserForm({ name: "", username: "", password: "", role: "member" });
      fetchUsers(); // Refresh data table
    } else {
      alert(result.error);
    }
    setIsSubmitting(false);
  };

  const handleDeleteUser = async (id, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus pengguna ${name}?`)) {
      const result = await usersAPI.deleteUser(id);
      if (result.success) {
        fetchUsers();
      } else {
        alert(result.error);
      }
    }
  };

  const openEditModal = (user) => {
    setEditingUser({
      id: user.id,
      name: user.name || "",
      username: user.username || "",
      password: user.password || "",
      role: user.role || "member",
      status: user.status || "Active"
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Jangan kirim ID di payload karena id dipakai di parameter URL
    const { id, ...payloadData } = editingUser;
    
    const result = await usersAPI.updateUser(id, payloadData);
    if (result.success) {
      setIsEditModalOpen(false);
      fetchUsers();
    } else {
      alert(result.error);
    }
    setIsSubmitting(false);
  };

  // Filter data berdasarkan search dan role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole =
      selectedRole === "- Semua Peran -" || 
      selectedRole === "" ||
      (user.role && user.role.toLowerCase() === selectedRole.toLowerCase());

    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 font-poppins">
      <PageHeader
        title="Data Pengguna (Users)"
        description="Kelola hak akses dan akun pengguna yang terdaftar di sistem."
        actionButton={
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition shadow-sm">
                + Tambah Pengguna Baru
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Tambah Pengguna Baru</DialogTitle>
                <DialogDescription>
                  Tambahkan akun admin atau member baru langsung dari sini.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleAddUser} className="space-y-4 mt-2">
                <InputField 
                  label="Nama Lengkap" 
                  placeholder="Contoh: Budi Santoso" 
                  required
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({...newUserForm, name: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField 
                    label="Username" 
                    placeholder="Contoh: budi123" 
                    required
                    value={newUserForm.username}
                    onChange={(e) => setNewUserForm({...newUserForm, username: e.target.value})}
                  />
                  <SelectField 
                    label="Peran (Role)" 
                    options={["member", "admin"]} 
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({...newUserForm, role: e.target.value})}
                  />
                </div>
                <InputField 
                  label="Password" 
                  placeholder="Minimal 6 karakter" 
                  type="password"
                  required
                  value={newUserForm.password}
                  onChange={(e) => setNewUserForm({...newUserForm, password: e.target.value})}
                />

                <div className="flex gap-3 mt-8">
                  <DialogClose asChild>
                    <button type="button" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 font-medium text-sm hover:bg-gray-50 transition">
                      Batal
                    </button>
                  </DialogClose>
                  <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition shadow-sm disabled:bg-blue-400">
                    {isSubmitting ? "Menyimpan..." : "Simpan Pengguna"}
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Error Message */}
      {errorMsg && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm font-medium">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama atau username pengguna..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm">
          <BsFilter className="text-lg text-gray-500" />
          <div className="w-[160px]">
            <SelectField 
              options={["- Semua Peran -", "Admin", "Member"]} 
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* MODAL EDIT PENGGUNA */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Pengguna</DialogTitle>
            <DialogDescription>
              Perbarui informasi pengguna di sini.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4 mt-2">
            <InputField 
              label="Nama Lengkap" 
              required
              value={editingUser.name}
              onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField 
                label="Username" 
                required
                value={editingUser.username}
                onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
              />
              <SelectField 
                label="Peran (Role)" 
                options={["member", "admin"]} 
                value={editingUser.role}
                onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField 
                label="Password" 
                required
                value={editingUser.password}
                onChange={(e) => setEditingUser({...editingUser, password: e.target.value})}
              />
              <SelectField 
                label="Status" 
                options={["Active", "Inactive"]} 
                value={editingUser.status}
                onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
              />
            </div>

            <div className="flex gap-3 mt-8">
              <DialogClose asChild>
                <button type="button" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 font-medium text-sm hover:bg-gray-50 transition">
                  Batal
                </button>
              </DialogClose>
              <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition shadow-sm disabled:bg-blue-400">
                {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* TABEL DATA PENGGUNA */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-left">Nama Pengguna</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-left">Username</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-center">Peran (Role)</th>
              {selectedRole === "Member" && (
                <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-center">Poin</th>
              )}
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-center">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {loading ? (
              <tr>
                <td colSpan={selectedRole === "Member" ? "6" : "5"} className="px-6 py-10 text-center text-gray-500 font-medium">
                  Sedang memuat data dari Supabase...
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : <BsPersonBadge />}
                      </div>
                      {user.name || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-500">@{user.username}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-teal-100 text-teal-700'
                    }`}>
                      {user.role ? user.role.toUpperCase() : "MEMBER"}
                    </span>
                  </td>
                  {selectedRole === "Member" && (
                    <td className="px-6 py-4 text-center font-bold text-orange-500">
                      {user.loyalty_points || 0} Pts
                    </td>
                  )}
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status || "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                        onClick={() => openEditModal(user)}
                        className="text-gray-400 hover:text-blue-600 transition" 
                        title="Edit User"
                      >
                        <BsPencilSquare className="text-lg" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id, user.name || user.username)}
                        className="text-gray-400 hover:text-red-600 transition" 
                        title="Hapus User"
                      >
                        <BsTrash className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-400">Data pengguna tidak ditemukan.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
