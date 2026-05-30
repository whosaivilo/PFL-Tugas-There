import React from 'react';

export default function InputField({ label, type = "text", placeholder, value, onChange, readOnly }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-gray-400 ${
          readOnly ? 'bg-gray-100 text-slate-600 cursor-not-allowed' : ''
        }`}
      />
    </div>
  );
}