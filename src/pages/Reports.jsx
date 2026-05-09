import React from 'react';
import PageHeader from '../components/PageHeader';
import { BsCashStack, BsReceiptCutoff } from 'react-icons/bs';

export default function Reports() {
  return (
    <div className="p-6">
      <PageHeader 
        title="Reports" 
        description="Overall reports related to the pharmacy." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Sales Report Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center text-2xl">
              <BsCashStack />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Rs. 8,55,875</h3>
              <p className="text-sm text-gray-500 font-medium">Total Sales Report</p>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <span className="text-yellow-600 text-sm font-semibold cursor-pointer hover:underline">
              View Detailed Report &gt;&gt;&gt;
            </span>
          </div>
        </div>

        {/* Payments Report Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-2xl">
              <BsReceiptCutoff />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">523</h3>
              <p className="text-sm text-gray-500 font-medium">Payment Report</p>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <span className="text-blue-600 text-sm font-semibold cursor-pointer hover:underline">
              View Detailed Report &gt;&gt;&gt;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}