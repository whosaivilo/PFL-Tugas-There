export default function CafeCard({ item }) {
  const igUsername = item.contact.instagram;
  const igLink = `https://instagram.com/${igUsername.replace("@", "")}`;
  return (
    <div className="group relative w-full h-[480px] sm:h-[520px] rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/40">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>

      <div className="absolute top-6 left-6">
        <span className="bg-white/20 backdrop-blur-xl border border-white/30 text-white text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full">
          {item.status}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 m-4 p-6 rounded-[2rem] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h2 className="text-lg lg:text-xl font-bold text-white leading-tight drop-shadow-md truncate">
            {item.name}
          </h2>

          <span className="shrink-0 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
            ⭐ {item.rating}
          </span>
        </div>

        <p className="text-white/80 text-xs mb-5 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        <div className="space-y-2 mb-6 text-[11px] lg:text-xs text-white/80 font-medium">
          <div className="flex items-start gap-2">
            <span className="shrink-0 w-16 font-bold text-white/90 uppercase tracking-wider text-[9px] mt-0.5">
              Lokasi
            </span>
            <span className="shrink-0 mt-0.5">:</span>
            <span className="text-white">{item.location.city}</span>
          </div>

          <div className="flex items-start gap-2">
            <span className="shrink-0 w-16 font-bold text-white/90 uppercase tracking-wider text-[9px] mt-0.5">
              Fasilitas
            </span>
            <span className="shrink-0 mt-0.5">:</span>
            <span className="text-white">
              {item.facilities.wifi ? "High-Speed WiFi" : "No WiFi"}
            </span>
          </div>
        </div>
        <a
          href={igLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white/90 hover:bg-white text-slate-900 font-bold text-sm py-3 rounded-xl transition-colors shadow-sm mt-auto flex justify-center items-center gap-2"
        >
          <span>📸</span>
          {igUsername}
        </a>
      </div>
    </div>
  );
}
