import React, { useState, useEffect } from "react";
import { BsCapsule, BsClock, BsCartPlus, BsLaptop, BsPhone, BsGeoAlt, BsCalendarCheck, BsCloudUpload, BsFileEarmarkMedical } from "react-icons/bs";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";

export default function MemberResep() {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const fetchPrescriptions = async () => {
    if (!user) return;
    setIsFetching(true);
    const { data, error } = await supabase
      .from("prescriptions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setPrescriptions(data);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) {
      alert("Masukkan link gambar resep!");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("prescriptions")
      .insert([{ user_id: user.id, image_url: imageUrl, notes }]);
    
    setLoading(false);
    if (error) {
      alert("Gagal mengirim resep: " + error.message);
    } else {
      alert("Resep berhasil dikirim dan sedang diverifikasi Admin!");
      setImageUrl("");
      setNotes("");
      fetchPrescriptions();
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <PageHeader 
        title="Resep & Pengingat"
        description="Unggah resep doktermu dan kami akan menyiapkannya untukmu."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* ── FORM UNGGAH RESEP ── */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-6">
            <BsCloudUpload className="text-teal-600" /> Unggah Resep Baru
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">URL Gambar Resep</label>
              <input 
                type="url" 
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/resep.jpg"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-teal-500 transition"
              />
              <p className="text-xs text-gray-500 mt-1">*Masukkan link foto resep doktermu.</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Catatan (Opsional)</label>
              <textarea 
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Misal: Tolong dikirim secepatnya ya, untuk pemakaian besok."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-teal-500 transition resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 transition shadow-lg shadow-teal-500/30 disabled:bg-gray-400 disabled:shadow-none"
            >
              {loading ? "Mengirim..." : "Kirim Resep"}
            </button>
          </form>
        </div>

        {/* ── RIWAYAT RESEP ── */}
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm h-full">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-6">
              <BsFileEarmarkMedical className="text-gray-500" /> Riwayat Resep Anda
            </h3>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {isFetching ? (
                <p className="text-sm text-gray-500 text-center py-4">Memuat riwayat...</p>
              ) : prescriptions.length === 0 ? (
                <p className="text-sm text-gray-500 italic text-center py-4">Belum ada riwayat resep.</p>
              ) : (
                prescriptions.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        item.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                        item.status === "Processed" ? "bg-emerald-100 text-emerald-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-xs text-gray-400 font-semibold">
                        {new Date(item.created_at).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                    {item.notes && <p className="text-sm text-gray-600 mb-2 italic">"{item.notes}"</p>}
                    <a href={item.image_url} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-600 font-bold hover:underline break-all">
                      Lihat Foto Resep
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
