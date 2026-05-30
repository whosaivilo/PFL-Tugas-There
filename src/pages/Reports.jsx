import React from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar'; // 💡 1. IMPORT PROGRESSBAR KAMU
import { BsCashStack, BsReceiptCutoff } from 'react-icons/bs';

export default function Reports() {
  return (
    <div className="p-6 font-poppins">
      <PageHeader 
        title="Reports" 
        description="Overall reports related to the pharmacy." 
      />

      {/* 2 KOTAK STATCARD ATAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <StatCard
          title="Total Sales Report" value="Rs. 8,55,875" icon={<BsCashStack className="text-[32px] text-[#eab308] mb-2" />}
          borderColor="border-[#eab308]" subtext="View Detailed Report" bgFooter="bg-yellow-50 text-yellow-600"
        />
        <StatCard
          title="Payment Report" value="523" icon={<BsReceiptCutoff className="text-[32px] text-[#38bdf8] mb-2" />}
          borderColor="border-[#38bdf8]" subtext="View Detailed Report" bgFooter="bg-blue-50 text-blue-600"
        />
      </div>

      {/* 💡 2. TAMBAHKAN SEKSI INI BIAR PROGRESS BAR KAMU BENERAN MUNCUL DI REPORTS */}
      <div className="mt-6 bg-white border border-gray-200 rounded p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 text-[16px] mb-4 pb-2 border-b border-gray-100">
          Monthly Sales Target Achievement
        </h3>
        
        <div className="space-y-5">
          <ProgressBar label="Generic Medicine Sales Target" percentage={85} color="bg-emerald-500" />
          
          <ProgressBar label="Diabetes Medicine Sales Target" percentage={60} color="bg-amber-500" />
          
          <ProgressBar label="Hypertension Medicine Sales Target" percentage={45} color="bg-cyan-500" />
          
          <ProgressBar label="OTC Medicine Sales Target" percentage={92} color="bg-indigo-500" />
        </div>
      </div>

    </div>
  );
}