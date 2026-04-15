export default function Input({ label, type, value, onChange, error, placeholder }) {
  const Input = type === "textarea" ? "textarea" : "input";

  return (
    <div className="mb-4 text-left">
      <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
        {label}
      </label>
      
      <Input
        type={type === "textarea" ? undefined : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={type === "textarea" ? 3 : undefined}
        className={`w-full p-3 border ${error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-rose-400'} rounded-xl focus:ring-0 outline-none transition-all bg-white`}
      />
      
      {error && (
        <div className="mt-1.5 p-2 bg-red-100 border-l-4 border-red-500 text-red-700 shadow-sm">
          <p className="text-xs">{error}</p>
        </div>
      )}
    </div>
  );
}