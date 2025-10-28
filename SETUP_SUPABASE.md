# Supabase Setup Instructions untuk Oline Manuel Website

Panduan lengkap untuk setup admin dashboard dengan Supabase.

## 🚀 Langkah 1: Buat Supabase Project

1. Buka [https://supabase.com](https://supabase.com) dan daftar/login
2. Klik "New Project"
3. Isi detail project:
   - **Name**: `oline-website` (atau nama lain)
   - **Database Password**: Buat password yang kuat (SIMPAN PASSWORD INI!)
   - **Region**: Pilih region terdekat (Southeast Asia jika tersedia)
4. Klik "Create new project" dan tunggu beberapa menit

## 🗄️ Langkah 2: Setup Database

1. Di Supabase dashboard, buka **SQL Editor** (icon di sidebar kiri)
2. Klik "New Query"
3. Copy seluruh isi file `supabase-schema.sql` dan paste ke SQL editor
4. Klik "Run" atau tekan `Ctrl+Enter`
5. Pastikan tidak ada error. Akan muncul pesan sukses di bagian bawah.

**Ini akan membuat:**
- Table `events` - untuk event/show
- Table `gallery_images` - untuk foto gallery  
- Table `videos` - untuk YouTube videos
- Table `profile` - untuk data profile Oline
- Row Level Security policies untuk keamanan
- Data awal (sample data dari constants.ts)

## 🔑 Langkah 3: Setup Authentication

1. Di Supabase dashboard, buka **Authentication** > **Users**
2. Klik "Add User" > "Create new user"
3. Isi:
   - **Email**: Email admin Anda (contoh: `admin@oline.com`)
   - **Password**: Password untuk login admin
   - Biarkan "Auto Confirm User" **tercentang**
4. Klik "Create User"

**⚠️ PENTING**: Simpan email dan password ini. Anda akan menggunakannya untuk login ke Admin Dashboard.

## 🔐 Langkah 4: Dapatkan API Keys

1. Di Supabase dashboard, buka **Settings** (icon gear di sidebar)
2. Klik **API** di menu kiri
3. Copy dua nilai ini:
   - **Project URL** (contoh: `https://xxxxx.supabase.co`)
   - **anon/public key** (anon public)

## 🛠️ Langkah 5: Update Environment Variables

1. Buka file `.env.local` di root project
2. Update nilai berikut:

```env
GEMINI_API_KEY=PLACEHOLDER_API_KEY

# Supabase Configuration
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Replace:**
- `https://xxxxx.supabase.co` dengan Project URL Anda
- `eyJhbGciOi...` dengan anon key Anda (key yang panjang)

3. **SAVE** file `.env.local`

## 🚦 Langkah 6: Test Project

1. Buka terminal di folder project
2. Jalankan development server:

```bash
npm run dev
```

3. Buka browser ke `http://localhost:5173` (atau port yang ditunjukkan)

### Test Frontend (Public)
- Buka halaman **Gallery** - harus menampilkan foto dari database
- Buka halaman **Media** - harus menampilkan videos dari database
- Buka halaman **Profile** - harus menampilkan data profile
- Buka halaman **Events** - akan kosong (belum ada data events)

### Test Admin Dashboard
1. Tambahkan `/admin` di URL atau klik tombol "AdminDashboard" di menu
2. Login dengan:
   - **Email**: Email yang dibuat di Step 3
   - **Password**: Password yang dibuat di Step 3
3. Setelah login, Anda akan masuk ke Admin Dashboard
4. Test CRUD operations:
   - **Events**: Tambah event baru, edit, delete
   - **Gallery**: Tambah foto (paste URL dari Twitter), edit caption/category, delete
   - **Videos**: Tambah YouTube video (paste URL atau ID), edit, delete
   - **Profile**: Klik untuk edit (atau gunakan Supabase dashboard langsung)

## 📝 Cara Menggunakan Admin Dashboard

### Tambah Gallery Image dari Twitter/X:
1. Buka tweet dengan foto di Twitter/X
2. Klik kanan pada foto → **Copy image address**
3. URL akan seperti: `https://pbs.twimg.com/media/xxxxx?format=jpg&name=orig`
4. Paste URL ini di Admin Dashboard → Gallery → Add Image

### Tambah Video dari YouTube:
1. Buka video di YouTube
2. Copy URL dari address bar (contoh: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
3. Atau copy hanya Video ID nya (contoh: `dQw4w9WgXcQ`)
4. Paste di Admin Dashboard → Videos → Add Video

### Tambah Event:
1. Admin Dashboard → Events → Add Event
2. Isi form:
   - **Title**: Nama event
   - **Date**: Format `2025-12-31` atau `31 Desember 2025`
   - **Location**: Tempat event
   - **Description**: Deskripsi singkat
   - **Image URL**: URL gambar event (dari Twitter atau sumber lain)
   - **Ticket URL**: Link pembelian tiket (opsional)

## 🔒 Security & Best Practices

### ✅ Yang SUDAH aman:
- Row Level Security (RLS) aktif di semua tables
- Public hanya bisa READ data
- Hanya authenticated users (admin) yang bisa CREATE/UPDATE/DELETE
- Environment variables tidak ter-commit ke git (ada di `.gitignore`)

### ⚠️ Yang HARUS dilakukan:
1. **JANGAN SHARE** file `.env.local` ke public/git
2. **JANGAN SHARE** Supabase anon key di public (sudah aman karena RLS)
3. Gunakan email & password yang kuat untuk admin
4. Jika project ini public di GitHub, pastikan `.env.local` ada di `.gitignore`

## 🔄 Update Profile Data

Ada 2 cara update profile:

### Cara 1: Lewat Supabase Dashboard (Recommended untuk update besar)
1. Buka Supabase dashboard → **Table Editor**
2. Pilih table `profile`
3. Klik edit (icon pensil) di row pertama
4. Edit data JSON untuk `fun_facts`, `hashtags`, `singles`, `career_timeline`
5. Save

### Cara 2: Lewat Admin Dashboard (Coming soon)
- Feature edit profile via admin dashboard bisa ditambahkan nanti jika diperlukan

## 📱 Deployment ke Production

Setelah setup lokal berhasil, deploy ke Vercel/Netlify:

### Environment Variables di Hosting:
Tambahkan di dashboard hosting (Vercel/Netlify):
- `VITE_SUPABASE_URL` = Project URL Supabase Anda
- `VITE_SUPABASE_ANON_KEY` = Anon key Supabase Anda

## 🆘 Troubleshooting

### Error: "Invalid API key"
- Cek apakah `.env.local` sudah benar
- Restart dev server (`npm run dev`)
- Pastikan format: `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` (bukan typo)

### Error: "Failed to fetch"
- Cek internet connection
- Cek apakah Supabase project masih running
- Cek apakah URL Supabase benar

### Gallery/Videos tidak muncul:
- Buka Supabase dashboard → Table Editor
- Cek apakah data ada di table `gallery_images` dan `videos`
- Jika kosong, re-run SQL schema untuk insert sample data

### Login gagal:
- Cek email/password benar
- Cek di Supabase → Authentication → Users apakah user sudah dibuat
- Pastikan "Email Confirmed" = true

## 🎉 Selesai!

Website Anda sekarang sudah dinamis dengan admin dashboard! Admin bisa update konten tanpa perlu coding.

---

**Questions?** Open issue di GitHub atau kontak developer.
