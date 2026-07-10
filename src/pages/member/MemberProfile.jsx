import React from "react";
import { BsPersonVcard, BsTelephone, BsEnvelope, BsGeoAlt, BsGenderAmbiguous, BsCalendarDate, BsCheckCircleFill, BsToggleOn } from "react-icons/bs";
import Avatar from "../../components/Avatar";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import { useAuth } from "../../contexts/AuthContext";
import dayjs from "dayjs";

export default function MemberProfile() {
  const { profile } = useAuth();

  if (!profile) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Profil Pribadi" 
        description="Kelola informasi pribadi dan preferensi komunikasi kamu."
      />

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* ── LEFT COLUMN: AVATAR & BASIC INFO ── */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 mx-auto border-4 border-teal-50 rounded-full flex items-center justify-center overflow-hidden bg-teal-100 text-teal-700 text-3xl font-bold">
                {profile.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.full_name || "Avatar"} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  (profile.full_name || profile.username || "US").substring(0, 2).toUpperCase()
                )}
              </div>
              <div className="absolute bottom-0 right-0 bg-teal-500 text-white p-1.5 rounded-full border-2 border-white">
                <BsCheckCircleFill className="text-xs" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">{profile.full_name || profile.username}</h2>
            <p className="text-sm font-medium text-gray-500 mb-4">@{profile.username}</p>
            
            <Badge variant="info">{profile.member_level || "Silver"} Member</Badge>
            
            <hr className="my-6 border-gray-100" />
            
            <div className="text-left space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                  <BsPersonVcard />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold">ID Member</p>
                  <p className="text-sm font-bold text-gray-800">{profile.id.substring(0,8)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                  <BsCalendarDate />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold">Bergabung Sejak</p>
                  <p className="text-sm font-bold text-gray-800">{dayjs(profile.created_at).format('DD MMM YYYY')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: DETAILS ── */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          
          {/* Biodata & Kontak */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Informasi Pribadi & Kontak</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
                  <BsTelephone /> Nomor HP
                </p>
                <p className="text-[15px] font-semibold text-gray-800">{profile.phone || "-"}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
                  <BsEnvelope /> Email
                </p>
                <p className="text-[15px] font-semibold text-gray-800">{profile.email || "-"}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
                  <BsGenderAmbiguous /> Jenis Kelamin
                </p>
                <p className="text-[15px] font-semibold text-gray-800">
                  {profile.gender === "L" ? "Laki-laki" : profile.gender === "P" ? "Perempuan" : "-"}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
                  <BsCalendarDate /> Tanggal Lahir
                </p>
                <p className="text-[15px] font-semibold text-gray-800">{profile.birth_date ? dayjs(profile.birth_date).format('DD MMM YYYY') : "-"}</p>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
                  <BsGeoAlt /> Alamat
                </p>
                <p className="text-[15px] font-semibold text-gray-800">
                  {profile.address || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Pengaturan Preferensi */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Preferensi & Notifikasi</h3>
            
            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                <div>
                  <p className="text-[14px] font-bold text-gray-800">Email Newsletter</p>
                  <p className="text-xs text-gray-500 mt-0.5">Terima info promo & artikel kesehatan via Email.</p>
                </div>
                <BsToggleOn className={`text-3xl ${currentUser.marketing?.subscribeEmail ? "text-teal-500" : "text-gray-300"}`} />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                <div>
                  <p className="text-[14px] font-bold text-gray-800">SMS / WhatsApp Promo</p>
                  <p className="text-xs text-gray-500 mt-0.5">Terima notifikasi diskon kilat langsung ke HP kamu.</p>
                </div>
                <BsToggleOn className={`text-3xl ${currentUser.marketing?.subscribeSMS ? "text-teal-500" : "text-gray-300"}`} />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button type="primary">Simpan Perubahan</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
