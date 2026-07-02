import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import Badge from "../components/Badge";
import Button from "../components/Button";
import { supabase } from "../lib/supabase";

export default function PrescriptionsAdmin() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from("prescriptions")
      .update({ status: newStatus })
      .eq("id", id);
      
    if (error) {
      alert("Gagal mengupdate status: " + error.message);
    } else {
      fetchPrescriptions();
    }
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
                    <Badge variant={
                      item.status === "Pending" ? "warning" : 
                      item.status === "Processed" ? "success" : "danger"
                    }>
                      {item.status}
                    </Badge>
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
                          onClick={() => updateStatus(item.id, "Rejected")}
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
    </div>
  );
}
