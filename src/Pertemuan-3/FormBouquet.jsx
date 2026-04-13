import { useState } from "react";
import InputField from "./Input";

export default function FormBouquet() {
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [alamat, setAlamat] = useState("");
  const [catatan, setCatatan] = useState("");
  const [jenis, setJenis] = useState("");
  const [ukuran, setUkuran] = useState("");
  const [warna, setWarna] = useState(""); // State baru untuk warna
  const [jadwal, setJadwal] = useState("");
  const [pakaiKartu, setPakaiKartu] = useState(false);

  // Fungsi validasi
  const getErrorNama = () => {
    if (!nama) return "Nama wajib diisi";
    if (/\d/.test(nama)) return "Nama tidak boleh ada angka";
    return null;
  };

  const getErrorJumlah = () => {
    if (!jumlah) return "Jumlah wajib diisi";
    if (jumlah <= 0) return "Minimal 1 bouquet";
    return null;
  };

  const getErrorAlamat = () => {
    if (!alamat || alamat.length < 10) return "Alamat minimal 10 karakter";
    return null;
  };

  const isAllValid = () => 
    !getErrorNama() && !getErrorJumlah() && !getErrorAlamat() && 
    jenis !== "" && ukuran !== "" && warna !== "" && jadwal !== "";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Selamat Datang!</h1>
        <p className="text-gray-600 text-lg">Silakan isi custom bouquet Anda di bawah ini</p>
      </div>

      {/* Lebar card kita perbesar (max-w-2xl) agar pas untuk 2 kolom */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6 text-pink-600 border-b pb-2">
          🌸 Rumbai Bouquet Form
        </h2>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          
          {/* Baris 1 */}
          <InputField label="Nama Pemesan" type="text" value={nama} 
            onChange={(e) => setNama(e.target.value)} error={getErrorNama()} />

          <InputField label="Jumlah Bouquet" type="number" value={jumlah} 
            onChange={(e) => setJumlah(e.target.value)} error={getErrorJumlah()} />

          {/* Baris 2 (Alamat kita buat Full Width / 1 kolom saja agar lega) */}
          <div className="md:col-span-2">
            <InputField label="Alamat Pengiriman" type="text" value={alamat} 
              onChange={(e) => setAlamat(e.target.value)} error={getErrorAlamat()} />
          </div>

          {/* Baris 3 */}
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">Jenis Bouquet</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none" 
              value={jenis} onChange={(e) => setJenis(e.target.value)}>
              <option value="">Pilih Jenis...</option>
              <option value="Bunga">Bunga Segar</option>
              <option value="Uang">Money Bouquet</option>
              <option value="Snack">Snack</option>
            </select>
          </div>

          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">Ukuran</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none" 
              value={ukuran} onChange={(e) => setUkuran(e.target.value)}>
              <option value="">Pilih Ukuran...</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          {/* Baris 4: Tambahan Warna Bunga */}
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">Warna Bunga</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none" 
              value={warna} onChange={(e) => setWarna(e.target.value)}>
              <option value="">Pilih Warna...</option>
              <option value="Merah">Merah (Red Rose)</option>
              <option value="Putih">Putih (Lily/White Rose)</option>
              <option value="Pink">Pink (Soft Pink)</option>
              <option value="Kuning">Kuning (Sun Flower)</option>
            </select>
          </div>

          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">Jadwal Pengiriman</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none" 
              value={jadwal} onChange={(e) => setJadwal(e.target.value)}>
              <option value="">Pilih Waktu Antar...</option>
              <option value="Besok">Besok</option>
              <option value="Lusa">Lusa</option>
            </select>
          </div>

          {/* Baris 5: Catatan Pesan (Full Width) */}
          <div className="md:col-span-2">
            <InputField label="Pesan di Kartu Ucapan" type="text" value={catatan} 
              onChange={(e) => setCatatan(e.target.value)} error={null} />
          </div>
        </div>

        {/* Checkbox (Bawah) */}
        <div className="flex items-center mb-6">
          <input type="checkbox" className="w-4 h-4 text-pink-500" checked={pakaiKartu} 
            onChange={(e) => setPakaiKartu(e.target.checked)} />
          <label className="ml-2 text-gray-700 font-medium text-sm">Tambah Bungkus Kado Eksklusif (+Rp 10rb)</label>
        </div>

        {/* Conditional Rendering Ringkasan [cite: 134] */}
        {!isAllValid() ? (
          <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <p className="font-semibold text-xs italic italic">
              ⚠️ Mohon lengkapi semua pilihan di atas.
            </p>
          </div>
        ) : (
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded shadow-sm">
            <p className="font-bold text-md mb-2 underline">Ringkasan Pesanan Anda:</p>
            <div className="grid grid-cols-2 text-xs gap-2">
              <p><strong>Penerima:</strong> {nama}</p>
              <p><strong>Item:</strong> {jumlah}x {ukuran} {jenis}</p>
              <p><strong>Warna:</strong> {warna}</p>
              <p><strong>Jadwal:</strong> {jadwal}</p>
              <p className="col-span-2"><strong>Alamat:</strong> {alamat}</p>
              <p className="col-span-2"><strong>Kartu Ucapan:</strong> {pakaiKartu ? "Ya" : "Tidak"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}