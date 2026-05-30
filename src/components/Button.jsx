export default function Button({ children, type = "primary", onClick }) {
  const variants = {
    primary: "bg-[#00a6a6] hover:bg-[#008b8b] text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-700",
    dark: "bg-slate-900 hover:bg-slate-800 text-white", // 💡 Tambah ini biar sinkron dengan halaman lain
  };

  return (
    <button 
      onClick={onClick} 
      className={`${variants[type]} px-4 py-2 rounded text-[14px] font-medium transition-all active:scale-95 shadow-sm flex items-center gap-2`}
    >
      {children}
    </button>
  );
}