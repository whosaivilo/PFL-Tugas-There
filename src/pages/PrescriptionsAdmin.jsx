import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import { supabase } from "../lib/supabase";

export default function PrescriptionsAdmin() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Reject Modal State
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const fetchPrescriptions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("prescriptions")
      .select(`
        *,
        profiles (
          full_name
        )
      `)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPrescriptions(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const updateStatus = async (id, newStatus, reason = null) => {
    const updateData = { status: newStatus };
    if (reason) {
      updateData.reject_reason = reason;
    }

    const { error } = await supabase
      .from("prescriptions")
      .update(updateData)
      .eq("id", id);
      
    if (error) {
      // Jika kolom reject_reason belum ada di Supabase, fallback dengan menempelkan di notes
      if (error.message.includes("reject_reason")) {
         const target = prescriptions.find(p => p.id === id);
         await supabase
          .from("prescriptions")
          .update({ 
            status: newStatus,
            notes: target.notes ? `${target.notes} \n[Ditolak: ${reason}]` : `[Ditolak: ${reason}]`
          })
          .eq("id", id);
          fetchPrescriptions();
      } else {
        alert("Gagal mengupdate status: " + error.message);
      }
    } else {
      fetchPrescriptions();
    }
  };

  const handleOpenRejectModal = (id) => {
    setSelectedPrescriptionId(id);
    setRejectReason("");
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = async (e) => {
    e.preventDefault();
    if (!rejectReason.trim()) {
      alert("Alasan penolakan wajib diisi.");
      return;
    }
    await updateStatus(selectedPrescriptionId, "Rejected", rejectReason);
    setIsRejectModalOpen(false);
  };

  return (
    <div className="font-poppins animate-in fade-in duration-500 p-6">
      <PageHeader 
        title="Resep Masuk"
        description="Kelola resep yang diunggah oleh pasien. Anda dapat menerima atau menolak resep yang masuk."
      />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-6">
        <Table>
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Tanggal</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Pasien</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Catatan</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Foto Resep</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500 font-medium text-sm">
                  Memuat data resep...
                </td>
              </tr>
            ) : prescriptions.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500 font-medium text-sm">
                  Belum ada resep masuk dari pasien.
                </td>
              </tr>
            ) : (
              prescriptions.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-bold text-gray-800">{item.profiles?.full_name || "Unknown"}</p>
                    <p className="text-xs text-gray-500">{item.profiles?.phone || "-"}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-600 truncate max-w-[200px]" title={item.notes}>
                      {item.notes || "-"}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a 
                      href={item.image_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-teal-600 font-bold hover:underline"
                    >
                      Lihat Foto
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <Badge variant={
                        item.status === "Pending" ? "warning" : 
                        item.status === "Processed" ? "success" : "danger"
                      }>
                        {item.status}
                      </Badge>
                      {item.status === "Rejected" && (item.reject_reason || (item.notes && item.notes.includes("[Ditolak:"))) && (
                        <span className="text-[10px] text-red-500 font-medium leading-tight max-w-[120px] truncate" title={item.reject_reason || item.notes.split("[Ditolak:")[1]?.replace("]", "")}>
                          Alasan: {item.reject_reason || item.notes.split("[Ditolak:")[1]?.replace("]", "")}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {item.status === "Pending" && (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => updateStatus(item.id, "Processed")}
                          className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg hover:bg-emerald-200 transition"
                        >
                          Terima
                        </button>
                        <button 
                          onClick={() => handleOpenRejectModal(item.id)}
                          className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-lg hover:bg-red-200 transition"
                        >
                          Tolak
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Modal Alasan Penolakan */}
      <Modal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)} title="Tolak Resep">
        <form onSubmit={handleConfirmReject} className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-4 text-sm text-red-800">
            Anda akan menolak resep pasien. Pasien akan melihat alasan penolakan ini di aplikasinya.
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Alasan Penolakan</label>
            <textarea 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500 resize-none text-sm" 
              rows="3" 
              placeholder="Contoh: Resep tidak terbaca jelas atau obat tidak tersedia."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => setIsRejectModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition font-medium text-sm">Batal</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-bold text-sm">Konfirmasi Penolakan</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
