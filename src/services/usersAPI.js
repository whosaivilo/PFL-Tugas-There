import axios from 'axios';

const API_URL = "https://isgfrpnvokhjrutmcmpc.supabase.co/rest/v1/users";
const API_KEY = "sb_publishable_N3V_Ju0fpIuMEDcbTj0HKg_zVI5du9G";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const usersAPI = {
  // Login dengan mencari username & password yang cocok
  async loginUser(username, password) {
    try {
      // Memanggil REST API Supabase mencari baris yang usernamenya sama persis
      const response = await axios.get(`${API_URL}?username=eq.${username}`, { headers });
      
      const users = response.data; // Response GET berbentuk Array
      
      if (users.length === 0) {
        return { success: false, error: "Username tidak ditemukan di database." };
      }

      const user = users[0];
      
      if (user.password !== password) {
        return { success: false, error: "Password salah." };
      }
      
      if (user.status === "Inactive") {
        return { success: false, error: "Akun Anda tidak aktif. Hubungi kami untuk bantuan." };
      }

      return { success: true, user };
    } catch (error) {
      return { success: false, error: "Terjadi kesalahan koneksi ke server database." };
    }
  },

  // Mendaftarkan user baru ke Supabase
  async registerUser(data) {
    try {
      // 1. Cek apakah username sudah dipakai orang lain
      const checkRes = await axios.get(`${API_URL}?username=eq.${data.username}`, { headers });
      if (checkRes.data.length > 0) {
        return { success: false, error: "Username sudah dipakai, silakan gunakan username yang lain." };
      }

      const payload = {
        name: data.name,
        username: data.username,
        password: data.password,
        role: data.role || "member",
        status: "Active"
      };

      await axios.post(API_URL, payload, { headers });
      return { success: true };
    } catch (error) {
      console.error("API Error Response:", error.response?.data || error.message);
      return { success: false, error: "Gagal mendaftarkan akun. Silakan periksa koneksi." };
    }
  },

  // Mengambil semua data pengguna
  async getAllUsers() {
    try {
      const response = await axios.get(API_URL, { headers });
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Fetch Users Error:", error.response?.data || error.message);
      return { success: false, error: "Gagal mengambil data pengguna." };
    }
  },

  // Mengubah data pengguna (Edit)
  async updateUser(id, data) {
    try {
      await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
      return { success: true };
    } catch (error) {
      console.error("Update User Error:", error.response?.data || error.message);
      return { success: false, error: "Gagal memperbarui data pengguna." };
    }
  },

  // Menghapus data pengguna (Sama persis polanya dengan lab)
  async deleteUser(id) {
    try {
      await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
      return { success: true };
    } catch (error) {
      console.error("Delete User Error:", error.response?.data || error.message);
      return { success: false, error: "Gagal menghapus data pengguna." };
    }
  }
};
