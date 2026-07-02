import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import Modal from '../components/Modal';
import SegmentCard from '../components/SegmentCard';
import InputField from '../components/InputField';
import { BsTagsFill, BsHeartPulseFill, BsShieldPlus } from 'react-icons/bs';
import { supabase } from '../lib/supabase';

export default function Segmentation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({ loyal: 0, new: 0, churn: 0 });
  const [topPatients, setTopPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Fetch profiles to count members
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, member_level, loyalty_points')
        .eq('role', 'member');

      // Fetch orders to calculate segments based on order count
      const { data: orders, error: orderError } = await supabase
        .from('orders')
        .select('user_id');

      if (!profileError && !orderError) {
        const orderCounts = {};
        orders.forEach(order => {
          if (order.user_id) {
            orderCounts[order.user_id] = (orderCounts[order.user_id] || 0) + 1;
          }
        });

        let loyal = 0, newMember = 0, churn = 0;
        const patientList = [];

        profiles.forEach(profile => {
          const count = orderCounts[profile.id] || 0;
          if (count >= 3) {
            loyal++;
          } else if (count === 0) {
            newMember++;
          } else {
            churn++;
          }

          if (count > 0) {
            patientList.push({
              name: profile.full_name,
              level: profile.member_level,
              orders: count,
              points: profile.loyalty_points
            });
          }
        });

        patientList.sort((a, b) => b.orders - a.orders);
        setTopPatients(patientList.slice(0, 3));
        setStats({ loyal, new: newMember, churn });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const segments = [
    { title: "Pasien VIP (Loyal)", count: stats.loyal, icon: <BsHeartPulseFill />, color: "text-emerald-500", bg: "bg-emerald-50", desc: "Berbelanja lebih dari 3 kali. Terus berikan reward." },
    { title: "Pelanggan Biasa", count: stats.churn, icon: <BsTagsFill />, color: "text-blue-500", bg: "bg-blue-50", desc: "Pernah belanja 1-2 kali. Berpotensi untuk ditarik kembali." },
    { title: "Member Baru", count: stats.new, icon: <BsShieldPlus />, color: "text-pink-500", bg: "bg-pink-50", desc: "Baru mendaftar namun belum pernah melakukan transaksi." },
  ];

  return (
    <div className="p-6 font-poppins">
      <PageHeader 
        title="Segmentasi Pasien (Differentiate)" 
        description="Pengelompokan otomatis berdasarkan riwayat transaksi dan aktivitas member." 
        actionButton={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800"
          >
            + Buat Segmen Baru
          </button>
        }
      />

      {loading ? (
        <p className="text-center text-gray-500 my-10">Menganalisis data segmentasi...</p>
      ) : (
        <>
          {/* GRID KARTU SEGMEN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {segments.map((seg, index) => (
              <SegmentCard
                key={index}
                title={seg.title}
                count={seg.count}
                icon={seg.icon}
                color={seg.color}
                bg={seg.bg}
                desc={seg.desc}
              />
            ))}
          </div>

          {/* TOP PASIEN PRIORITAS */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-md font-bold text-gray-800 mb-4">Top Pasien Prioritas (Berdasarkan Transaksi)</h3>
            <ul className="space-y-3">
              {topPatients.map((patient, idx) => (
                <li key={idx} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-bold text-gray-800">{patient.name}</p>
                    <p className="text-xs text-gray-500">Total Transaksi: {patient.orders}x | Poin: {patient.points}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    patient.level === 'Platinum' ? 'bg-violet-100 text-violet-700' :
                    patient.level === 'Gold' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    Tier {patient.level}
                  </span>
                </li>
              ))}
              {topPatients.length === 0 && (
                <p className="text-sm text-gray-500 italic py-4">Belum ada pasien yang melakukan transaksi.</p>
              )}
            </ul>
          </div>
        </>
      )}

      {/* MODAL BUAT SEGMEN */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Buat Segmen Pasien Baru">
        <form className="space-y-4">
          <InputField label="Nama Segmen" placeholder="Contoh: Pasien Hipertensi" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kriteria Segmen</label>
            <textarea className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none" rows="3" placeholder="Contoh: Pasien dengan riwayat pembelian obat Amlodipine..."></textarea>
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 mt-4">Konfirmasi Segmen</button>
        </form>
      </Modal>
    </div>
  );
}