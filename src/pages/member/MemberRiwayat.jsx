import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { BsBagCheck, BsChatDots, BsHeadset, BsExclamationTriangle } from "react-icons/bs";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import Badge from "../../components/Badge";

export default function MemberRiwayat() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("transaksi");

  if (!currentUser) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Riwayat Aktivitas"
        description="Pantau riwayat pembelanjaan dan interaksi kamu dengan tim support kami."
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
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">ID Transaksi</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Tanggal</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Item</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Metode</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentUser.transactions?.history?.map((trx, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                          <BsBagCheck />
                        </div>
                        {trx.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">{trx.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                      <ul className="list-disc pl-4 text-xs text-gray-500 space-y-1">
                        {trx.items?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="success">{trx.paymentMethod}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">
                      Rp {trx.total?.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
                {(!currentUser.transactions?.history || currentUser.transactions.history.length === 0) && (
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
                {currentUser.interactions?.chatHistory?.map((chat, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-[13px] text-gray-700">
                    <span className="font-semibold block mb-1">Topik:</span>
                    {chat}
                  </div>
                ))}
                {(!currentUser.interactions?.chatHistory || currentUser.interactions.chatHistory.length === 0) && (
                  <p className="text-sm text-gray-400 italic">Belum ada riwayat chat.</p>
                )}
              </div>
            </div>

            {/* Support Tickets & Complaints */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
                  <BsHeadset className="text-blue-500 text-lg" /> Tiket Bantuan
                </h3>
                <ul className="space-y-3">
                  {currentUser.interactions?.supportTickets?.map((ticket, idx) => (
                    <li key={idx} className="flex gap-2 text-[13px] text-gray-700 font-medium bg-blue-50/50 p-3 rounded-xl">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                      {ticket}
                    </li>
                  ))}
                  {(!currentUser.interactions?.supportTickets || currentUser.interactions.supportTickets.length === 0) && (
                    <p className="text-sm text-gray-400 italic">Belum ada tiket bantuan aktif.</p>
                  )}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-orange-400">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
                  <BsExclamationTriangle className="text-orange-500 text-lg" /> Riwayat Komplain
                </h3>
                <ul className="space-y-3">
                  {currentUser.interactions?.complaints?.map((comp, idx) => (
                    <li key={idx} className="flex gap-2 text-[13px] text-gray-700 font-medium bg-orange-50 p-3 rounded-xl">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5"></div>
                      {comp}
                    </li>
                  ))}
                  {(!currentUser.interactions?.complaints || currentUser.interactions.complaints.length === 0) && (
                    <p className="text-sm text-gray-400 italic">Tidak ada komplain.</p>
                  )}
                </ul>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
