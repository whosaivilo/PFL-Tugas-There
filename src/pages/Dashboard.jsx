import React, { useEffect, useState } from 'react';
import { BsShieldPlus, BsCashStack, BsBriefcase, BsExclamationTriangle } from 'react-icons/bs';
import { FiChevronDown } from "react-icons/fi";
import StatCard from '../components/StatCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { supabase } from '../lib/supabase'; // Import Supabase Client

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    // Mengambil data pesanan sekaligus join dengan tabel order_items dan medicines
    // Ini kehebatan Supabase Relational Query
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        total_amount,
        created_at,
        order_items (
          quantity,
          medicines (
            group_name
          )
        )
      `)
      .order('created_at', { ascending: true });

    if (error) {
      console.error("Gagal mengambil data Analytics:", error);
      setIsLoading(false);
      return;
    }

    setOrders(data || []);
    
    // Calculate basic KPIs
    const revenue = (data || []).reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
    setTotalRevenue(revenue);
    setTotalOrders((data || []).length);
    setIsLoading(false);
  };

  // Process Data for Line Chart (Revenue Trend by Date)
  const revenueByDate = orders.reduce((acc, order) => {
    // Ambil format YYYY-MM-DD dari timestamp created_at
    const date = order.created_at ? order.created_at.split('T')[0] : 'Unknown';
    if (!acc[date]) acc[date] = 0;
    acc[date] += Number(order.total_amount || 0);
    return acc;
  }, {});
  
  const lineChartData = Object.keys(revenueByDate).map(date => ({
    name: date,
    Revenue: revenueByDate[date]
  })).sort((a, b) => new Date(a.name) - new Date(b.name));

  // Process Data for Pie Chart (Sales by Category)
  const salesByCategory = orders.reduce((acc, order) => {
    if (order.order_items && Array.isArray(order.order_items)) {
      order.order_items.forEach(item => {
        // Karena kita men-join tabel medicines, data kategorinya ada di dalam item.medicines.group_name
        const cat = item.medicines?.group_name || 'Lainnya';
        if (!acc[cat]) acc[cat] = 0;
        acc[cat] += item.quantity || 0;
      });
    }
    return acc;
  }, {});

  const pieChartData = Object.keys(salesByCategory).map(cat => ({
    name: cat,
    value: salesByCategory[cat]
  }));

  const COLORS = ['#14b8a6', '#f97316', '#3b82f6', '#8b5cf6', '#ec4899', '#eab308'];

  // Dummy data jika tabel orders benar-benar kosong (hanya untuk estetika presentasi)
  const isDataEmpty = orders.length === 0;
  const displayLineData = !isDataEmpty ? lineChartData : [
    { name: 'Belum ada data', Revenue: 0 }
  ];
  const displayPieData = !isDataEmpty && pieChartData.length > 0 ? pieChartData : [
    { name: 'Belum ada data', value: 1 }
  ];

  return (
    <div className="w-full animate-in fade-in duration-500">
      {/* Header Dashboard */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[24px] font-bold text-gray-800 mb-1">Dashboard Analytics</h2>
          <p className="text-[14px] font-medium text-gray-600">A quick overview of real-time transactions.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-800 px-4 py-2.5 rounded text-[14px] font-medium hover:bg-gray-50 shadow-sm transition-colors">
          Download Report
          <FiChevronDown className="text-gray-600" />
        </button>
      </div>
    
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
          subtext="Updated just now" 
          bgFooter="bg-[#bae6fd]" 
        />
        <StatCard 
          title="Total Pendapatan" 
          value={`Rp ${totalRevenue.toLocaleString('id-ID')}`} 
          icon={<BsCashStack className="text-[32px] text-[#10b981] mb-2" />} 
          borderColor="border-[#10b981]" 
          subtext="Berdasarkan data Supabase" 
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
          value="0" 
          icon={<BsExclamationTriangle className="text-[32px] text-[#ef4444] mb-2" />} 
          borderColor="border-[#ef4444]" 
          subtext="Semua sistem sehat" 
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
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Penjualan per Kategori Obat</h3>
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

    </div>
  );
}