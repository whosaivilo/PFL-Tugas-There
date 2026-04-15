import { useState } from "react";
import InputField from "./Input";

export default function FormBouquet() {
  const [nama, setNama] = useState("");
  const [telepon, setTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jenis, setJenis] = useState("");
  const [ukuran, setUkuran] = useState("");
  const [warna, setWarna] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [catatan, setCatatan] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validasi
  const getErrorNama = () => {
    if (!nama) return "Nama wajib diisi";
    if (/\d/.test(nama)) return "Nama tidak boleh ada angka";
    if (nama.length < 3) return "Minimal 3 karakter";
    return null;
  };

  const getErrorTelepon = () => {
    if (!telepon) return "Nomor WA wajib diisi";
    if (isNaN(telepon)) return "Gunakan format angka saja";
    if (telepon.length < 10) return "Nomor minimal 10 digit";
    return null;
  };

  const getErrorAlamat = () => {
    if (!alamat) return "Alamat kirim wajib diisi";
    if (alamat.length < 10) return "Alamat minimal 10 karakter";
    return null;
  };

  const isAllValid = () => 
    !getErrorNama() && !getErrorTelepon() && !getErrorAlamat() && 
    jenis && ukuran && warna && jadwal;

  const handleInputChange = (setter, val) => {
    setter(val);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white p-3 rounded-3xl shadow-2xl w-full max-w-5xl md:flex gap-4 overflow-hidden">
        
        <div className="md:w-2/5 relative p-2 flex flex-col h-[400px] md:h-auto">
      
          <img src="./img/bouquet.jpg" alt="Bouquet" className="w-full h-full object-cover rounded-2xl" />
          <div className="absolute bottom-10 left-10 right-10 text-white z-10 text-left">
            <h1 className="text-4xl font-bold italic drop-shadow-lg leading-tight">Bloomtique<br/>Custom Bouquet</h1>
          </div>
          <div className="absolute inset-2 bg-gradient-to-t from-rose-900/60 via-transparent to-transparent rounded-2xl"></div>
        </div>

        <div className="md:w-3/5 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2 text-left text-pink-700">Order Details</h2>
            <div className="space-y-1">
              <div className="grid grid-cols-2 gap-4">
                <InputField 
                label="Nama Lengkap" 
                type="text" value={nama} 
                onChange={(e) => handleInputChange(setNama, e.target.value)} 
                error={getErrorNama()} />
                <InputField 
                label="Nomor WhatsApp" 
                type="text" 
                value={telepon} 
                onChange={(e) => handleInputChange(setTelepon, e.target.value)} 
                error={getErrorTelepon()} />
              </div>
              <InputField label="Alamat Pengiriman" type="text" value={alamat} onChange={(e) => handleInputChange(setAlamat, e.target.value)} error={getErrorAlamat()} />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4 text-left">
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">Jenis Bouquet</label>
                  <select className="w-full p-3 border-2 border-gray-200 rounded-xl outline-none focus:border-rose-400 bg-white" value={jenis} onChange={(e) => handleInputChange(setJenis, e.target.value)}>
                    <option value="">Pilih...</option>
                    <option value="Bunga Segar">Bunga Segar</option>
                    <option value="Uang">Money Bouquet</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>
                <div className="mb-4 text-left">
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">Ukuran</label>
                  <select className="w-full p-3 border-2 border-gray-300 rounded-xl outline-none focus:border-rose-400 bg-white" 
                  value={ukuran} 
                  onChange={(e) => handleInputChange(setUkuran, e.target.value)}>
                    <option value="">Pilih...</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4 text-left">
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">Warna Paper</label>
                  <select className="w-full p-3 border-2 border-gray-300 rounded-xl outline-none focus:border-rose-400 bg-white" value={warna} onChange={(e) => handleInputChange(setWarna, e.target.value)}>
                    <option value="">Pilih...</option>
                    <option value="Merah">Merah</option>
                    <option value="Putih">Putih</option>
                    <option value="Pink">Pink</option>
                  </select>
                </div>
                <div className="mb-4 text-left">
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">Jadwal Kirim</label>
                  <select className="w-full p-3 border-2 border-gray-300 rounded-xl outline-none focus:border-rose-400 bg-white" value={jadwal} onChange={(e) => handleInputChange(setJadwal, e.target.value)}>
                    <option value="">Pilih...</option>
                    <option value="Besok">Besok</option>
                    <option value="Lusa">Lusa</option>
                  </select>
                </div>
              </div>

              <InputField label="Catatan / Pesan Kartu" type="textarea" value={catatan} onChange={(e) => handleInputChange(setCatatan, e.target.value)} error={null} />
            </div>
          </div>

         
           
            {isAllValid() && !isSubmitted && (
              <button onClick={() => setIsSubmitted(true)} 
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all transform hover:scale-105 uppercase tracking-wide">
                Konfirmasi Pesanan 
              </button>
            )}

            {!isAllValid() && (
              <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700  text-xs text-center">
                 Lengkapi formulir untuk memproses pesanan.
              </div>
            )}

            {isSubmitted && isAllValid() && (
              <div className="p-5 bg-blue-50 border-l-8 border-blue-500 text-blue-800 rounded-2xl shadow-inner animate-pulse text-left">
                <p className="font-bold underline mb-2 text-sm">Ringkasan Pesanan Berhasil:</p>
                <div className="grid grid-cols-2 text-[10px] gap-2">
                  <p><strong>Penerima:</strong> {nama}</p>
                  <p><strong>WA:</strong> {telepon}</p>
                  <p><strong>Item:</strong> {ukuran} {jenis}</p>
                  <p><strong>Jadwal:</strong> {jadwal}</p>
                  <p className="col-span-2"><strong>Alamat:</strong> {alamat}</p>
                </div>
              </div>
            )}
         
        </div>
      </div>
    </div>
  );
}