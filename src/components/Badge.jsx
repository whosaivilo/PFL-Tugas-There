export default function Badge({ children, variant = "info" }) {
  const colors = {
    success: "bg-green-100 text-green-700 border-green-200",
    danger: "bg-red-100 text-red-700 border-red-200",
    warning: "bg-orange-100 text-orange-700 border-orange-200",
    info: "bg-blue-100 text-blue-700 border-blue-200",
  };

  return (
    <span className={`${colors[variant]} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border`}>
      {children}
    </span>
  );
}