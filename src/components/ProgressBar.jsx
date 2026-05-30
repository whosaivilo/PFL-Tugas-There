import React from 'react';

export default function ProgressBar({ label, percentage, color = "bg-blue-600" }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-semibold text-gray-600">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden border border-gray-200/50">
        <div 
          className={`${color} h-full rounded-full transition-all duration-500`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}