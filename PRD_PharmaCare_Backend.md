# PRODUCT REQUIREMENTS DOCUMENT (PRD) - PharmaCare CRM Backend Integration

## 1. OVERVIEW & TUJUAN PROYEK
Dokumen ini berfungsi sebagai instruksi *blueprint* komprehensif untuk mengimplementasikan sistem autentikasi, manajemen *role*, desain *database* relasional, serta integrasi CRUD penuh menggunakan Supabase pada aplikasi PharmaCare CRM yang saat ini masih menggunakan `localStorage`. Penggantian UI harus diminimalkan, fokus utama adalah memigrasikan logika data ke *backend* (Supabase).

**Spesifikasi Tech Stack**
- **Frontend:** React JS, Tailwind CSS, Recharts (Analytics)
- **Backend & Database:** Supabase (PostgreSQL, Auth, RLS, Triggers)
- **State Management:** React Hooks & Supabase JS Client

---

## 2. MANAJEMEN ROLE & OTORISASI
Sistem menggunakan *Role-Based Access Control* (RBAC) dengan tiga tingkatan hak akses utama:

| Role | Deskripsi Hak Akses | Halaman yang Dapat Diakses |
| :--- | :--- | :--- |
| **Admin** | Memiliki kontrol penuh terhadap manajemen inventori obat, pelanggan, dan analitik. | `/admin` (Dashboard Analytics), Inventory, Data Pasien, Segmentasi, Interaksi |
| **Member** | Pengguna terdaftar yang dapat berbelanja obat dan mendapatkan poin loyalitas. | `/member` (Dashboard Poin), Katalog Obat, Riwayat Transaksi, Loyalty, Resep |
| **Guest** | Pengguna umum yang belum masuk ke sistem. | Landing Page Utama (`/`), Kemitraan, Katalog, Kontak, Login, Register |

---

## 3. DESAIN DATABASE (SUPABASE SCHEMA)
Eksekusi *script* SQL berikut di Supabase SQL Editor untuk membangun struktur tabel yang mendukung operasional apotek:

```sql
-- Hapus tipe lama jika sudah pernah dibuat sebelumnya agar tidak error
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS member_tier CASCADE;
DROP TYPE IF EXISTS order_status CASCADE;

-- Enums untuk Role, Tier, dan Status Pesanan
CREATE TYPE user_role AS ENUM ('admin', 'member', 'guest');
CREATE TYPE member_tier AS ENUM ('Silver', 'Gold', 'Platinum');
CREATE TYPE order_status AS ENUM ('pending', 'completed', 'cancelled');

-- 1. TABEL PROFILES (Ekstensi dari auth.users)
-- (Catatan: Ini menggantikan fungsi tabel 'users' manual milikmu sebelumnya)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    role user_role DEFAULT 'member'::user_role,
    loyalty_points INT DEFAULT 0 CHECK (loyalty_points >= 0),
    member_level member_tier DEFAULT 'Silver'::member_tier,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. TABEL MEDICINES (Inventori Obat)
CREATE TABLE public.medicines (
    id TEXT PRIMARY KEY, -- Format custom misal: MED-001
    name TEXT NOT NULL,
    group_name TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    stock INT DEFAULT 0 CHECK (stock >= 0),
    expiry_date DATE,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. TABEL CUSTOMERS (Data Pasien Eksternal / Sinkronisasi Segmentasi)
CREATE TABLE public.customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    segment TEXT DEFAULT 'New', -- Active, High Value, Churn
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. TABEL ORDERS (Transaksi)
CREATE TABLE public.orders (
    id TEXT PRIMARY KEY, -- Format custom misal: TRX-XXXX
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, 
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    points_earned INT DEFAULT 0,
    payment_method TEXT DEFAULT 'Transfer Bank',
    status order_status DEFAULT 'completed'::order_status,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. TABEL ORDER_ITEMS (Detail Barang Belanja)
CREATE TABLE public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    medicine_id TEXT REFERENCES public.medicines(id) ON DELETE RESTRICT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

---

## 4. RELASI TABEL
Berikut adalah hubungan logis antar entitas database PharmaCare:
- `auth.users` **(1:1)** `public.profiles` via `id` (Menyimpan data profil dari autentikasi).
- `public.profiles` **(1:N)** `public.orders` via `user_id` (Satu member dapat memiliki banyak transaksi belanja).
- `public.orders` **(1:N)** `public.order_items` via `order_id` (Setiap transaksi memiliki rincian obat yang dibeli. Jika pesanan dihapus, rincian ikut terhapus otomatis / Cascade).
- `public.medicines` **(1:N)** `public.order_items` via `medicine_id` (Melindungi data obat dari penghapusan *Restrict* jika obat tersebut sudah pernah masuk ke dalam catatan transaksi).

---

## 5. ATURAN AKSES DATA (ROW LEVEL SECURITY - RLS)
Aktifkan RLS pada seluruh tabel dan terapkan *policy* berikut untuk mengamankan data secara *native* di Supabase:

```sql
-- Aktifkan RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- KELOMPOK HELPER FUNCTION UNTUK MENGECEK ROLE
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- POLICY: PROFILES
CREATE POLICY "User can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admin can manage all profiles" ON public.profiles FOR ALL USING (get_user_role() = 'admin');

-- POLICY: MEDICINES (Katalog & Inventori)
CREATE POLICY "Anyone can view medicines" ON public.medicines FOR SELECT TO public USING (true);
CREATE POLICY "Admin can manage medicines" ON public.medicines FOR ALL USING (get_user_role() = 'admin');

