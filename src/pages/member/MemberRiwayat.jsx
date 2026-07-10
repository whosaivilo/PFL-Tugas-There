import React, { useState, useEffect } from "react";
import { BsBagCheck, BsChatDots, BsHeadset, BsExclamationTriangle, BsStarFill, BsStar, BsChatLeftText } from "react-icons/bs";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";

export default function MemberRiwayat() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("transaksi");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Review Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        created_at,
        total_amount,
        payment_method,
        status,
        rating,
        feedback_text,
        order_items (
          quantity,
          medicines (
            name
          )
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil riwayat pesanan:", error);
    } else if (data) {
      setOrders(data);
    }
    setIsLoading(false);
  };

  const openReviewModal = (order) => {
    setSelectedOrder(order);
    setRating(5);
    setFeedback("");
    setReviewModalOpen(true);
  };

  const submitReview = async () => {
    if (!selectedOrder) return;
    if (!feedback.trim()) {
      alert("Mohon isi teks ulasan.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase
      .from("orders")
      .update({
        rating: rating,
        feedback_text: feedback
      })
      .eq("id", selectedOrder.id);

    setIsSubmitting(false);

    if (error) {
      console.error(error);
      alert("Gagal mengirim ulasan.");
    } else {
      alert("Terima kasih atas ulasanmu!");
      setReviewModalOpen(false);
      fetchOrders(); // Refresh data
    }
  };

  // Mock data for interactions tab (since we haven't implemented it in DB yet)
  const dummyInteractions = {
    chatHistory: ["Konsultasi Vitamin Anak", "Menanyakan jadwal buka klinik"],
    supportTickets: ["Kendala login di device baru"],
    complaints: []
  };

  if (!user) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Riwayat Aktivitas"
        description="Pantau riwayat pembelanjaan dan berikan ulasan atas transaksimu."
      />
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        {/* ── TABS ── */}
        <div className="p-6 md:px-8 md:pt-8 md:pb-6 border-b border-gray-100">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("transaksi")}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === "transaksi" 
                  ? "bg-teal-600 text-white shadow-md shadow-teal-200" 
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Transaksi Belanja
            </button>
            <button
              onClick={() => setActiveTab("interaksi")}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === "interaksi" 
                  ? "bg-teal-600 text-white shadow-md shadow-teal-200" 
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Interaksi & Bantuan
            </button>
          </div>
        </div>

        {/* ── CONTENT: TRANSAKSI ── */}
        {activeTab === "transaksi" && (
          <div className="p-6">
            <Table>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">ID Transaksi & Tanggal</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Detail Obat</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Total Pembayaran</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Status</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Ulasan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium text-sm">
                      Memuat riwayat transaksi...
                    </td>
                  </tr>
                ) : orders.length > 0 ? (
                  orders.map((trx) => (
                    <tr key={trx.id} className="hover:bg-gray-50/50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                            <BsBagCheck />
                          </div>
                          <div>
                            <div>{trx.id}</div>
                            <div className="text-xs text-gray-400 font-normal">
                              {new Date(trx.created_at).toLocaleDateString("id-ID")}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-600">
                        <ul className="list-disc pl-4 text-xs text-gray-500 space-y-1">
                          {trx.order_items?.map((item, i) => (
                            <li key={i}>{item.quantity}x {item.medicines?.name}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">
                        Rp {(trx.total_amount || 0).toLocaleString("id-ID")}
                        <div className="text-[10px] text-gray-400 font-normal mt-1">{trx.payment_method}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={trx.status === "completed" ? "success" : "warning"}>
                          {trx.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {trx.rating ? (
                          <div className="flex items-center gap-2">
                            <div className="flex text-orange-400 text-sm">
                              {[...Array(5)].map((_, i) => (
                                <BsStarFill key={i} className={i < trx.rating ? "text-orange-400" : "text-gray-200"} />
                              ))}
                            </div>
                            <span className="text-xs text-teal-600 font-bold bg-teal-50 px-2 py-1 rounded">Diulas</span>
                          </div>
                        ) : trx.status === "completed" ? (
                          <button 
                            onClick={() => openReviewModal(trx)}
                            className="text-xs font-bold bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white px-3 py-1.5 rounded-md transition"
                          >
                            Beri Ulasan
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Menunggu Selesai</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium text-sm">
                      Kamu belum pernah melakukan transaksi.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}

        {/* ── CONTENT: INTERAKSI ── */}
        {activeTab === "interaksi" && (
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/30">
            {/* Chat History */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
                <BsChatDots className="text-teal-600 text-lg" /> Chat & Konsultasi
              </h3>
              <div className="space-y-4">
                {dummyInteractions.chatHistory.map((chat, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-[13px] text-gray-700">
                    <span className="font-semibold block mb-1">Topik:</span>
                    {chat}
                  </div>
                ))}
              </div>
            </div>

            {/* Support Tickets & Complaints */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
                  <BsHeadset className="text-blue-500 text-lg" /> Tiket Bantuan
                </h3>
                <ul className="space-y-3">
                  {dummyInteractions.supportTickets.map((ticket, idx) => (
                    <li key={idx} className="flex gap-2 text-[13px] text-gray-700 font-medium bg-blue-50/50 p-3 rounded-xl">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                      {ticket}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-orange-400">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
                  <BsExclamationTriangle className="text-orange-500 text-lg" /> Riwayat Komplain
                </h3>
                <ul className="space-y-3">
                  <p className="text-sm text-gray-400 italic">Tidak ada komplain.</p>
                </ul>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* ── MODAL BERI ULASAN ── */}
      <Modal isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)} title="Beri Ulasan Pesanan">
        <div className="space-y-6">
          <p className="text-sm text-gray-600">Bagaimana pengalamanmu berbelanja di PharmaCare? Berikan penilaian untuk pesanan <span className="font-bold text-gray-800">{selectedOrder?.id}</span>.</p>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-2xl transition-transform hover:scale-110"
                >
                  {star <= rating ? (
                    <BsStarFill className="text-orange-400" />
                  ) : (
                    <BsStar className="text-gray-300 hover:text-orange-200" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Tulis Ulasan <span className="text-red-500">*</span></label>
            <textarea 
              className="w-full border-gray-300 rounded-lg p-3 text-sm min-h-[100px] focus:ring-teal-500 focus:border-teal-500"
              placeholder="Pelayanannya cepat, obatnya lengkap..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={() => setReviewModalOpen(false)}>Batal</Button>
            <Button variant="primary" onClick={submitReview} disabled={isSubmitting}>
              {isSubmitting ? "Mengirim..." : "Kirim Ulasan"}
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
