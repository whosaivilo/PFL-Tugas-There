import React, { useState } from "react";
import { BsPersonVcard, BsTelephone, BsEnvelope, BsGeoAlt, BsGenderAmbiguous, BsCalendarDate, BsCheckCircleFill, BsToggleOn, BsPencil } from "react-icons/bs";
import { toast } from "sonner";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";

export default function MemberProfile() {
  const { profile, refreshProfile } = useAuth();
  
  // Modal state
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    gender: "",
    birth_date: ""
  });

  if (!profile) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
  };

  const handleEditClick = () => {
    setFormData({
      phone: profile.phone || "",
      address: profile.address || "",
      gender: profile.gender || "",
      birth_date: profile.birth_date || ""
    });
    setIsEditing(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          phone: formData.phone,
          address: formData.address,
          gender: formData.gender,
          birth_date: formData.birth_date
        })
        .eq("id", profile.id);
        
      if (error) throw error;
      
      toast.success("Profil berhasil diperbarui!");
      await refreshProfile();
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memperbarui profil: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <PageHeader 
          title="Profil Pribadi" 
          description="Kelola informasi pribadi dan preferensi komunikasi kamu."
        />
        <Button variant="outline" className="flex items-center gap-2 w-fit" onClick={handleEditClick}>
          <BsPencil /> Edit Profil
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* ── LEFT COLUMN: AVATAR & BASIC INFO ── */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 mx-auto border-4 border-teal-50 rounded-full flex items-center justify-center overflow-hidden bg-teal-100 text-teal-700 text-3xl font-bold">
                {profile.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.full_name || "Avatar"} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  (profile.full_name || profile.username || "US").substring(0, 2).toUpperCase()
                )}
              </div>
              <div className="absolute bottom-0 right-0 bg-teal-500 text-white p-1.5 rounded-full border-2 border-white">
                <BsCheckCircleFill className="text-xs" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">{profile.full_name || profile.username}</h2>
            <p className="text-sm font-medium text-gray-500 mb-4">@{profile.username}</p>
            
            <Badge variant="info">{profile.member_level || "Silver"} Member</Badge>
            
            <hr className="my-6 border-gray-100" />
            
            <div className="text-left space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                  <BsPersonVcard />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold">ID Member</p>
                  <p className="text-sm font-bold text-gray-800">{profile.id.substring(0,8)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                  <BsCalendarDate />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold">Bergabung Sejak</p>
                  <p className="text-sm font-bold text-gray-800">{formatDate(profile.created_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: DETAILS ── */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          
          {/* Biodata & Kontak */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm relative">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Informasi Pribadi & Kontak</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
                  <BsTelephone /> Nomor HP
                </p>
                <p className="text-[15px] font-semibold text-gray-800">{profile.phone || "-"}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
                  <BsEnvelope /> Email
                </p>
                <p className="text-[15px] font-semibold text-gray-800">{profile.email || "-"}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
                  <BsGenderAmbiguous /> Jenis Kelamin
                </p>
                <p className="text-[15px] font-semibold text-gray-800">
                  {profile.gender === "L" ? "Laki-laki" : profile.gender === "P" ? "Perempuan" : "-"}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
                  <BsCalendarDate /> Tanggal Lahir
                </p>
                <p className="text-[15px] font-semibold text-gray-800">{formatDate(profile.birth_date)}</p>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
                  <BsGeoAlt /> Alamat
                </p>
                <p className="text-[15px] font-semibold text-gray-800">
                  {profile.address || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Pengaturan Preferensi */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Preferensi & Notifikasi</h3>
            
            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                <div>
                  <p className="text-[14px] font-bold text-gray-800">Email Newsletter</p>
                  <p className="text-xs text-gray-500 mt-0.5">Terima info promo & artikel kesehatan via Email.</p>
                </div>
                <BsToggleOn className="text-3xl text-teal-500 cursor-pointer" />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                <div>
                  <p className="text-[14px] font-bold text-gray-800">SMS / WhatsApp Promo</p>
                  <p className="text-xs text-gray-500 mt-0.5">Terima notifikasi diskon kilat langsung ke HP kamu.</p>
                </div>
                <BsToggleOn className="text-3xl text-gray-300 cursor-pointer" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── MODAL EDIT PROFIL ── */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Profil">
        <form onSubmit={handleSaveProfile} className="space-y-5">
          <InputField 
            label="Nomor Handphone" 
            placeholder="081234567890" 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700">Jenis Kelamin</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="gender" value="L" checked={formData.gender === "L"} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="text-teal-600 focus:ring-teal-500" />
                Laki-laki
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="gender" value="P" checked={formData.gender === "P"} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="text-teal-600 focus:ring-teal-500" />
                Perempuan
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Tanggal Lahir</label>
            <input 
              type="date" 
              value={formData.birth_date}
              onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Alamat Lengkap (Untuk Pengiriman)</label>
            <textarea 
              rows="3"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition-all"
              placeholder="Jl. Merdeka No. 123, Kelurahan, Kecamatan, Kota..."
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Batal</Button>
            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving ? "Menyimpan..." : "Simpan Profil"}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
