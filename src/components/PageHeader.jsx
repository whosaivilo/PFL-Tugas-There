import React from 'react';

export default function PageHeader({ title, description, actionButton }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      {actionButton && (
        <div className="mt-4 md:mt-0">
          {actionButton}
        </div>
      )}
    </div>
  );
}