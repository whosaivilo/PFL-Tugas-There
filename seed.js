import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

let envContent = '';
try { envContent = fs.readFileSync('.env', 'utf-8'); } catch (e) {
  try { envContent = fs.readFileSync('.env.local', 'utf-8'); } catch (e) {}
}

const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^"|"$/g, '');
  }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;
if(!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key not found in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Mulai membuat data dummy (Katalog, User, dan Pesanan)...");
  
  // 1. Insert Products based on top categories (Obat Bebas, Vitamin, Herbal, Alat Kesehatan, Ibu & Bayi)
  const products = [
    { name: 'Panadol Extra', group_name: 'Obat Bebas', price: 12000, stock: 100, image_url: 'https://images.unsplash.com/photo-1584308666744-24d5e4a83852?w=300&q=80' },
    { name: 'Promag Tablet', group_name: 'Obat Bebas', price: 8000, stock: 150, image_url: 'https://images.unsplash.com/photo-1584308666744-24d5e4a83852?w=300&q=80' },
    { name: 'Enervon-C Multivitamin', group_name: 'Vitamin', price: 45000, stock: 200, image_url: 'https://images.unsplash.com/photo-1584308666744-24d5e4a83852?w=300&q=80' },
    { name: 'Tolak Angin Cair', group_name: 'Herbal', price: 35000, stock: 300, image_url: 'https://images.unsplash.com/photo-1584308666744-24d5e4a83852?w=300&q=80' },
    { name: 'Omron Thermometer', group_name: 'Alat Kesehatan', price: 120000, stock: 50, image_url: 'https://images.unsplash.com/photo-1584308666744-24d5e4a83852?w=300&q=80' },
    { name: 'Minyak Telon Lang', group_name: 'Ibu & Bayi', price: 25000, stock: 100, image_url: 'https://images.unsplash.com/photo-1584308666744-24d5e4a83852?w=300&q=80' },
    { name: 'Blackmores Fish Oil', group_name: 'Vitamin', price: 180000, stock: 80, image_url: 'https://images.unsplash.com/photo-1584308666744-24d5e4a83852?w=300&q=80' },
    { name: 'Betadine Antiseptik', group_name: 'Obat Bebas', price: 15000, stock: 120, image_url: 'https://images.unsplash.com/photo-1584308666744-24d5e4a83852?w=300&q=80' },
  ];
  
  const { data: insertedProds, error: prodErr } = await supabase.from('medicines').insert(products).select();
  if(prodErr) {
    console.error("Gagal menambahkan katalog produk:", prodErr);
    return;
  }
  console.log(`Berhasil menambahkan ${insertedProds.length} produk katalog.`);

  // 2. Create Dummy Users (User A, User B, User C)
  console.log("Mendaftarkan User Dummy...");
  const dummyUsers = [];
  const letters = ['A', 'B', 'C'];
  for (let i = 0; i < 3; i++) {
    const email = `dummy${letters[i].toLowerCase()}_${Date.now()}@example.com`;
    const password = "password123";
    const { data: authData, error: authErr } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: `User Dummy ${letters[i]}` }
      }
    });
    if(authErr) {
      console.log(`Gagal mendaftar ${email}:`, authErr.message);
    } else if(authData.user) {
      console.log(`User ${letters[i]} berhasil didaftarkan: ${email}`);
      dummyUsers.push(authData.user.id);
    }
  }

  let activeUsers = [...dummyUsers];
  if(activeUsers.length === 0) {
    console.log("Fallback: Menggunakan user member yang sudah ada di database...");
    const { data: profiles } = await supabase.from('profiles').select('id').eq('role', 'member').limit(3);
    activeUsers = profiles ? profiles.map(p => p.id) : [];
  }

  // 3. Create Dummy Orders
  if (activeUsers.length > 0 && insertedProds.length >= 3) {
    console.log("Membuat Pesanan Dummy...");
    for (let i = 0; i < activeUsers.length; i++) {
      const userId = activeUsers[i];
      const orderId = `TRX-DUMMY-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const p1 = insertedProds[i % insertedProds.length];
      const p2 = insertedProds[(i + 1) % insertedProds.length];
      const p3 = insertedProds[(i + 2) % insertedProds.length];
      const totalAmount = p1.price + p2.price + p3.price;
      const points = Math.floor(totalAmount / 100);

      const { error: orderErr } = await supabase.from('orders').insert({
        id: orderId,
        user_id: userId,
        total_amount: totalAmount,
        points_earned: points,
        payment_method: 'Transfer Bank',
        status: 'completed',
        rating: 5,
        feedback_text: `Pesanan sangat memuaskan dari User Dummy ${letters[i] || 'Acak'}`
      });

      if(!orderErr) {
        await supabase.from('order_items').insert([
          { order_id: orderId, medicine_id: p1.id, quantity: 1, unit_price: p1.price },
          { order_id: orderId, medicine_id: p2.id, quantity: 1, unit_price: p2.price },
          { order_id: orderId, medicine_id: p3.id, quantity: 1, unit_price: p3.price }
        ]);
        
        const { data: prof } = await supabase.from('profiles').select('loyalty_points').eq('id', userId).single();
        if(prof) {
          let newLevel = "Silver";
          const newPoints = (prof.loyalty_points || 0) + points;
          if (newPoints >= 1000) newLevel = "Gold";
          if (newPoints >= 5000) newLevel = "Platinum";
          
          await supabase.from('profiles').update({ loyalty_points: newPoints, member_level: newLevel }).eq('id', userId);
        }
        console.log(`Pesanan ${orderId} berhasil ditambahkan untuk User ${letters[i] || 'Acak'}.`);
      } else {
        console.error("Gagal membuat pesanan:", orderErr);
      }
    }
  }
  
  console.log("✅ SEED DATA SELESAI!");
}

seed();
