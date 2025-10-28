# 🚀 Quick Start Guide

Panduan cepat untuk setup website dengan Supabase admin dashboard.

## ⚡ Setup Cepat (10 menit)

### 1. Buat Supabase Project
```
1. Buka https://supabase.com → Sign up/Login
2. New Project → Isi nama & password → Create
3. Tunggu 2-3 menit sampai ready
```

### 2. Setup Database
```
1. Buka SQL Editor di Supabase dashboard
2. Copy isi file 'supabase-schema.sql'
3. Paste & Run
```

### 3. Buat Admin User
```
1. Authentication → Users → Add User
2. Email: admin@oline.com (atau email Anda)
3. Password: [password kuat]
4. Auto Confirm: ✅
```

### 4. Setup API Keys
```
1. Settings → API
2. Copy:
   - Project URL
   - anon public key
3. Paste ke .env.local:
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
```

### 5. Run Website
```bash
npm run dev
```

### 6. Login Admin
```
1. Buka http://localhost:5173
2. Klik "AdminDashboard" di menu atau tambah /admin di URL  
3. Login dengan email & password dari step 3
4. Mulai manage konten!
```

## 📋 Checklist Setelah Setup

- [ ] Gallery menampilkan foto
- [ ] Media menampilkan video
- [ ] Profile menampilkan data
- [ ] Bisa login ke admin dashboard
- [ ] Bisa tambah/edit/delete di admin

## 🎯 Cara Pakai Admin Dashboard

### Tambah Foto (dari Twitter):
1. Buka tweet → Klik kanan foto → Copy image address
2. Admin Dashboard → Gallery → Add Image
3. Paste URL → Pilih category → Save

### Tambah Video (dari YouTube):
1. Copy URL YouTube atau Video ID
2. Admin Dashboard → Videos → Add Video  
3. Paste URL → Isi title → Save

### Tambah Event:
1. Admin Dashboard → Events → Add Event
2. Isi form (title, date, location, dll)
3. Save

---

**Detail lengkap**: Baca `SETUP_SUPABASE.md`

**Troubleshooting**: Lihat section "Troubleshooting" di SETUP_SUPABASE.md
