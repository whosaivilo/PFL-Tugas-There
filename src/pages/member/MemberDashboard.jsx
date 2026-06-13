import React from "react";
import { useAuth } from "../../context/AuthContext";
import { BsGift, BsBagCheck, BsClockHistory, BsArrowRightShort, BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ProgressBar from "../../components/ProgressBar";
import Table from "../../components/Table";
import Badge from "../../components/Badge";

export default function MemberDashboard() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const getFirstName = (name) => name?.split(" ")[0] || "Member";

  // Calculate progress for next level
  const points = currentUser.loyaltyPoints || 0;
  let nextLevel = "Gold";
  let maxPoints = 3000;
  if (currentUser.memberLevel === "Gold") {
    nextLevel = "Platinum";
    maxPoints = 8000;
  } else if (currentUser.memberLevel === "Platinum") {
    nextLevel = "Max Level";
    maxPoints = points; // Already max
  }
  const progressPercent = Math.min((points / maxPoints) * 100, 100);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title={`Halo, ${getFirstName(currentUser.name)}! 👋`} 
        description="Senang melihatmu kembali. Yuk, jaga kesehatanmu hari ini dan dapatkan lebih banyak poin loyalty."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Card */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Progress Level</h3>
              <p className="text-sm text-gray-500">Tingkatkan terus transaksimu!</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Level Saat Ini: <span className="text-teal-600 font-bold">{currentUser.memberLevel}</span></p>
              <Badge variant="info">Menuju {nextLevel}</Badge>
            </div>
          </div>
          
          <ProgressBar 
            label={`${points.toLocaleString("id-ID")} poin`} 
            percentage={progressPercent} 
            color="bg-teal-500" 
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center gap-3">
          <h3 className="text-sm font-bold text-gray-800 mb-1">Akses Cepat</h3>
          <Link to="/member/riwayat" className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-teal-50 hover:text-teal-700 transition group border border-transparent hover:border-teal-100">
            <div className="flex items-center gap-3 font-semibold text-sm text-gray-700 group-hover:text-teal-700">
              <BsClockHistory className="text-lg text-gray-400 group-hover:text-teal-600" />
              Cek Riwayat Belanja
            </div>
            <BsArrowRightShort className="text-xl text-gray-400 group-hover:text-teal-600" />
          </Link>
          <Link to="/member/loyalty" className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-teal-50 hover:text-teal-700 transition group border border-transparent hover:border-teal-100">
            <div className="flex items-center gap-3 font-semibold text-sm text-gray-700 group-hover:text-teal-700">
              <BsGift className="text-lg text-gray-400 group-hover:text-teal-600" />
              Katalog Hadiah
            </div>
            <BsArrowRightShort className="text-xl text-gray-400 group-hover:text-teal-600" />
          </Link>
        </div>
      </div>

      {/* ── RECENT TRANSACTIONS ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Transaksi Terakhir</h3>
            <p className="text-sm text-gray-500">Ringkasan belanja bulan ini</p>
          </div>
          <Link to="/member/riwayat" className="text-sm font-semibold text-teal-600 hover:text-teal-700 hover:underline">
            Lihat Semua
          </Link>
        </div>
        
        <Table>
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">ID Transaksi</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Tanggal</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Total Belanja</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Metode</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentUser.transactions?.history?.slice(0, 3).map((trx, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                      <BsBagCheck />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{trx.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">{trx.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">
                  Rp {trx.total?.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="success">{trx.paymentMethod}</Badge>
                </td>
              </tr>
            ))}
            {(!currentUser.transactions?.history || currentUser.transactions.history.length === 0) && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500 font-medium text-sm">
                  Belum ada riwayat transaksi.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
