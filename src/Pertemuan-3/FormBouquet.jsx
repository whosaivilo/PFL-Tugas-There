import { useState } from "react";
import InputField from "./Input";

export default function FormBouquet() {
    const [nama, setNama] = useState("");
    const[jumlah, setJumlah] = useState("");
    const[catatan, setCatatan] = useState("");
    const[jenis, setJenis] = useState("");
    const[ukuran, setUkuran] = useState(false);
    const[pakaiKartu, setPakaiKartu] = useState(false);

    const getErrorNama = () => {
        if (!nama) return "Nama tidak boleh kosong";
        if(/\d/.test(nama)) return "Nama tidak boleh mengandung angka";
        return null;
    };
    const getErrorJumlah = () => {
        if (!jumlah) return "Jumlah tidak boleh kosong";
        if (isNaN(jumlah)) return "Jumlah harus berupa angka";
        if (jumlah <= 0) return "Jumlah harus lebih dari 0";
        return null;
    };
    const getErrorCatatan = () => {
        if (catatan.length > 200) return "Catatan tidak boleh lebih dari 200 karakter";
        return null;
    };
    const isAllValid = () => 
        !getErrorNama() && !getErrorJumlah() && !getErrorCatatan();
    ;

    return(
        
    <div classname="flex flex-col items-center justify-center m-5 p-5 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">Form Custom Bouquet</h2>

        <InputField label="Nama Pemesan" type="text" value={nama} 
          onChange={(e) => setNama(e.target.value)} error={getErrorNama()} />

        <InputField label="Jumlah Bouquet" type="number" value={jumlah} 
          onChange={(e) => setJumlah(e.target.value)} error={getErrorJumlah()} />

        {/* Select 1 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Jenis Bouquet</label>
          <select className="w-full p-2 border border-gray-300 rounded" value={jenis} onChange={(e) => setJenis(e.target.value)}>
            <option value="">Pilih Jenis...</option>
            <option value="Bunga">Bunga Segar</option>
            <option value="Uang">Money Bouquet</option>
            <option value="Snack">Snack</option>
          </select>
        </div>

        {/* Select 2 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Ukuran</label>
          <select className="w-full p-2 border border-gray-300 rounded" value={ukuran} onChange={(e) => setUkuran(e.target.value)}>
            <option value="">Pilih Ukuran...</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        <InputField label="Pesan Kartu" type="text" value={catatan} 
          onChange={(e) => setCatatan(e.target.value)} error={getErrorCatatan()} />

        {/* Checkbox */}
        <div className="flex items-center mb-4">
          <input type="checkbox" checked={pakaiKartu} onChange={(e) => setPakaiKartu(e.target.checked)} />
          <label className="ml-2 text-gray-700">Tambah Bungkus Kado (+Rp 10rb)</label>
        </div>

        {/* 3. Conditional Rendering Hasil/Error (Sesuai Modul) */}
        {!isAllValid ? (
          <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p className="font-semibold text-sm">
              Silakan lengkapi form dengan benar (cek tanda merah di atas). 
            </p>
          </div>
        ) : (
          <div className="mt-4 p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
            <p className="font-semibold">
              Ringkasan Pesanan: 
            </p>
            <ul className="text-sm">
              <li>Nama: {nama}</li>
              <li>Pesanan: {jumlah} {ukuran} {jenis}</li>
              <li>Kado: {pakaiKartu ? "Ya" : "Tidak"}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}