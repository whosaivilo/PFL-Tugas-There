import React, { useState, useEffect, useMemo } from "react";
import { BsBagCheckFill, BsCart3, BsX, BsTrash, BsPlus, BsDash, BsSearch, BsHeartPulse, BsBandaid, BsCupHot, BsEmojiSmile, BsThermometerHalf, BsShieldCheck } from "react-icons/bs";
import { supabase } from "../../lib/supabase"; 
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function KatalogProduk() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  // Filter States
  const [activeTopCategory, setActiveTopCategory] = useState("Semua");
  const [activeSubCategory, setActiveSubCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // Voucher States
  const [voucherInput, setVoucherInput] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Checkout Modal States
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    paymentMethod: "Transfer Bank",
    deliveryMethod: "Pick Up",
    deliveryDate: "",
    deliveryTime: "",
  });

  const { user, role, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMember = location.pathname.includes("/member");

  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("medicines")
      .select("*")
      .gt("stock", 0)
      .order("name", { ascending: true });

    if (data && !error) setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("pharmacare_cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("pharmacare_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) {
          toast.error(`Maaf, stok ${product.name} hanya tersisa ${product.stock}`);
          return prev;
        }
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  
  const updateQty = (id, delta, maxStock) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        if (newQty > maxStock) {
          toast.error(`Maaf, stok hanya tersisa ${maxStock}`);
          return item;
        }
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const totalItemCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + ((item.price || 0) * item.qty), 0);
  const finalPrice = totalPrice - (totalPrice * (discountPercent / 100));

  const applyVoucher = () => {
    if (voucherInput.trim().toUpperCase() === "PHARMAJUL26") {
      setDiscountPercent(5);
      toast.success("Voucher Berhasil! Anda mendapatkan diskon 5%.");
    } else {
      setDiscountPercent(0);
      toast.error("Kode voucher tidak valid atau sudah kedaluwarsa.");
    }
  };

  const handleCheckoutClick = () => {
    if (!user) {
      toast.error("Silakan Login terlebih dahulu untuk melakukan Checkout!");
      navigate("/login");
      return;
    }
    if (role !== "member") {
      toast.error("Hanya akun Member yang dapat melakukan pembelian!");
      return;
    }
    setIsCheckoutModalOpen(true);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (checkoutForm.deliveryMethod === "Delivery" && !profile?.address) {
      toast.error("Alamat belum diisi! Silakan lengkapi alamat di Pengaturan Profil.");
      return;
    }
    if (!checkoutForm.deliveryDate || !checkoutForm.deliveryTime) {
      toast.error("Mohon pilih tanggal dan jam pengiriman/pengambilan.");
      return;
    }

    setIsCheckoutLoading(true);
    try {
      const orderId = "TRX-" + Math.floor(1000 + Math.random() * 9000);
      const calculatedPoints = 20; // Sesuai request: flat 20 poin per transaksi

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([{
          id: orderId,
          user_id: user.id,
          total_amount: finalPrice,
          points_earned: calculatedPoints,
          payment_method: checkoutForm.paymentMethod,
          delivery_method: checkoutForm.deliveryMethod,
          delivery_time: `${checkoutForm.deliveryDate} ${checkoutForm.deliveryTime}`,
          delivery_address: checkoutForm.deliveryMethod === "Delivery" ? profile?.address : null,
          status: "completed"
        }])
        .select()
        .single();

      if (orderError) throw orderError;
      
      const actualPointsEarned = orderData?.points_earned || calculatedPoints;

      const itemsToInsert = cart.map(item => ({
        order_id: orderId,
        medicine_id: item.id,
        quantity: item.qty,
        unit_price: item.price
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      // Stok akan otomatis berkurang melalui Database Trigger di Supabase

      setCart([]);
      setIsCartOpen(false);
      setIsCheckoutModalOpen(false);
      
      if (refreshProfile) await refreshProfile();
      
      toast.success(`Checkout Berhasil! ID Transaksi: ${orderId}`, {
        description: `Poin loyalitasmu bertambah! (+${actualPointsEarned} Pts)`
      });
      fetchProducts();
    } catch (error) {
      console.error("Error Checkout:", error);
      toast.error("Terjadi kesalahan saat checkout. Pastikan script SQL sudah dijalankan di Supabase.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  // Kategori Menu Top (UI GoApotik Reference)
  const topCategories = [
    { id: "Semua", icon: <BsShieldCheck className="text-2xl text-teal-500" />, label: "Semua" },
    { id: "Obat Bebas", icon: <BsBandaid className="text-2xl text-yellow-500" />, label: "Obat" },
    { id: "Vitamin", icon: <BsCupHot className="text-2xl text-orange-500" />, label: "Suplemen" },
    { id: "Herbal", icon: <BsEmojiSmile className="text-2xl text-green-500" />, label: "Herbal" },
    { id: "Alat Kesehatan", icon: <BsThermometerHalf className="text-2xl text-red-500" />, label: "Alkes" },
    { id: "Ibu & Bayi", icon: <BsHeartPulse className="text-2xl text-pink-500" />, label: "Produk Bayi" },
  ];

  // Ekstrak unik group_name asli dari database untuk Sidebar
  const dbGroups = useMemo(() => {
    const groups = products.map(p => p.group_name).filter(Boolean);
    return ["Semua", ...new Set(groups)];
  }, [products]);

  // Filter products based on search and categories
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Top Cat Filter (map to database groups loosely)
      let matchesTopCat = true;
      if (activeTopCategory !== "Semua") {
         matchesTopCat = prod.group_name === activeTopCategory;
      }

      // Sidebar Filter
      let matchesSubCat = true;
      if (activeSubCategory !== "Semua") {
         matchesSubCat = prod.group_name === activeSubCategory;
      }

      return matchesSearch && matchesTopCat && matchesSubCat;
    });
  }, [products, searchQuery, activeTopCategory, activeSubCategory]);

  return (
    <div className={`${isMember ? 'pt-0' : 'pt-24 md:pt-32'} pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-[Poppins,sans-serif]`}>
      
      {/* ── 1. HERO BANNER PROMO CAROUSEL ── */}
      <div className="w-full mb-8 overflow-x-auto flex gap-4 snap-x snap-mandatory scrollbar-hide py-2">
        {/* Banner 1 */}
        <div className="min-w-[90%] md:min-w-[60%] lg:min-w-[50%] snap-center rounded-2xl overflow-hidden relative flex items-center shadow-md group py-6 md:py-10 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 opacity-90 transition-opacity group-hover:opacity-100"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-20 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-400/30 rounded-full blur-2xl translate-y-10 -translate-x-10"></div>
          
          <div className="relative z-10 px-6 md:px-10 text-white w-full">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-wider mb-3 border border-white/30">
              PROMO SPESIAL BULAN INI
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-2 leading-tight">DISCOUNT 5%<br/>All Products</h2>
            <div className="mt-3 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-teal-900 font-bold text-xs shadow-sm">
              Kode Voucher: <span className="text-orange-500 tracking-wider font-black text-sm">PHARMAJUL26</span>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex items-center z-10 opacity-70 group-hover:opacity-100 transition-opacity translate-x-10">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden">
              <img src="/img/obat.jpg" alt="Promo 1" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Banner 3 */}
        <div className="min-w-[90%] md:min-w-[60%] lg:min-w-[50%] snap-center rounded-2xl overflow-hidden relative flex items-center shadow-md group py-6 md:py-10 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 opacity-90 transition-opacity group-hover:opacity-100"></div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-20 -translate-x-10"></div>
          
          <div className="relative z-10 px-6 md:px-10 text-white w-full">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-wider mb-3 border border-white/30">
              PROGRAM LOYALITAS
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-2 leading-tight">Tukar Poinmu<br/>Jadi Hadiah</h2>
            <div className="mt-3 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-blue-900 font-bold text-xs shadow-sm cursor-pointer hover:bg-blue-50">
              Cek Katalog Hadiah
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. KATEGORI IKON (Horizontal Scroll) ── */}
      <div className="flex items-center gap-2 md:gap-8 overflow-x-auto pb-4 mb-8 border-b border-gray-100 scrollbar-hide py-2 px-2">
        {topCategories.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => { setActiveTopCategory(cat.id); setActiveSubCategory("Semua"); }}
            className={`flex flex-col items-center gap-3 min-w-[80px] p-2 transition-all ${activeTopCategory === cat.id ? "opacity-100 scale-110" : "opacity-60 hover:opacity-100"}`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm border ${activeTopCategory === cat.id ? "bg-teal-50 border-teal-200" : "bg-white border-gray-100"}`}>
              {cat.icon}
            </div>
            <span className={`text-xs font-bold whitespace-nowrap ${activeTopCategory === cat.id ? "text-teal-600 border-b-2 border-teal-600 pb-1" : "text-gray-500"}`}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      {/* ── 3. MAIN LAYOUT (SIDEBAR & KONTEN) ── */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Sidebar Filter */}
        <div className="w-full lg:w-64 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sticky top-24">
          <h3 className="font-bold text-gray-800 mb-4 px-2">Filter Kategori</h3>
          <div className="space-y-1">
            {dbGroups.map((group) => (
              <button
                key={group}
                onClick={() => setActiveSubCategory(group)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-3 ${
                  activeSubCategory === group 
                  ? "bg-teal-600 text-white shadow-md shadow-teal-200" 
                  : "text-gray-600 hover:bg-slate-50"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${activeSubCategory === group ? "bg-white" : "bg-gray-300"}`}></div>
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Konten Kanan (Produk) */}
        <div className="flex-1 w-full">
          
          {/* Search Bar */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-2 mb-6 flex items-center gap-3 focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-50 transition-all">
            <div className="pl-4 text-gray-400"><BsSearch className="text-xl"/></div>
            <input 
              type="text" 
              placeholder={`Cari di Kategori ${activeTopCategory !== "Semua" ? activeTopCategory : "Semua Produk"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none py-3 px-2 outline-none text-gray-700 font-medium w-full"
            />
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl">
              <BsSearch className="text-5xl text-gray-200 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-700 mb-1">Produk Tidak Ditemukan</h3>
              <p className="text-gray-500">Coba ubah kata kunci atau hapus filter kategori.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-teal-300 transition-all flex flex-col group cursor-pointer relative">
                  <div className="absolute top-3 right-3 bg-orange-100 text-orange-700 text-[10px] font-black px-2 py-1 rounded-md z-10 tracking-wider">
                    SISA {prod.stock}
                  </div>
                  <div className="h-40 md:h-44 overflow-hidden bg-white relative flex items-center justify-center p-4 border-b border-gray-50">
                    <img 
                      src={prod.image_url || "https://images.unsplash.com/photo-1584308666744-24d5e4a83852?w=300&q=80"} 
                      alt={prod.name} 
                      className={`w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ${!prod.image_url ? 'opacity-40 grayscale' : ''}`} 
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[11px] font-bold text-gray-400 mb-1 uppercase tracking-wider">{prod.group_name || "General"}</p>
                    <h3 className="font-bold text-gray-800 text-[15px] mb-3 line-clamp-2 leading-tight">{prod.name}</h3>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-black text-orange-500 text-lg">Rp {(prod.price || 0).toLocaleString("id-ID")}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(prod); }}
                        className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center transition-colors shadow-sm"
                      >
                        <BsPlus className="text-2xl" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-teal-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-teal-700 hover:scale-110 transition-all z-40"
      >
        <BsCart3 className="text-2xl" />
        {totalItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md animate-bounce">
            {totalItemCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar Modal (Sama seperti sebelumnya, disesuaikan aksen birunya) */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform animate-in slide-in-from-right">
            
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <BsCart3 /> Keranjang Belanja
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <BsX className="text-3xl" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                  <BsCart3 className="text-6xl mx-auto text-gray-200 mb-4" />
                  <p>Keranjang masih kosong.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
                    <img 
                      src={item.image_url || "https://images.unsplash.com/photo-1584308666744-24d5e4a83852?w=300&q=80"} 
                      alt={item.name} 
                      className={`w-16 h-16 rounded-lg object-cover bg-gray-100 ${!item.image_url ? 'opacity-40 grayscale' : ''}`} 
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-sm mb-1">{item.name}</h4>
                      <div className="text-orange-500 font-black text-sm mb-2">Rp {(item.price || 0).toLocaleString("id-ID")}</div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-gray-100">
                          <button onClick={() => updateQty(item.id, -1, item.stock)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-teal-600 bg-white rounded-md shadow-sm"><BsDash /></button>
                          <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1, item.stock)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-teal-600 bg-white rounded-md shadow-sm"><BsPlus /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 text-sm">
                          <BsTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-slate-50">
              
              {/* Fitur Klaim Voucher */}
              {cart.length > 0 && (
                <div className="mb-4">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Punya Kode Voucher?" 
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value)}
                      className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-teal-500 uppercase font-bold text-teal-800"
                    />
                    <button onClick={applyVoucher} className="bg-teal-100 text-teal-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-teal-200 transition">
                      Klaim
                    </button>
                  </div>
                  {discountPercent > 0 && (
                    <p className="text-orange-500 text-xs font-bold mt-2 flex justify-between">
                      <span>Diskon {discountPercent}% diterapkan!</span>
                      <span>- Rp {(totalPrice * discountPercent / 100).toLocaleString("id-ID")}</span>
                    </p>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 font-medium">Total Harga</span>
                <div className="text-right">
                  {discountPercent > 0 && (
                    <div className="text-sm text-gray-400 line-through mb-1">Rp {totalPrice.toLocaleString("id-ID")}</div>
                  )}
                  <div className="text-2xl font-black text-slate-800">Rp {finalPrice.toLocaleString("id-ID")}</div>
                </div>
              </div>
              <button 
                disabled={cart.length === 0 || isCheckoutLoading}
                onClick={handleCheckoutClick}
                className="w-full bg-teal-600 flex justify-center disabled:bg-gray-300 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition shadow-lg shadow-teal-500/30 disabled:shadow-none"
              >
                Checkout Sekarang
              </button>
            </div>

          </div>
        </>
      )}

      {/* ── MODAL KONFIRMASI PESANAN ── */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCheckoutModalOpen(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">Konfirmasi Pesanan</h2>
              <button onClick={() => setIsCheckoutModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <BsX className="text-3xl" />
              </button>
            </div>

            <form onSubmit={handleCheckout} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Metode Pengiriman</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${checkoutForm.deliveryMethod === 'Pick Up' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input type="radio" name="deliveryMethod" value="Pick Up" className="hidden" checked={checkoutForm.deliveryMethod === 'Pick Up'} onChange={(e) => setCheckoutForm({...checkoutForm, deliveryMethod: e.target.value})} />
                    <span className="font-bold text-sm">Pick Up</span>
                    <span className="text-[10px] opacity-70">Ambil di Apotek</span>
                  </label>
                  <label className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${checkoutForm.deliveryMethod === 'Delivery' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input type="radio" name="deliveryMethod" value="Delivery" className="hidden" checked={checkoutForm.deliveryMethod === 'Delivery'} onChange={(e) => setCheckoutForm({...checkoutForm, deliveryMethod: e.target.value})} />
                    <span className="font-bold text-sm">Delivery</span>
                    <span className="text-[10px] opacity-70">Diantar ke Alamat</span>
                  </label>
                </div>
              </div>

              {checkoutForm.deliveryMethod === 'Delivery' && (
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                  <p className="text-xs font-bold text-orange-800 mb-1">Alamat Pengiriman:</p>
                  <p className="text-sm text-orange-900">
                    {profile?.address ? profile.address : <span className="text-red-500 font-bold">Belum ada alamat! Harap lengkapi di Pengaturan Profil.</span>}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Tanggal {checkoutForm.deliveryMethod}</label>
                  <input type="date" required value={checkoutForm.deliveryDate} onChange={(e) => setCheckoutForm({...checkoutForm, deliveryDate: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Jam</label>
                  <input type="time" required value={checkoutForm.deliveryTime} onChange={(e) => setCheckoutForm({...checkoutForm, deliveryTime: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Metode Pembayaran</label>
                <select value={checkoutForm.paymentMethod} onChange={(e) => setCheckoutForm({...checkoutForm, paymentMethod: e.target.value})} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500 outline-none bg-white">
                  <option value="Transfer Bank">Transfer Bank (BCA/Mandiri/BNI)</option>
                  <option value="E-Wallet">E-Wallet (GoPay/OVO/Dana)</option>
                  {checkoutForm.deliveryMethod === 'Pick Up' && <option value="Bayar di Tempat">Bayar di Tempat (Kasir)</option>}
                  {checkoutForm.deliveryMethod === 'Delivery' && <option value="COD">Cash On Delivery (COD)</option>}
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-0.5">Total Pembayaran</p>
                  <p className="text-xl font-black text-teal-600">Rp {finalPrice.toLocaleString("id-ID")}</p>
                </div>
                <button type="submit" disabled={isCheckoutLoading} className="bg-teal-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-teal-700 transition shadow-md disabled:bg-gray-400">
                  {isCheckoutLoading ? "Memproses..." : "Bayar Pesanan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
