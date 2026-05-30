import React from 'react';

export default function SelectField({ label, options = [], value, onChange }) {
  return (
    <div>
      {label && <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{label}</label>}
      <select 
        value={value} 
        onChange={onChange}
        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none text-gray-700 cursor-pointer focus:ring-1 focus:ring-gray-400"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}