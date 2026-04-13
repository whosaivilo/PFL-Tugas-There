// Pastikan semua props ini (label, type, value, dll) tertulis di sini
export default function Input({ label, type, value, onChange, error }) {
  return (
    <div className="mb-4 text-left">
      
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {error && (
        <div className="mt-2 p-2 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}
    </div>
  );
}