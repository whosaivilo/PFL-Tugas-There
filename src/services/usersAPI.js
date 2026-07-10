import axios from 'axios';
import { supabase } from '../lib/supabase';

export const usersAPI = {
  // Login method is now handled by Supabase Auth (see Login.jsx), keeping this for legacy fallback if needed
  async loginUser(username, password) {
    return { success: false, error: "Gunakan halaman login utama (Supabase Auth)." };
  },

  // Mendaftarkan user baru ke Supabase
  async registerUser(data) {
    try {
      // Create user via Supabase Auth (This might log the admin out, but serves as mockup)
      const { error } = await supabase.auth.signUp({
        email: data.username + "@dummy.com", // dummy email since admin only provides username
        password: data.password,
        options: {
          data: {
            full_name: data.name,
            username: data.username,
            role: data.role || "member"
          }
        }
      });
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("API Error Response:", error.message);
      return { success: false, error: "Gagal mendaftarkan akun. Silakan periksa koneksi." };
    }
  },

  // Mengambil semua data pengguna dari tabel profiles
  async getAllUsers() {
    try {
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) throw error;
      
      const mappedData = data.map(p => ({
        id: p.id,
        name: p.full_name,
        username: p.username,
        role: p.role || 'member',
        status: 'Active',
        loyalty_points: p.loyalty_points
      }));
      return { success: true, data: mappedData };
    } catch (error) {
      console.error("Fetch Users Error:", error.message);
      return { success: false, error: "Gagal mengambil data pengguna." };
    }
  },

  // Mengubah data pengguna (Edit) di tabel profiles
  async updateUser(id, data) {
    try {
      const { error } = await supabase.from('profiles').update({
        full_name: data.name,
        username: data.username,
        role: data.role
      }).eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Update User Error:", error.message);
      return { success: false, error: "Gagal memperbarui data pengguna." };
    }
  },

  // Menghapus data pengguna dari tabel profiles
  async deleteUser(id) {
    try {
      const { error } = await supabase.from('profiles').delete().eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Delete User Error:", error.message);
      return { success: false, error: "Gagal menghapus data pengguna." };
    }
  }
};
