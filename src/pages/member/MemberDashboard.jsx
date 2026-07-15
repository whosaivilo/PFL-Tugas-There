import React, { useState, useEffect } from "react";
import { BsGift, BsBagCheck, BsClockHistory, BsArrowRightShort, BsStarFill, BsCart3, BsChatSquareHeart, BsHeartPulse, BsLightbulbFill, BsShieldCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import Badge from "../../components/Badge";
import TierBenefits from "../../components/TierBenefits";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";

export default function MemberDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      // Fetch Profile (Loyalty Points)
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (profileData) setProfile(profileData);

      // Fetch Recent Orders
      const { data: ordersData } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(4);
      
      if (ordersData) setRecentOrders(ordersData);

      // Fetch some products for recommendation
      const { data: products } = await supabase
        .from("medicines")
        .select("*")
        .limit(3);
        
      if (products) setRecommended(products);

      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (!user || loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  const getFirstName = (name) => name?.split(" ")[0] || "Member";

  // Calculate progress for next level robustly based on points to prevent mismatch
  const points = profile?.loyalty_points || 0;
  let currentLevel = "Silver";
  let nextLevel = "Gold";
  let maxPoints = 1000;
  let basePoints = 0;
  
  if (points >= 5000) {
    currentLevel = "Platinum";
    nextLevel = "Max Level";
    maxPoints = 5000;
    basePoints = 5000;
  } else if (points >= 1000) {
    currentLevel = "Gold";
    nextLevel = "Platinum";
    maxPoints = 5000;
    basePoints = 1000;
  }
  
  let progressPercent = 100;
  if (currentLevel !== "Platinum") {
    const pointsNeeded = maxPoints - basePoints;
    const pointsEarnedInTier = points - basePoints;
    progressPercent = Math.min(100, Math.max(0, (pointsEarnedInTier / pointsNeeded) * 100));
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* ── HERO BANNER ── */}
      <div className="relative bg-gradient-to-br from-teal-700 via-emerald-600 to-teal-500 rounded-3xl p-8 md:p-10 text-white shadow-xl overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-300/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 space-y-3 text-center md:text-left flex-1 w-full">
          <Badge className="bg-white/20 text-white border-none backdrop-blur-md mb-2">
            <BsStarFill className="inline-block mr-1.5 text-yellow-300" /> {currentLevel} Member
          </Badge>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Halo, {getFirstName(profile?.full_name)}! 👋
          </h1>
          <p className="text-teal-50 font-medium max-w-lg opacity-90 text-sm md:text-base">
            Sehat selalu ya! Yuk, kumpulkan poin dan nikmati berbagai penawaran eksklusif khusus untukmu hari ini.
          </p>
          
          <div className="mt-8 flex gap-3 justify-center md:justify-start">
            <Link to="/member/katalog" className="bg-white text-teal-700 hover:bg-teal-50 px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all duration-300 flex items-center gap-2">
              <BsCart3 /> Mulai Belanja
            </Link>
          </div>
        </div>

        {/* Level & Points Widget */}
        <div className="relative z-10 w-full md:w-[320px] bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-inner">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs text-teal-100 font-semibold uppercase tracking-wider">Total Poin</p>
            <BsGift className="text-teal-200" />
          </div>
          <h2 className="text-3xl font-black mb-5">
            {points.toLocaleString("id-ID")} <span className="text-lg font-bold text-teal-200">PTS</span>
          </h2>
          
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-bold text-white/80">
              <span>{currentLevel}</span>
              <span>{nextLevel}</span>
            </div>
            <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full transition-all duration-1000 relative" 
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <p className="text-[10px] text-teal-100 text-right mt-1 font-medium">
              {currentLevel !== "Platinum" 
                ? `Butuh ${(maxPoints - points).toLocaleString("id-ID")} poin lagi` 
                : "Level Maksimal!"}
            </p>
          </div>
        </div>
      </div>

      <TierBenefits />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ── LEFT COLUMN ── */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Actions Grid */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BsHeartPulse className="text-teal-500" /> Akses Cepat
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/member/katalog" className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-100 transition-all text-center flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 bg-teal-50 text-teal-500 rounded-full flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                  <BsCart3 className="text-xl" />
                </div>
                <span className="text-xs font-bold text-gray-700 group-hover:text-teal-700">Katalog Obat</span>
              </Link>
              <Link to="/member/resep" className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all text-center flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <BsChatSquareHeart className="text-xl" />
                </div>
                <span className="text-xs font-bold text-gray-700 group-hover:text-blue-700">Tebus Resep</span>
              </Link>
              <Link to="/member/riwayat" className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all text-center flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                  <BsClockHistory className="text-xl" />
                </div>
                <span className="text-xs font-bold text-gray-700 group-hover:text-emerald-700">Riwayat Belanja</span>
              </Link>
              <Link to="/member/loyalty" className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-100 transition-all text-center flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                  <BsGift className="text-xl" />
                </div>
                <span className="text-xs font-bold text-gray-700 group-hover:text-purple-700">Tukar Poin</span>
              </Link>
            </div>
          </div>

          {/* New Feature: Health Tip & Promo Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Promo Banner */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute right-0 top-0 w-24 h-24 bg-orange-200/50 rounded-full blur-xl translate-x-1/2 -translate-y-1/4"></div>
              <div className="relative z-10">
                <Badge className="bg-orange-100 text-orange-700 border-none mb-3">Promo Spesial</Badge>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Diskon 5% Belanja!</h3>
                <p className="text-xs text-gray-600 mb-4">Gunakan kode voucher di keranjang.</p>
              </div>
              <div className="relative z-10 inline-block bg-white border border-dashed border-orange-300 text-orange-600 font-mono font-bold text-center px-4 py-2 rounded-lg shadow-sm">
                PHARMAJUL26
              </div>
            </div>

            {/* Health Tip */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute right-0 bottom-0 text-6xl text-blue-100/50 -mr-2 -mb-2">
                <BsLightbulbFill />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3 text-blue-600">
                  <BsLightbulbFill className="text-xl" />
                  <span className="font-bold text-sm tracking-wide uppercase">Tips Sehat Hari Ini</span>
                </div>
                <p className="text-sm font-medium text-gray-700 leading-relaxed mb-4">
                  Minum air putih setidaknya 8 gelas sehari dapat membantu menjaga kelembapan kulit dan mendukung sistem imun tubuhmu.
                </p>
              </div>
              <Link to="/member/katalog" className="relative z-10 text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 transition-colors">
                Cari Suplemen Tubuh <BsArrowRightShort className="text-lg" />
              </Link>
            </div>
          </div>

          {/* New Feature: Recommended Products */}
          {recommended.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <BsShieldCheck className="text-teal-500" /> Rekomendasi Untukmu
                </h3>
                <Link to="/member/katalog" className="text-xs font-bold text-teal-600 hover:text-teal-700">Lihat Katalog</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommended.map((item) => (
                  <Link key={item.id} to="/member/katalog" className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-teal-200 transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-full h-24 bg-gray-50 rounded-xl mb-3 overflow-hidden flex items-center justify-center">
                        <img src={item.image_url || '/img/obat.jpg'} alt={item.name} className="h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => e.target.src='/img/obat.jpg'} />
                      </div>
                      <h4 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-teal-600 transition-colors line-clamp-2">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 font-semibold mb-2">{item.group_name}</p>
                    </div>
                    <div className="font-black text-teal-700 text-sm">
                      Rp {item.price.toLocaleString("id-ID")}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN: RECENT TRANSACTIONS ── */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col min-h-[400px]">
            <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <BsBagCheck className="text-teal-500" /> Transaksi Terakhir
              </h3>
              <Link to="/member/riwayat" className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center">
                Semua <BsArrowRightShort className="text-lg" />
              </Link>
            </div>
            
            <div className="p-5 flex-1 flex flex-col gap-4">
              {recentOrders.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-10 opacity-60">
                  <BsBagCheck className="text-4xl text-gray-300 mb-3" />
                  <p className="text-sm font-medium text-gray-500">Belum ada transaksi.</p>
                </div>
              ) : (
                recentOrders.map((trx) => (
                  <Link key={trx.id} to="/member/riwayat" className="group block p-4 rounded-xl border border-gray-100 hover:border-teal-200 hover:shadow-md transition-all bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs font-bold text-gray-500 block mb-1">
                          {new Date(trx.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <h4 className="font-bold text-gray-800 text-sm group-hover:text-teal-700 transition-colors">{trx.id}</h4>
                      </div>
                      <Badge variant={trx.status === "completed" ? "success" : "warning"} className="text-[9px] px-1.5 py-0.5">
                        {trx.status === "completed" ? "Selesai" : "Proses"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-end mt-3">
                      <div>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Total Belanja</span>
                        <span className="font-black text-gray-800">Rp {trx.total_amount?.toLocaleString("id-ID")}</span>
                      </div>
                      {trx.points_earned > 0 && (
                        <div className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">
                          +{trx.points_earned} Pts
                        </div>
                      )}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
