import React from 'react';
import { BsShieldPlus, BsCashStack, BsBriefcase, BsExclamationTriangle } from 'react-icons/bs';
import { FiChevronDown } from "react-icons/fi";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

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
    
      {/* 4 KOTAK STATISTIK ATAS (Sama persis border dan ukurannya) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Card 1: Good */}
        <div className="bg-white rounded border border-[#10b981] flex flex-col h-[150px]">
          <div className="flex-1 flex flex-col items-center justify-center pt-2">
            <BsShieldPlus className="text-[32px] text-[#10b981] mb-2" />
            <h3 className="text-[20px] font-bold text-gray-800 leading-none mb-1">Good</h3>
            <p className="text-[13px] font-medium text-gray-600">Inventory Status</p>
          </div>
          <div className="bg-[#d1fae5] py-2 flex items-center justify-center gap-1 text-[12px] text-gray-700 font-medium cursor-pointer">
            View Detailed Report <HiOutlineChevronDoubleRight />
          </div>
        </div>

        {/* Card 2: Revenue */}
        <div className="bg-white rounded border border-[#eab308] flex flex-col h-[150px]">
          <div className="flex-1 flex flex-col items-center justify-center pt-2">
            <BsCashStack className="text-[32px] text-[#eab308] mb-2" />
            <h3 className="text-[20px] font-bold text-gray-800 leading-none mb-1">Rs. 8,55,875</h3>
            <p className="text-[13px] font-medium text-gray-600 flex items-center gap-1">
              Revenue : <span className="text-gray-800">Jan 2022 <FiChevronDown className="inline"/></span>
            </p>
          </div>
          <div className="bg-[#fef08a] py-2 flex items-center justify-center gap-1 text-[12px] text-gray-700 font-medium cursor-pointer">
            View Detailed Report <HiOutlineChevronDoubleRight />
          </div>
        </div>

        {/* Card 3: Medicines Available */}
        <div className="bg-white rounded border border-[#38bdf8] flex flex-col h-[150px]">
          <div className="flex-1 flex flex-col items-center justify-center pt-2">
            <BsBriefcase className="text-[32px] text-[#38bdf8] mb-2" />
            <h3 className="text-[20px] font-bold text-gray-800 leading-none mb-1">298</h3>
            <p className="text-[13px] font-medium text-gray-600">Medicines Available</p>
          </div>
          <div className="bg-[#bae6fd] py-2 flex items-center justify-center gap-1 text-[12px] text-gray-700 font-medium cursor-pointer">
            Visit Inventory <HiOutlineChevronDoubleRight />
          </div>
        </div>

        {/* Card 4: Medicine Shortage */}
        <div className="bg-white rounded border border-[#ef4444] flex flex-col h-[150px]">
          <div className="flex-1 flex flex-col items-center justify-center pt-2">
            <BsExclamationTriangle className="text-[32px] text-[#ef4444] mb-2" />
            <h3 className="text-[20px] font-bold text-gray-800 leading-none mb-1">01</h3>
            <p className="text-[13px] font-medium text-gray-600">Medicine Shortage</p>
          </div>
          <div className="bg-[#fecaca] py-2 flex items-center justify-center gap-1 text-[12px] text-gray-700 font-medium cursor-pointer">
            Resolve Now <HiOutlineChevronDoubleRight />
          </div>
        </div>

      </div>

      {/* 4 KOTAK RINGKASAN BAWAH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Box 1: Inventory */}
        <div className="bg-white border border-gray-200 rounded p-5">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
            <h3 className="font-bold text-gray-800 text-[16px]">Inventory</h3>
            <span className="text-[13px] font-medium text-gray-600 flex items-center gap-1 cursor-pointer">
              Go to Configuration <HiOutlineChevronDoubleRight className="text-gray-400" />
            </span>
          </div>
          <div className="flex justify-between px-2 pt-2">
            <div className="w-1/2">
              <p className="text-[22px] font-bold text-gray-800 mb-1">298</p>
              <p className="text-[13px] font-medium text-gray-600">Total no of Medicines</p>
            </div>
            <div className="w-1/2">
              <p className="text-[22px] font-bold text-gray-800 mb-1">24</p>
              <p className="text-[13px] font-medium text-gray-600">Medicine Groups</p>
            </div>
          </div>
        </div>

        {/* Box 2: Quick Report */}
        <div className="bg-white border border-gray-200 rounded p-5">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
            <h3 className="font-bold text-gray-800 text-[16px]">Quick Report</h3>
            <span className="text-[13px] font-medium text-gray-800 flex items-center gap-1 cursor-pointer">
              January 2022 <FiChevronDown />
            </span>
          </div>
          <div className="flex justify-between px-2 pt-2">
            <div className="w-1/2">
              <p className="text-[22px] font-bold text-gray-800 mb-1">70,856</p>
              <p className="text-[13px] font-medium text-gray-600">Qty of Medicines Sold</p>
            </div>
            <div className="w-1/2">
              <p className="text-[22px] font-bold text-gray-800 mb-1">5,288</p>
              <p className="text-[13px] font-medium text-gray-600">Invoices Generated</p>
            </div>
          </div>
        </div>

        {/* Box 3: My Pharmacy */}
        <div className="bg-white border border-gray-200 rounded p-5">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
            <h3 className="font-bold text-gray-800 text-[16px]">My Pharmacy</h3>
            <span className="text-[13px] font-medium text-gray-600 flex items-center gap-1 cursor-pointer">
              Go to User Management <HiOutlineChevronDoubleRight className="text-gray-400" />
            </span>
          </div>
          <div className="flex justify-between px-2 pt-2">
            <div className="w-1/2">
              <p className="text-[22px] font-bold text-gray-800 mb-1">04</p>
              <p className="text-[13px] font-medium text-gray-600">Total no of Suppliers</p>
            </div>
            <div className="w-1/2">
              <p className="text-[22px] font-bold text-gray-800 mb-1">05</p>
              <p className="text-[13px] font-medium text-gray-600">Total no of Users</p>
            </div>
          </div>
        </div>

        {/* Box 4: Customers */}
        <div className="bg-white border border-gray-200 rounded p-5">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
            <h3 className="font-bold text-gray-800 text-[16px]">Customers</h3>
            <span className="text-[13px] font-medium text-gray-600 flex items-center gap-1 cursor-pointer">
              Go to Customers Page <HiOutlineChevronDoubleRight className="text-gray-400" />
            </span>
          </div>
          <div className="flex justify-between px-2 pt-2">
            <div className="w-1/2">
              <p className="text-[22px] font-bold text-gray-800 mb-1">845</p>
              <p className="text-[13px] font-medium text-gray-600">Total no of Customers</p>
            </div>
            <div className="w-1/2">
              <p className="text-[22px] font-bold text-gray-800 mb-1">Adalimumab</p>
              <p className="text-[13px] font-medium text-gray-600">Frequently bought Item</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}