-- POLICY: CUSTOMERS
CREATE POLICY "Admin can manage customers" ON public.customers FOR ALL USING (get_user_role() = 'admin');

-- POLICY: ORDERS
CREATE POLICY "Members can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Members can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin can manage all orders" ON public.orders FOR ALL USING (get_user_role() = 'admin');

-- POLICY: ORDER_ITEMS
CREATE POLICY "Members can view own order items" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Members can insert own order items" ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Admin can view all order items" ON public.order_items FOR SELECT USING (get_user_role() = 'admin');
```

---

## 6. LOGIKA BISNIS OTOMATIS (TRIGGER & FUNCTIONS)
### Sistem Poin, Auto-Tiering, dan Pengurangan Stok
Gunakan *database trigger* untuk menghitung poin, menaikkan level member, dan memotong stok obat secara otomatis setiap kali ada pesanan baru yang berhasil dibuat.

- **Aturan Poin:** Setiap kelipatan Rp 10.000 dari `total_amount` menghasilkan 1 Poin.
- **Aturan Tiering:** Silver (< 3000 poin), Gold (3000 - 8000 poin), Platinum (> 8000 poin).

```sql
CREATE OR REPLACE FUNCTION process_new_order()
RETURNS TRIGGER AS $$
DECLARE
    total_poin INT;
    new_tier member_tier;
BEGIN
    IF (NEW.status = 'completed' AND NEW.user_id IS NOT NULL) THEN
        -- 1. Hitung poin baru
        NEW.points_earned := FLOOR(NEW.total_amount / 10000);
        
        -- 2. Update poin di profil user
        UPDATE public.profiles 
        SET loyalty_points = loyalty_points + NEW.points_earned
        WHERE id = NEW.user_id;
        
        -- 3. Cek total poin terbaru untuk update Tier
        SELECT loyalty_points INTO total_poin FROM public.profiles WHERE id = NEW.user_id;
        
        IF total_poin >= 8000 THEN
            new_tier := 'Platinum'::member_tier;
        ELSIF total_poin >= 3000 THEN
            new_tier := 'Gold'::member_tier;
        ELSE
            new_tier := 'Silver'::member_tier;
        END IF;
        
        UPDATE public.profiles SET member_level = new_tier WHERE id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_process_order
    BEFORE INSERT OR UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION process_new_order();
```

### Auto-Profile Creation (Auth Trigger)
Sistem ini memastikan setiap kali ada pengguna yang mendaftar (masuk ke `auth.users`), profil mereka otomatis dibuat di tabel `public.profiles`.

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, username, role)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'username', 
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'member'::user_role)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger untuk memanggil fungsi saat pengguna baru mendaftar
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

---

## 7. RENCANA IMPLEMENTASI BERTAHAP (FOR AI AGENT)
Arahkan AI Coding Agent untuk mengerjakan integrasi ini dalam 5 tahapan terstruktur untuk menghindari *code breakage*:

**Tahap 1: Setup Supabase Database & Auth Trigger**
- Jalankan skema SQL di *dashboard* Supabase (Pembuatan Tabel, RLS, Fungsi Trigger).
- Tambahkan *trigger* otomatis di mana saat `auth.users` terdaftar, profilnya di-insert otomatis ke tabel `public.profiles`.
- Ubah konfigurasi klien di React JS untuk menghubungkan `@supabase/supabase-js`.

**Tahap 2: Migrasi Autentikasi**
- Ganti sistem login `localStorage` di `Login.jsx` & `Register.jsx` dengan fungsi `supabase.auth.signInWithPassword()` dan `supabase.auth.signUp()`.
- Sesuaikan `App.jsx` dan `Protected Routes` agar membaca *role* pengguna dari sesi Supabase (memanggil data dari tabel `profiles`), lalu mengarahkan mereka ke `/admin` atau `/member`.

**Tahap 3: Migrasi Halaman Inventori & Katalog (CRUD Obat)**
- Ubah *state* `Inventory.jsx` (Admin) agar membaca data dari `supabase.from('medicines').select('*')`.
- Integrasikan fungsi *Insert*, *Update* (termasuk tambah stok otomatis), dan *Delete* ke tabel `medicines`.
- Ubah halaman Katalog Obat di `KatalogProduk.jsx` agar mengambil *array* obat dari Supabase secara langsung *(real-time)* alih-alih data `json` statis.

**Tahap 4: Migrasi Keranjang & Transaksi Belanja**
- Ganti fungsi *Checkout* lokal pada keranjang belanja Member menjadi *Query Insert* berantai: *Insert* pesanan ke tabel `orders`, lalu ambil `order_id` yang dihasilkan untuk meng-*insert* ke tabel `order_items`.
- Pastikan pengurangan stok pada `medicines` dilakukan (bisa lewat aplikasi atau *Database Function* tambahan).
- Pastikan *Trigger* `process_new_order` di Supabase berjalan dan Poin Loyalty Member otomatis diperbarui.

**Tahap 5: Sinkronisasi Analytics Dashboard Admin**
- Ubah *state* di `Dashboard.jsx` agar mem-*fetch* semua data pesanan dari `supabase.from('orders')`.
- Olah data dari Supabase agar dapat dibaca langsung oleh komponen `Recharts` (Pie Chart untuk kategori, Line Chart untuk tren).
- Buat agar *Stat Cards* (Total Transaksi, Pendapatan) sinkron sepenuhnya dengan *database production*.
