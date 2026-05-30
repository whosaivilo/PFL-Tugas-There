import React from 'react';
import { BsShieldPlus, BsCashStack, BsBriefcase, BsExclamationTriangle } from 'react-icons/bs';
import { FiChevronDown } from "react-icons/fi";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import StatCard from '../components/StatCard';
import SummaryCard from '../components/SummaryCard'; // 💡 Import komponen baru kamu

export default function Dashboard() {
  return (
    <div className="w-full">
      {/* Header Dashboard */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[24px] font-bold text-gray-800 mb-1">Dashboard</h2>
          <p className="text-[14px] font-medium text-gray-600">A quick data overview of the inventory.</p>
        </div>
        <button className="flex items-center gap-8 bg-white border border-gray-300 text-gray-800 px-4 py-2.5 rounded text-[14px] font-medium hover:bg-gray-50">
          Download Report
          <FiChevronDown className="text-gray-600" />
        </button>
      </div>
    
      {/* 4 KOTAK STATISTIK ATAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Inventory Status" 
          value="Good" 
          icon={<BsShieldPlus className="text-[32px] text-[#10b981] mb-2" />} 
          borderColor="border-[#10b981]" 
          subtext="View Detailed Report" 
          bgFooter="bg-[#d1fae5]" 
        />
        <StatCard 
          title="Revenue : Jan 2022" 
          value="Rs. 8,55,875" 
          icon={<BsCashStack className="text-[32px] text-[#eab308] mb-2" />} 
          borderColor="border-[#eab308]" 
          subtext="View Detailed Report" 
          bgFooter="bg-[#fef08a]" 
        />
        <StatCard 
          title="Medicines Available" 
          value="298" 
          icon={<BsBriefcase className="text-[32px] text-[#38bdf8] mb-2" />} 
          borderColor="border-[#38bdf8]" 
          subtext="Visit Inventory" 
          bgFooter="bg-[#bae6fd]" 
        />
        <StatCard 
          title="Medicine Shortage" 
          value="01" 
          icon={<BsExclamationTriangle className="text-[32px] text-[#ef4444] mb-2" />} 
          borderColor="border-[#ef4444]" 
          subtext="Resolve Now" 
          bgFooter="bg-[#fecaca]" 
        />
      </div>

      {/* 4 KOTAK RINGKASAN BAWAH (Sekarang bersih rapi pakai SummaryCard) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <SummaryCard 
          title="Inventory"
          actionText="Go to Configuration"
          actionIcon={<HiOutlineChevronDoubleRight className="text-gray-400" />}
          value1="298" label1="Total no of Medicines"
          value2="24" label2="Medicine Groups"
        />

        <SummaryCard 
          title="Quick Report"
          actionText="January 2022"
          actionIcon={<FiChevronDown />}
          value1="70,856" label1="Qty of Medicines Sold"
          value2="5,288" label2="Invoices Generated"
        />

        <SummaryCard 
          title="My Pharmacy"
          actionText="Go to User Management"
          actionIcon={<HiOutlineChevronDoubleRight className="text-gray-400" />}
          value1="04" label1="Total no of Suppliers"
          value2="05" label2="Total no of Users"
        />

        <SummaryCard 
          title="Customers"
          actionText="Go to Customers Page"
          actionIcon={<HiOutlineChevronDoubleRight className="text-gray-400" />}
          value1="845" label1="Total no of Customers"
          value2="Adalimumab" label2="Frequently bought Item"
        />

      </div>
    </div>
  );
}