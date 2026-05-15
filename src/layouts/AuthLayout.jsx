import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    // Memastikan font-sans (yang sudah diatur jadi Poppins di tailwind.css) aktif
    <div className="min-h-screen flex w-full bg-white font-sans text-[#111]">
      
      {/* BAGIAN KIRI: Area Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 md:px-20 lg:px-28 py-10">
        <div className="w-full max-w-md mx-auto">
          <Outlet />
        </div>
      </div>

      {/* BAGIAN KANAN: Gambar Daun Monstera */}
      {/* Gambar diberi jarak (p-4 atau p-6) dari ujung layar sesuai desain asli */}
      <div className="hidden lg:block lg:w-1/2 p-6">
        <div 
          className="w-full h-full bg-cover bg-center rounded-[2.5rem]"
          
        ><img 
  src="/img/background.jpg" 
  alt="Background PharmaCare" 
  className="w-full h-full object-cover rounded-[2rem]" 
/></div>
      </div>

    </div>
  );
}

