import React, { useEffect, useState } from 'react';
import { BsShieldPlus, BsCashStack, BsBriefcase, BsExclamationTriangle, BsArrowRightShort, BsPerson, BsBox, BsGraphUp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [recentMembers, setRecentMembers] = useState([]);
  
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    
    // 1. Fetch Orders (descending for recent orders table)
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select(`
        id,
        total_amount,
        created_at,
        status,
        profiles ( full_name ),
        order_items (
          quantity,
          medicines (
            name,
            group_name
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (!ordersError && ordersData) {
      setOrders(ordersData);
      const revenue = ordersData.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
      setTotalRevenue(revenue);
      setTotalOrders(ordersData.length);
    }

    // 2. Fetch Low Stock Medicines
    const { data: stockData } = await supabase
      .from('medicines')
      .select('id, name, stock')
      .lt('stock', 15)
      .order('stock', { ascending: true })
      .limit(5);
      
    if (stockData) setLowStock(stockData);

    // 3. Fetch Recent Members
    const { data: membersData } = await supabase
      .from('profiles')
      .select('id, full_name, created_at, loyalty_points')
      .eq('role', 'member')
      .order('created_at', { ascending: false })
      .limit(5);
      
    if (membersData) setRecentMembers(membersData);

    setIsLoading(false);
  };

  // Process Data for Line Chart (Revenue Trend by Date)
  const revenueByDate = orders.reduce((acc, order) => {
    const date = order.created_at ? order.created_at.split('T')[0] : 'Unknown';
    if (!acc[date]) acc[date] = 0;
    acc[date] += Number(order.total_amount || 0);
    return acc;
  }, {});
  
  const lineChartData = Object.keys(revenueByDate).map(date => ({
    name: date,
    Revenue: revenueByDate[date]
  })).sort((a, b) => new Date(a.name) - new Date(b.name));

  // Process Data for Pie Chart & Top Selling
  const salesByCategory = {};
  const salesByProduct = {};

  orders.forEach(order => {
    if (order.order_items && Array.isArray(order.order_items)) {
      order.order_items.forEach(item => {
        // Category
        const cat = item.medicines?.group_name || 'Lainnya';
        if (!salesByCategory[cat]) salesByCategory[cat] = 0;
        salesByCategory[cat] += item.quantity || 0;
        
        // Product
        const prodName = item.medicines?.name || 'Unknown Product';
        if (!salesByProduct[prodName]) salesByProduct[prodName] = 0;
        salesByProduct[prodName] += item.quantity || 0;
      });
    }
  });

  const pieChartData = Object.keys(salesByCategory).map(cat => ({
    name: cat,
    value: salesByCategory[cat]
  }));

  const topProducts = Object.keys(salesByProduct)
    .map(name => ({ name, sold: salesByProduct[name] }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

  const COLORS = ['#14b8a6', '#f97316', '#3b82f6', '#8b5cf6', '#ec4899', '#eab308'];

  const isDataEmpty = orders.length === 0;
  const displayLineData = !isDataEmpty ? lineChartData : [{ name: 'Belum ada data', Revenue: 0 }];
  const displayPieData = !isDataEmpty && pieChartData.length > 0 ? pieChartData : [{ name: 'Belum ada data', value: 1 }];

  return (
    <div className="font-poppins pb-10">
    
      {/* 4 KOTAK STATISTIK ATAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <StatCard 
          title="Total Transaksi" 
          value={totalOrders.toString()} 
          icon={<BsBriefcase className="text-[32px] text-[#38bdf8] mb-2" />} 
          borderColor="border-[#38bdf8]" 
          subtext="Total pesanan masuk" 
          bgFooter="bg-[#bae6fd]" 
        />
        <StatCard 
          title="Total Pendapatan" 
          value={`Rp ${totalRevenue.toLocaleString('id-ID')}`} 
          icon={<BsCashStack className="text-[32px] text-[#10b981] mb-2" />} 
          borderColor="border-[#10b981]" 
          subtext="Akumulasi seluruh transaksi" 
          bgFooter="bg-[#d1fae5]" 
        />
        <StatCard 
          title="Average Order Value" 
          value={`Rp ${totalOrders > 0 ? Math.round(totalRevenue / totalOrders).toLocaleString('id-ID') : '0'}`} 
          icon={<BsShieldPlus className="text-[32px] text-[#eab308] mb-2" />} 
          borderColor="border-[#eab308]" 
          subtext="Rata-rata per transaksi" 
          bgFooter="bg-[#fef08a]" 
        />
        <StatCard 
          title="CRM Alerts" 
          value={lowStock.length.toString()} 
          icon={<BsExclamationTriangle className="text-[32px] text-[#ef4444] mb-2" />} 
          borderColor="border-[#ef4444]" 
          subtext={lowStock.length > 0 ? "Ada stok obat menipis!" : "Semua sistem sehat"} 
          bgFooter="bg-[#fecaca]" 
        />
      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
             <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Tren Pendapatan Harian</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayLineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 12}} 
                  tickFormatter={(val) => `Rp ${val / 1000}k`}
                  dx={-10}
                />
                <Tooltip 
                  formatter={(value) => [`Rp ${value.toLocaleString('id-ID')}`, 'Revenue']}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="Revenue" stroke="#14b8a6" strokeWidth={3} dot={{r: 4, fill: '#14b8a6', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Penjualan per Kategori</h3>
          <div className="flex-1 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={displayPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {displayPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={isDataEmpty ? '#e2e8f0' : COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} Pcs`, 'Terjual']}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* NEW WIDGETS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
             <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Recent Orders (Kiri, 2 Kolom) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <BsBriefcase className="text-teal-500" /> Transaksi Terbaru
            </h3>
            <Link to="/admin/orders" className="text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center">
              Lihat Semua <BsArrowRightShort className="text-xl" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">ID Pesanan</th>
                  <th className="pb-3 font-semibold">Pelanggan</th>
                  <th className="pb-3 font-semibold">Waktu</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 text-sm font-bold text-gray-700">{order.id}</td>
                    <td className="py-3 text-sm text-gray-600">{order.profiles?.full_name || 'Unknown'}</td>
                    <td className="py-3 text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 text-sm font-bold text-teal-600">
                      Rp {order.total_amount?.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 text-right">
                      <Badge variant={order.status === 'completed' ? 'success' : order.status === 'pending' ? 'warning' : 'danger'}>
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-400 text-sm">Belum ada transaksi.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts (Kanan, 1 Kolom) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <BsExclamationTriangle className="text-red-500" /> Peringatan Stok
            </h3>
            <Link to="/admin/inventory" className="text-sm font-bold text-teal-600 hover:text-teal-700">Restock</Link>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            {lowStock.length > 0 ? (
              lowStock.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 border border-red-100 bg-red-50/50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Sisa di gudang:</p>
                  </div>
                  <div className="bg-red-500 text-white font-black text-sm px-2 py-1 rounded">
                    {item.stock}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 py-8">
                <BsBox className="text-4xl text-gray-300 mb-2" />
                <p className="text-sm font-medium text-gray-500">Stok obat aman.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ADDITIONAL WIDGETS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
             <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Top Selling Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
            <BsGraphUp className="text-blue-500" /> Obat Terlaris Bulan Ini
          </h3>
          <div className="space-y-4">
            {topProducts.map((prod, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-black text-sm shrink-0">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{prod.name}</h4>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-blue-400 h-full rounded-full" style={{ width: `${Math.min(100, (prod.sold / (topProducts[0]?.sold || 1)) * 100)}%` }}></div>
                  </div>
                </div>
                <div className="text-sm font-bold text-gray-600 w-16 text-right">
                  {prod.sold} <span className="text-[10px] text-gray-400 font-normal">Pcs</span>
                </div>
              </div>
            ))}
            {topProducts.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-4">Belum ada data penjualan.</p>
            )}
          </div>
        </div>

        {/* Recent Members */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <BsPerson className="text-purple-500" /> Member Baru
            </h3>
            <Link to="/admin/members" className="text-sm font-bold text-teal-600 hover:text-teal-700">Lihat Semua</Link>
          </div>
          <div className="space-y-3">
            {recentMembers.map(member => (
              <div key={member.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                    {member.full_name?.charAt(0).toUpperCase() || 'M'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{member.full_name}</h4>
                    <p className="text-xs text-gray-400">
                      Bergabung: {new Date(member.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>
                <Badge className="bg-gray-100 text-gray-600 border-none font-medium">{member.loyalty_points || 0} Poin</Badge>
              </div>
            ))}
            {recentMembers.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-4">Belum ada member mendaftar.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}