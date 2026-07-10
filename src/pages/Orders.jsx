import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import Badge from "../components/Badge";
import { supabase } from "../lib/supabase";
import { BsBagCheck, BsStarFill, BsChatLeftText } from "react-icons/bs";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        total_amount,
        created_at,
        payment_method,
        status,
        rating,
        feedback_text,
        profiles (
          full_name,
          username
        ),
        order_items (
          quantity,
          medicines (
            name
          )
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil data pesanan:", error);
    } else if (data) {
      setOrders(data);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-6 font-poppins animate-in fade-in duration-500">
      <PageHeader
        title={`Daftar Pesanan (${orders.length})`}
        description="Pantau seluruh pesanan pelanggan dan baca ulasan mereka."
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
        <Table>
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase text-left">ID Pesanan</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase text-left">Pelanggan</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase text-left">Detail Item</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase text-left">Total</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase text-left">Status</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase text-left">Ulasan Pelanggan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500 font-medium">
                  Memuat data pesanan...
                </td>
              </tr>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-gray-800">
                    <div className="flex items-center gap-2">
                      <BsBagCheck className="text-teal-600" />
                      {order.id}
                    </div>
                    <div className="text-[11px] text-gray-400 font-normal mt-1">
                      {new Date(order.created_at).toLocaleDateString("id-ID", {
                        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'
                      })}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-800">{order.profiles?.full_name || "Unknown"}</div>
                    <div className="text-xs text-gray-500">{order.profiles?.username || "-"}</div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      {order.order_items?.map((item, idx) => (
                        <li key={idx}>
                          {item.quantity}x {item.medicines?.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-4 px-6 text-gray-800 font-bold">
                    Rp {(order.total_amount || 0).toLocaleString("id-ID")}
                    <div className="text-[10px] text-gray-400 font-normal mt-1">{order.payment_method}</div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={order.status === "completed" ? "success" : "warning"}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    {order.rating ? (
                      <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 min-w-[200px]">
                        <div className="flex gap-1 text-orange-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <BsStarFill key={i} className={i < order.rating ? "text-orange-400" : "text-gray-200"} />
                          ))}
                        </div>
                        <p className="text-xs text-gray-700 italic flex gap-2 items-start">
                          <BsChatLeftText className="text-orange-300 mt-0.5 shrink-0" />
                          "{order.feedback_text}"
                        </p>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Belum ada ulasan</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-400 font-medium">
                  Belum ada pesanan yang masuk.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
