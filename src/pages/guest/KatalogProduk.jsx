import React, { useState, useEffect } from "react";
import { BsBagCheckFill, BsCart3, BsX, BsTrash, BsPlus, BsDash } from "react-icons/bs";
import { supabase } from "../../lib/supabase"; 
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function KatalogProduk() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const { user, role } = useAuth(); // Dapatkan data user yang login
  const navigate = useNavigate();

  // Load products from Supabase
  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("medicines")
      .select("*")
      .gt("stock", 0) // Hanya tampilkan yang stoknya ada
      .order("name", { ascending: true });

    if (data && !error) {
      setProducts(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Cart logic (menggunakan localStorage untuk keranjang sementaranya saja)
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
          alert(`Maaf, stok ${product.name} hanya tersisa ${product.stock}`);
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
          alert(`Maaf, stok hanya tersisa ${maxStock}`);
          return item;
        }
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const totalItemCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + ((item.price || 0) * item.qty), 0);

  const handleCheckout = async () => {
    if (!user) {
      alert("Silakan Login terlebih dahulu untuk melakukan Checkout!");
      navigate("/login");
      return;
    }

    if (role !== "member") {
      alert("Hanya akun Member yang dapat melakukan pembelian!");
      return;
    }

    setIsCheckoutLoading(true);

    try {
      // 1. Buat ID Pesanan
      const orderId = "TRX-" + Math.floor(1000 + Math.random() * 9000);

      // 2. Insert ke tabel orders (Trigger Database akan otomatis menghitung poin & tier jika status 'completed')
      const { error: orderError } = await supabase
        .from("orders")
        .insert([{
          id: orderId,
          user_id: user.id,
          total_amount: totalPrice,
          payment_method: "Transfer Bank",
          status: "completed"
        }]);

      if (orderError) throw orderError;

      // 3. Insert rincian pesanan ke tabel order_items
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

      // 4. Kurangi stok obat di tabel medicines
      for (const item of cart) {
        const newStock = item.stock - item.qty;
        await supabase
          .from("medicines")
          .update({ stock: newStock })
          .eq("id", item.id);
      }

      // 5. Berhasil! Bersihkan keranjang.
      setCart([]);
      setIsCartOpen(false);
      alert(`Checkout Berhasil!\nID Transaksi: ${orderId}\n\nPoin loyalitasmu otomatis bertambah sesuai dengan jumlah pembelanjaan!`);
      
      // Refresh katalog obat agar stok yang tampil ter-update
      fetchProducts();

    } catch (error) {
      console.error("Error Checkout:", error);
      alert("Terjadi kesalahan saat checkout. Silakan periksa koneksi atau hubungi admin.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return (
    <div className="pt-36 pb-20 px-4 md:px-6 max-w-7xl mx-auto animate-in fade-in duration-700 relative">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[#001b3a] mb-2">Katalog Produk</h1>
          <p className="text-gray-500">Jelajahi ribuan produk kesehatan yang tersedia di Apotek PharmaCare.</p>
        </div>
      </div>

      {/* Grid Produk */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          Belum ada produk yang tersedia atau stok sedang habis.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((prod) => (
            <div key={prod.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all flex flex-col group cursor-pointer relative">
              <div className="absolute top-3 right-3 bg-teal-100 text-teal-700 text-xs font-bold px-2 py-1 rounded-md z-10">
                Stok: {prod.stock}
              </div>
              <div className="h-40 md:h-48 overflow-hidden bg-gray-50 relative flex items-center justify-center p-4">
                {prod.image_url ? (
                  <img src={prod.image_url} alt={prod.name} className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 shadow-sm" />
                ) : (
                  <div className="text-gray-300 font-medium">No Image</div>
                )}
              </div>
              <div className="p-4 md:p-5 flex flex-col flex-1">
                <p className="text-xs font-semibold text-gray-400 mb-1">{prod.group_name || "General"}</p>
                <h3 className="font-bold text-gray-800 text-base md:text-lg mb-4 line-clamp-2">{prod.name}</h3>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-black text-orange-600 text-base md:text-lg">Rp {(prod.price || 0).toLocaleString("id-ID")}</span>
                  <button 
                    onClick={() => addToCart(prod)}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white flex items-center justify-center transition-colors shadow-sm"
                  >
                    <BsBagCheckFill className="text-sm md:text-base" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Cart Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-teal-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-teal-700 hover:scale-105 transition-all z-40"
      >
        <BsCart3 className="text-2xl" />
        {totalItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
            {totalItemCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar Modal */}
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
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400">Img</div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-sm mb-1">{item.name}</h4>
                      <div className="text-orange-600 font-bold text-sm mb-2">Rp {(item.price || 0).toLocaleString("id-ID")}</div>
                      
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
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 font-medium">Total Harga</span>
                <span className="text-2xl font-black text-slate-800">Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>
              <button 
                disabled={cart.length === 0 || isCheckoutLoading}
                onClick={handleCheckout}
                className="w-full bg-teal-600 flex justify-center disabled:bg-gray-300 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition shadow-lg shadow-teal-500/20 disabled:shadow-none"
              >
                {isCheckoutLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Checkout Sekarang"
                )}
              </button>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
