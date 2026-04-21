export default function CafeTable({ cafes }) {
  return (
    <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-2xl rounded-[2.5rem] shadow-xl border border-white/80 overflow-hidden animate-fade-in relative z-10">
      <div className="overflow-x-auto p-2 sm:p-6">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-200/60 text-slate-400 text-xs tracking-wider uppercase">
              <th className="p-4 font-bold">No</th>
              <th className="p-4 font-bold">Nama Cafe</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold text-center">Rating</th>
              <th className="p-4 font-bold">Lokasi</th>
              <th className="p-4 font-bold">Fasilitas Utama</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/50">
            {cafes.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-white/50 transition-colors text-sm text-slate-700"
              >
                <td className="p-4 font-medium text-slate-400">{index + 1}</td>
                <td className="p-4 font-bold text-slate-800">{item.name}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      item.status === "Buka"
                        ? "bg-green-100/70 text-green-700 border border-green-200/50"
                        : "bg-red-100/70 text-red-700 border border-red-200/50"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-center font-bold text-amber-500">
                  ⭐ {item.rating}
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-xs">
                      {item.location.street}
                    </span>
                    <span className="font-bold text-slate-800">
                      {item.location.city}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {item.facilities.wifi && (
                      <span className="bg-blue-50/80 text-blue-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-blue-100">
                        WiFi
                      </span>
                    )}
                    <span className="bg-slate-100/80 text-slate-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-slate-200/50">
                      Parkir {item.facilities.parkingCapacity}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}