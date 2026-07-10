import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import Modal from '../components/Modal';
import SegmentCard from '../components/SegmentCard';
import Table from '../components/Table';
import { BsTagsFill, BsHeartPulseFill, BsShieldPlus, BsEnvelopePaper, BsCheckCircleFill } from 'react-icons/bs';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export default function Segmentation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({ loyal: 0, new: 0, churn: 0 });
  const [allPatients, setAllPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedSegment, setSelectedSegment] = useState('Semua'); // 'Semua', 'VIP', 'Biasa', 'Baru'
  
  // States for Promo Modal
  const [promoTarget, setPromoTarget] = useState(null); // patient object or "Segmen X"
  const [isSending, setIsSending] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Fetch profiles to count members
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, username, member_level, loyalty_points')
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
          let segment = '';
          
          if (count >= 3) {
            loyal++;
            segment = 'VIP';
          } else if (count === 0) {
            newMember++;
            segment = 'Baru';
          } else {
            churn++;
            segment = 'Biasa';
          }

          patientList.push({
            id: profile.id,
            name: profile.full_name || profile.username,
            level: profile.member_level || 'Silver',
            orders: count,
            points: profile.loyalty_points || 0,
            segment: segment
          });
        });

        patientList.sort((a, b) => b.orders - a.orders);
        setAllPatients(patientList);
        setStats({ loyal, new: newMember, churn });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const segments = [
    { key: "VIP", title: "Pasien VIP (Loyal)", count: stats.loyal, icon: <BsHeartPulseFill />, color: "text-emerald-500", bg: "bg-emerald-50", desc: "Berbelanja lebih dari 3 kali. Terus berikan reward." },
    { key: "Biasa", title: "Pelanggan Biasa", count: stats.churn, icon: <BsTagsFill />, color: "text-blue-500", bg: "bg-blue-50", desc: "Pernah belanja 1-2 kali. Berpotensi untuk ditarik kembali." },
    { key: "Baru", title: "Member Baru", count: stats.new, icon: <BsShieldPlus />, color: "text-pink-500", bg: "bg-pink-50", desc: "Baru mendaftar namun belum pernah melakukan transaksi." },
  ];

  const filteredPatients = selectedSegment === 'Semua' 
    ? allPatients 
    : allPatients.filter(p => p.segment === selectedSegment);

  const handleOpenPromoModal = (target) => {
    setPromoTarget(target);
    setPromoMessage("");
    setIsModalOpen(true);
  };

  const handleSendPromo = (e) => {
    e.preventDefault();
    if (!promoMessage) {
      toast.error("Mohon isi pesan promo terlebih dahulu.");
      return;
    }
    
    setIsSending(true);
    
    // Simulate sending email
    setTimeout(() => {
      setIsSending(false);
      setIsModalOpen(false);
      
      const targetName = typeof promoTarget === 'string' ? `Segmen ${promoTarget}` : promoTarget.name;
      toast.success(`Promo berhasil dikirimkan ke ${targetName}!`, {
        icon: <BsCheckCircleFill className="text-green-500" />
      });
    }, 1500);
  };

  return (
    <div className="p-6 font-poppins animate-in fade-in duration-500">
      <PageHeader 
        title="Segmentasi Pasien (Differentiate)" 
        description="Pengelompokan otomatis berdasarkan riwayat transaksi. Klik kartu untuk melihat daftar pasien." 
        actionButton={
          selectedSegment !== 'Semua' && (
            <button 
              onClick={() => handleOpenPromoModal(selectedSegment)}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-teal-700 transition flex items-center gap-2 shadow-sm shadow-teal-500/20"
            >
              <BsEnvelopePaper /> Kirim Promo ke {selectedSegment}
            </button>
          )
        }
      />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* GRID KARTU SEGMEN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-8">
            {segments.map((seg, index) => (
              <SegmentCard
                key={index}
                title={seg.title}
                count={seg.count}
                icon={seg.icon}
                color={seg.color}
                bg={seg.bg}
                desc={seg.desc}
                onClick={() => setSelectedSegment(selectedSegment === seg.key ? 'Semua' : seg.key)}
                isActive={selectedSegment === seg.key}
              />
            ))}
          </div>

          {/* TABEL PASIEN */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-md font-bold text-gray-800">
                Daftar Pasien: <span className="text-teal-600">{selectedSegment === 'Semua' ? 'Semua Segmen' : `Segmen ${selectedSegment}`}</span>
              </h3>
              <span className="text-xs font-semibold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                Total: {filteredPatients.length} Pasien
              </span>
            </div>
            
            <Table>
              <thead className="bg-white border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase text-left">Nama Pasien</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase text-center">Segmen</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase text-center">Tier Member</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase text-center">Total Transaksi</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase text-center">Poin Loyalty</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase text-center">Aksi CRM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-800">
                        {patient.name}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          patient.segment === 'VIP' ? 'bg-emerald-100 text-emerald-700' :
                          patient.segment === 'Biasa' ? 'bg-blue-100 text-blue-700' :
                          'bg-pink-100 text-pink-700'
                        }`}>
                          {patient.segment}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          patient.level === 'Platinum' ? 'bg-violet-100 text-violet-700 border-violet-200' :
                          patient.level === 'Gold' ? 'bg-amber-100 text-amber-700 border-amber-200' : 
                          'bg-gray-100 text-gray-600 border-gray-200'
                        }`}>
                          {patient.level}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center font-semibold text-gray-700">
                        {patient.orders}x
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-orange-500">
                        {patient.points} Pts
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          onClick={() => handleOpenPromoModal(patient)}
                          className="text-xs font-bold text-teal-600 hover:text-white bg-teal-50 hover:bg-teal-600 px-3 py-1.5 rounded-lg transition-colors border border-teal-100"
                        >
                          Send Promo
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-10 text-center text-gray-400 font-medium">
                      Tidak ada pasien di segmen ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </>
      )}

      {/* MODAL KIRIM PROMO */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Kirim Promo / Penawaran Khusus">
        <form onSubmit={handleSendPromo} className="space-y-4">
          <div className="bg-teal-50 border border-teal-100 p-4 rounded-lg mb-4">
            <p className="text-sm text-teal-800">
              Mulai kampanye CRM dengan mengirimkan promo eksklusif kepada: <br/>
              <strong className="text-teal-900 font-black text-base mt-1 block">
                {typeof promoTarget === 'string' ? `Semua Pasien di Segmen ${promoTarget}` : promoTarget?.name}
              </strong>
            </p>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Pesan Penawaran / Kode Promo</label>
            <textarea 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 resize-none text-sm" 
              rows="4" 
              placeholder="Contoh: Halo! Nikmati diskon 20% untuk pembelian vitamin bulan ini dengan kode VIT20. Yuk tebus sekarang!"
              value={promoMessage}
              onChange={(e) => setPromoMessage(e.target.value)}
            ></textarea>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition font-medium text-sm">Batal</button>
            <button 
              type="submit" 
              disabled={isSending} 
              className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-bold text-sm shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Mengirim...
                </>
              ) : (
                <>
                  <BsEnvelopePaper /> Kirim Sekarang
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}