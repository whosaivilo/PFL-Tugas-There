import React from "react";

import { BsGiftFill, BsAwardFill, BsShareFill, BsCopy, BsUnlockFill } from "react-icons/bs";
import Button from "../../components/Button";

export default function MemberLoyalty() {
  const currentUser = JSON.parse(localStorage.getItem("pharmacare_user")) || {};

  if (!currentUser) return null;

  const points = currentUser.loyaltyPoints || 0;
  
  // Fake reward catalog based on points
  const rewards = [
    { name: "Voucher Diskon Rp 20.000", cost: 1000, color: "bg-orange-50 text-orange-600" },
    { name: "Gratis Ongkir s/d Rp 15.000", cost: 1500, color: "bg-blue-50 text-blue-600" },
    { name: "Voucher Diskon Rp 50.000", cost: 2500, color: "bg-teal-50 text-teal-600" },
    { name: "Gratis Cek Gula Darah", cost: 3000, color: "bg-purple-50 text-purple-600" },
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Referral code ${code} disalin!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ── LOYALTY CARD ── */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
        
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 space-y-4 text-center md:text-left flex-1">
          <p className="text-gray-400 font-semibold uppercase tracking-widest text-sm mb-2">PharmaCare Loyalty</p>
          <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-300">
            {points.toLocaleString("id-ID")} <span className="text-2xl md:text-3xl font-bold text-white">PTS</span>
          </h2>
          <p className="text-gray-300 font-medium max-w-md">
            Poin kamu bisa ditukarkan dengan berbagai voucher diskon, layanan gratis, atau exclusive merchandise.
          </p>
        </div>

        <div className="relative z-10 w-full md:w-auto bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex flex-col items-center justify-center min-w-[200px]">
          <BsAwardFill className={`text-5xl mb-3 ${
            currentUser.memberLevel === 'Platinum' ? 'text-violet-400' :
            currentUser.memberLevel === 'Gold' ? 'text-yellow-400' : 'text-gray-300'
          }`} />
          <p className="text-xs text-gray-300 uppercase tracking-widest font-bold mb-1">Level Anda</p>
          <h3 className="text-2xl font-bold text-white">{currentUser.memberLevel}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ── REFERRAL CARD ── */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6">
              <BsShareFill className="text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Ajak Teman</h3>
            <p className="text-sm text-gray-500 mb-6">
              Bagikan kode referralmu dan dapatkan <strong>500 poin</strong> setiap ada teman yang mendaftar dan belanja pertama kali.
            </p>
          </div>
          
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Kode Referral Kamu</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl text-lg font-mono font-bold text-gray-800 tracking-wider text-center">
                {currentUser.account?.referralCode || "N/A"}
              </div>
              <button 
                onClick={() => handleCopy(currentUser.account?.referralCode)}
                className="w-14 h-14 bg-teal-600 hover:bg-teal-700 text-white rounded-xl flex items-center justify-center transition shrink-0"
              >
                <BsCopy />
              </button>
            </div>
          </div>
        </div>

        {/* ── REWARDS CATALOG ── */}
        <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <BsGiftFill className="text-teal-500" /> Katalog Penukaran
            </h3>
            <span className="text-sm font-semibold text-teal-600">{points.toLocaleString("id-ID")} Poin Tersedia</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rewards.map((reward, idx) => {
              const canRedeem = points >= reward.cost;
              return (
                <div key={idx} className={`p-4 rounded-2xl border transition ${canRedeem ? "border-gray-100 hover:border-teal-300 hover:shadow-md bg-white" : "border-gray-100 bg-gray-50 opacity-60"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${reward.color}`}>
                    {canRedeem ? <BsGiftFill /> : <BsUnlockFill />}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">{reward.name}</h4>
                  <p className="text-sm font-semibold text-gray-500 mb-4">{reward.cost.toLocaleString("id-ID")} Poin</p>
                  
                  {canRedeem ? (
                    <Button type="primary" onClick={() => {}}>
                      <span className="w-full text-center">Tukar Poin</span>
                    </Button>
                  ) : (
                    <button disabled className="w-full px-4 py-2 bg-gray-200 text-gray-400 rounded text-[14px] font-medium transition-all shadow-sm flex items-center justify-center gap-2 cursor-not-allowed">
                      Poin Kurang
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
