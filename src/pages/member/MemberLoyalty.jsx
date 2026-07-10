import React, { useState, useEffect } from "react";
import { BsGiftFill, BsAwardFill, BsShareFill, BsCopy, BsUnlockFill } from "react-icons/bs";
import Button from "../../components/Button";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";

export default function MemberLoyalty() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("loyalty_points, member_level")
        .eq("id", user.id)
        .single();
      
      if (!error && data) {
        setProfile(data);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  if (loading || !profile) return <div className="p-8 text-center text-gray-500">Memuat data loyalitas...</div>;

  const points = profile.loyalty_points || 0;
  const memberLevel = profile.member_level || "Silver";
  
  // Tier Progression Logic
  let nextTierLabel = "Gold";
  let nextTierPoints = 1000;
  let currentTierBase = 0;
  
  if (points >= 5000 || memberLevel === "Platinum") {
    nextTierLabel = "Platinum";
    nextTierPoints = 5000;
    currentTierBase = 5000;
  } else if (points >= 1000 || memberLevel === "Gold") {
    nextTierLabel = "Platinum";
    nextTierPoints = 5000;
    currentTierBase = 1000;
  }

  let progressPercentage = 100;
  if (memberLevel !== "Platinum") {
    const pointsNeeded = nextTierPoints - currentTierBase;
    const pointsEarnedInTier = points - currentTierBase;
    progressPercentage = Math.min(100, Math.max(0, (pointsEarnedInTier / pointsNeeded) * 100));
  }
  
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

  const handleRedeem = async (reward) => {
    if (points >= reward.cost) {
      if (window.confirm(`Tukarkan ${reward.cost} poin untuk "${reward.name}"?`)) {
        setLoading(true);
        const newPoints = points - reward.cost;
        const { error } = await supabase.from('profiles').update({ loyalty_points: newPoints }).eq('id', user.id);
        
        if (!error) {
          alert(`Berhasil menukarkan reward! Poin Anda tersisa ${newPoints}. Cek email Anda untuk klaim.`);
          setProfile({ ...profile, loyalty_points: newPoints });
        } else {
          alert("Gagal menukarkan poin.");
        }
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ── LOYALTY CARD ── */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
        
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 space-y-4 text-center md:text-left flex-1 w-full">
          <p className="text-gray-400 font-semibold uppercase tracking-widest text-sm mb-2">PharmaCare Loyalty</p>
          <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-300">
            {points.toLocaleString("id-ID")} <span className="text-2xl md:text-3xl font-bold text-white">PTS</span>
          </h2>
          
          {/* Progress Bar Area */}
          <div className="w-full max-w-md mx-auto md:mx-0 mt-4">
            <div className="flex justify-between text-xs font-bold text-gray-300 mb-2">
              <span>{memberLevel}</span>
              <span>{nextTierLabel}</span>
            </div>
            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-1000" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-right">
              {memberLevel !== "Platinum" 
                ? `Butuh ${(nextTierPoints - points).toLocaleString("id-ID")} poin lagi ke ${nextTierLabel}` 
                : "Anda berada di level tertinggi!"}
            </p>
          </div>
        </div>

        <div className="relative z-10 w-full md:w-auto bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex flex-col items-center justify-center min-w-[200px]">
          <BsAwardFill className={`text-5xl mb-3 ${
            memberLevel === 'Platinum' ? 'text-violet-400' :
            memberLevel === 'Gold' ? 'text-yellow-400' : 'text-gray-300'
          }`} />
          <p className="text-xs text-gray-300 uppercase tracking-widest font-bold mb-1">Level Anda</p>
          <h3 className="text-2xl font-bold text-white">{memberLevel}</h3>
        </div>
      </div>

      {/* ── TIER BENEFITS INFO ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 flex items-center gap-3">
          <BsAwardFill className="text-teal-500 text-xl" />
          <h3 className="font-bold text-gray-800">Tingkatan Member (Tier)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-3">
              <BsAwardFill className="text-2xl" />
            </div>
            <h4 className="font-bold text-gray-800 text-lg">Silver</h4>
            <p className="text-xs font-semibold text-gray-400 mb-3">0 - 999 Poin</p>
            <p className="text-sm text-gray-500">Mendapatkan poin dari setiap pembelanjaan untuk ditukar dengan diskon.</p>
          </div>
          <div className="p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-700 text-[9px] font-black uppercase px-2 py-1 rounded-bl-lg">Paling Populer</div>
            <div className="w-12 h-12 mx-auto bg-yellow-50 text-yellow-400 rounded-full flex items-center justify-center mb-3">
              <BsAwardFill className="text-2xl" />
            </div>
            <h4 className="font-bold text-gray-800 text-lg">Gold</h4>
            <p className="text-xs font-semibold text-yellow-500 mb-3">1.000 - 4.999 Poin</p>
            <p className="text-sm text-gray-500">Semua keuntungan Silver + Gratis Ongkir bulanan & Diskon Spesial.</p>
          </div>
          <div className="p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-violet-50 text-violet-400 rounded-full flex items-center justify-center mb-3">
              <BsAwardFill className="text-2xl" />
            </div>
            <h4 className="font-bold text-gray-800 text-lg">Platinum</h4>
            <p className="text-xs font-semibold text-violet-500 mb-3">5.000+ Poin</p>
            <p className="text-sm text-gray-500">Akses prioritas, Layanan Konsultasi Gratis, dan Reward Eksklusif.</p>
          </div>
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
                {user?.id ? user.id.substring(0, 8).toUpperCase() : "N/A"}
              </div>
              <button 
                onClick={() => handleCopy(user?.id ? user.id.substring(0, 8).toUpperCase() : "")}
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
                    <Button type="primary" onClick={() => handleRedeem(reward)}>
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
