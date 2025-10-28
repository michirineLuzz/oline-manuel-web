# Admin Access Guide

## Cara Akses Admin Login Page

### Melalui URL dengan #admin
- Tambahkan `#admin` di akhir URL
- Contoh: `http://localhost:3001/#admin`
- Atau di production: `https://yoursite.com/#admin`

**Note:** Link "Admin" di menu navigasi hanya muncul setelah login berhasil.

## Login Credentials

Gunakan email dan password yang sudah dibuat di Supabase:
- Email: (yang dibuat di Supabase Authentication > Users)
- Password: (yang dibuat saat setup user)

## Setup Admin User

Jika belum membuat admin user:

1. Buka [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Buka **Authentication** > **Users**
4. Klik **"Add User"** > **"Create new user"**
5. Isi:
   - Email: email admin Anda
   - Password: password yang kuat
   - ✅ Centang "Auto Confirm User"
6. Klik **"Create User"**

## Troubleshooting

### Admin link tidak muncul
- Cek apakah Header component sudah terupdate
- Refresh browser dengan `Ctrl + Shift + R` (hard refresh)

### Login gagal "Invalid credentials"
- Pastikan email/password benar
- Cek di Supabase Dashboard apakah user sudah confirmed
- Pastikan .env.local sudah benar (VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY)

### Halaman blank setelah login
- Buka Console (F12) dan cek error messages
- Pastikan Supabase tables sudah dibuat (run supabase-schema.sql)

## Testing Supabase Connection

Buka browser console (F12) dan jalankan:

```javascript
// Check if Supabase is loaded
console.log(supabase);

// Check current session
supabase.auth.getSession().then(console.log);
```

Jika ada error, periksa:
1. `.env.local` file exists dan memiliki values yang benar
2. Dev server sudah restart setelah update .env.local
3. Supabase project masih active dan running
