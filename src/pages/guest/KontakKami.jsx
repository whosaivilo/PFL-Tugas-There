import React, { useState } from "react";
import Button from "../../components/Button";
import InputField from "../../components/InputField";

export default function KontakKami() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pesan Berhasil Terkirim! Terima kasih, tunggu jawaban dari Tim PharmaCare.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="pt-36 pb-20 px-4 md:px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-black text-[#001b3a] mb-2">Hubungi Tim Kami</h1>
        <p className="text-gray-500 mb-8">Isi formulir ini untuk pertanyaan lebih lanjut mengenai layanan PharmaCare.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField 
            label="Nama Lengkap" 
            placeholder="Masukkan nama Anda" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <InputField 
            label="Alamat Email" 
            placeholder="Masukkan email aktif Anda" 
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Isi Pesan</label>
            <textarea 
              rows="5"
              placeholder="Tuliskan pertanyaan atau kendala Anda di sini..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-gray-400"
            ></textarea>
          </div>

          <Button type="primary">
            <span className="w-full text-center bg-orange-500 hover:bg-orange-600 border-none rounded text-white py-2 block">Kirim Pesan</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
