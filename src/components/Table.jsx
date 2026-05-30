import React from 'react';

export default function Table({ children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden mb-6">
      <table className="w-full text-left border-collapse">
        {children}
      </table>
    </div>
  );
}