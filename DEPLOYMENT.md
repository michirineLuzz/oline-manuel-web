# Deployment Guide - Oline Manuel Website

Panduan lengkap untuk deploy website ke hosting (Vercel atau Netlify).

---

## 📋 Persiapan Sebelum Deploy

### 1. Pastikan Project Sudah di Git/GitHub

```bash
# Jika belum init git
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit - Oline Manuel Website"

# Create repo di GitHub, lalu push
git remote add origin https://github.com/username/oline-website.git
git branch -M main
git push -u origin main
```

### 2. Verifikasi `.gitignore`

Pastikan `.env.local` **TIDAK** ter-commit:

```bash
# Check apakah .env.local ada di git
git status

# Jika .env.local muncul di "Changes to be committed", hapus dari staging:
git rm --cached .env.local
git commit -m "Remove .env.local from git"
```

✅ File `.env.local` harus tetap di komputer lokal saja!

---

## 🚀 Option 1: Deploy ke Vercel (Recommended)

### Step 1: Sign Up / Login ke Vercel

1. Buka [vercel.com](https://vercel.com)
2. Sign up dengan GitHub account
3. Authorize Vercel untuk access GitHub repositories

### Step 2: Import Project

1. Klik **"Add New..."** → **"Project"**
2. Pilih repository `oline-website` dari GitHub
3. Vercel akan auto-detect framework: **Vite**
4. **JANGAN KLIK DEPLOY DULU!**

### Step 3: Configure Environment Variables

Sebelum deploy, tambahkan environment variables:

1. Scroll ke **"Environment Variables"** section
2. Tambahkan 3 variables berikut:

   **Variable 1:**
   ```
   Name: VITE_SUPABASE_URL
   Value: https://yrfafitwllmqemnllxiw.supabase.co
   ```

   **Variable 2:**
   ```
   Name: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZmFmaXR3bGxtcWVtbmxseGl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyODI3OTcsImV4cCI6MjA3Njg1ODc5N30.XzrVsA__da9s-Dmloq5mwBI6XqCjWNX9ZdRxJQShFTA
   ```

   **Variable 3 (Optional - untuk Gemini AI):**
   ```
   Name: GEMINI_API_KEY
   Value: your_actual_gemini_key
   ```

3. Select environment untuk semua variables:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### Step 4: Deploy

1. Klik **"Deploy"**
2. Tunggu 2-3 menit
3. Setelah selesai, klik **"Visit"** untuk buka website

### Step 5: Custom Domain (Optional)

1. Di Vercel Dashboard → Settings → Domains
2. Add custom domain (contoh: `olinemanuel.com`)
3. Update DNS di domain provider sesuai instruksi Vercel

### Step 6: Test Website

1. Buka website production: `https://your-project.vercel.app`
2. Test semua pages: Home, Profile, Gallery, Media, Events
3. Test admin login: `https://your-project.vercel.app/#admin`
4. Login dengan credentials Supabase
5. Test CRUD operations di Admin Dashboard

---

## 🌐 Option 2: Deploy ke Netlify

### Step 1: Sign Up / Login ke Netlify

1. Buka [netlify.com](https://netlify.com)
2. Sign up dengan GitHub account
3. Authorize Netlify untuk access repositories

### Step 2: Import Project

1. Klik **"Add new site"** → **"Import an existing project"**
2. Pilih **"Deploy with GitHub"**
3. Pilih repository `oline-website`
4. Configure build settings:
   ```
   Build command: npm run build
   Publish directory: dist
   ```

### Step 3: Configure Environment Variables

**SEBELUM DEPLOY**, set environment variables:

1. Klik **"Show advanced"** atau **"Add environment variables"**
2. Tambahkan variables:

   ```
   VITE_SUPABASE_URL = https://yrfafitwllmqemnllxiw.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZmFmaXR3bGxtcWVtbmxseGl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyODI3OTcsImV4cCI6MjA3Njg1ODc5N30.XzrVsA__da9s-Dmloq5mwBI6XqCjWNX9ZdRxJQShFTA
   GEMINI_API_KEY = your_actual_gemini_key (optional)
   ```

### Step 4: Deploy

1. Klik **"Deploy site"**
2. Tunggu build selesai (2-3 menit)
3. Site akan dapat URL: `https://random-name.netlify.app`

### Step 5: Custom Domain (Optional)

1. Site settings → Domain management
2. Add custom domain
3. Update DNS records sesuai instruksi

### Step 6: Test Website

Test semua fitur seperti di Step 6 Vercel.

---

## 🔄 Update Website Setelah Deploy

### Auto Deploy (Recommended)

Setiap kali push ke GitHub, website akan auto-rebuild:

```bash
# Edit files
# ...

# Commit dan push
git add .
git commit -m "Update content"
git push origin main

# Vercel/Netlify akan auto-deploy dalam 2-3 menit
```

### Manual Redeploy

**Vercel:**
1. Dashboard → Project → Deployments
2. Klik "Redeploy" pada deployment terakhir

**Netlify:**
1. Site dashboard → Deploys
2. Klik "Trigger deploy" → "Deploy site"

---

## 🔐 Security Checklist

### ✅ Sebelum Deploy:

- [ ] `.env.local` ada di `.gitignore`
- [ ] `.env.local` TIDAK ada di Git history
- [ ] Environment variables sudah di-set di hosting dashboard
- [ ] Supabase RLS (Row Level Security) sudah aktif
- [ ] Admin credentials aman dan tidak hardcoded

### 🔍 Verify Security:

```bash
# Check apakah .env.local ter-commit
git log --all --full-history --source --oneline -- .env.local

# Jika muncul hasil, .env.local pernah ter-commit (BAHAYA!)
# Solusi: Remove dari history dengan git filter-branch atau BFG
```

---

## 🐛 Troubleshooting

### Error: "Failed to load environment variables"

**Solusi:**
1. Cek spelling environment variables di hosting dashboard
2. Pastikan nama variable benar: `VITE_SUPABASE_URL` (bukan `SUPABASE_URL`)
3. Redeploy setelah tambah variables

### Error: "Supabase client not initialized"

**Solusi:**
1. Verify environment variables di hosting dashboard
2. Check apakah values ada typo atau missing
3. Build log akan menunjukkan jika variables missing

### Gallery/Media tidak muncul di production

**Solusi:**
1. Check Supabase tables ada data
2. Check Network tab di browser (F12)
3. Verify CORS settings di Supabase (seharusnya default sudah OK)
4. Check RLS policies di Supabase → Authentication → Policies

### Admin login gagal di production

**Solusi:**
1. Check Supabase → Authentication → Users (pastikan user exists)
2. Check Supabase → Authentication → URL Configuration
3. Add production URL ke "Site URL" dan "Redirect URLs":
   ```
   https://your-site.vercel.app
   https://your-site.vercel.app/#admin
   ```

---

## 📊 Monitoring

### Vercel Analytics (Free)

1. Vercel Dashboard → Analytics tab
2. Lihat traffic, page views, performance

### Netlify Analytics (Paid)

1. Site → Analytics
2. Enable Netlify Analytics (paid feature)

### Supabase Monitoring

1. Supabase Dashboard → Reports
2. Monitor database queries, auth, storage

---

## 💰 Pricing

### Vercel
- **Hobby (Free):**
  - Unlimited deployments
  - 100 GB bandwidth/month
  - Automatic HTTPS
  - ✅ Cukup untuk personal/portfolio site

### Netlify
- **Free Tier:**
  - 100 GB bandwidth/month
  - 300 build minutes/month
  - ✅ Cukup untuk personal site

### Supabase
- **Free Tier:**
  - 500 MB database
  - 1 GB file storage
  - 50,000 monthly active users
  - ✅ Cukup untuk website kecil-menengah

---

## 🎯 Post-Deployment Checklist

- [ ] Website accessible di production URL
- [ ] All pages load correctly (Home, Profile, Gallery, Media, Events)
- [ ] Gallery images load dari Supabase
- [ ] Videos load dari YouTube
- [ ] Admin login accessible via `#admin`
- [ ] Admin can login with Supabase credentials
- [ ] Admin can perform CRUD operations
- [ ] Mobile responsive (test di phone)
- [ ] Performance OK (check with Lighthouse)
- [ ] Add custom domain (optional)
- [ ] Setup Google Analytics (optional)

---

## 🔗 Useful Links

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Supabase Docs:** https://supabase.com/docs
- **Vite Deployment:** https://vitejs.dev/guide/static-deploy.html

---

## 📧 Support

Jika ada masalah saat deployment:

1. Check build logs di Vercel/Netlify dashboard
2. Check browser console (F12) untuk errors
3. Check Supabase logs untuk database/auth errors
4. Refer to SETUP_SUPABASE.md untuk Supabase setup

---

**Good luck with deployment! 🚀**
