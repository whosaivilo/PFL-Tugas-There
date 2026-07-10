import React, { useState, useEffect } from "react";
import { BsCapsule, BsClock, BsCartPlus, BsLaptop, BsPhone, BsGeoAlt, BsCalendarCheck, BsCloudUpload, BsFileEarmarkMedical } from "react-icons/bs";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";

export default function MemberResep() {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [file, setFile] = useState(null);
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
    if (!file) {
      toast.warning("Harap pilih foto resep terlebih dahulu!");
      return;
    }
    
    setLoading(true);
    
    try {
      // 1. Generate unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 2. Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('prescriptions')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 3. Get Public URL
      const { data: publicUrlData } = supabase.storage
        .from('prescriptions')
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      // 4. Insert into prescriptions table
      const { error: dbError } = await supabase
        .from("prescriptions")
        .insert([{ user_id: user.id, image_url: imageUrl, notes }]);
      
      if (dbError) throw dbError;

      toast.success("Resep berhasil diunggah dan sedang diverifikasi Admin!");
      setFile(null);
      setNotes("");
      
      // Reset input file manually
      document.getElementById('file-upload').value = "";
      
      fetchPrescriptions();
      
    } catch (error) {
      toast.error("Gagal mengirim resep: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <PageHeader 
        title="Resep"
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
              <label className="block text-sm font-semibold text-gray-700 mb-1">Pilih Foto Resep</label>
              <input 
                id="file-upload"
                type="file" 
                accept="image/*"
                required
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-teal-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
              />
              <p className="text-xs text-gray-500 mt-1">*Pilih file foto berformat .jpg, .png, dll dari perangkatmu.</p>
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
                    {item.notes && (
                      <p className="text-sm text-gray-600 mb-2 italic">
                        "{item.notes.split('\n[Ditolak:')[0]}"
                      </p>
                    )}
                    {item.status === "Rejected" && (item.reject_reason || (item.notes && item.notes.includes("[Ditolak:"))) && (
                      <div className="bg-red-50 p-3 rounded-lg border border-red-100 mb-3">
                        <p className="text-xs text-red-600 font-bold mb-1">Alasan Penolakan:</p>
                        <p className="text-xs text-red-500 font-medium">
                          {item.reject_reason || item.notes.split("[Ditolak: ")[1]?.replace("]", "") || item.notes.split("[Ditolak:")[1]?.replace("]", "")}
                        </p>
                      </div>
                    )}
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
