# Cara Pakai Custom Domain di Vercel

Panduan lengkap untuk connect domain sendiri ke website Vercel.

---

## 📋 Yang Anda Butuhkan

- ✅ Website sudah di-deploy di Vercel
- ✅ Domain sudah dibeli (dari Niagahoster, Namecheap, GoDaddy, Cloudflare, dll)
- ✅ Access ke DNS management domain

---

## 🚀 Step-by-Step Guide

### Step 1: Buka Project di Vercel

1. Login ke [vercel.com](https://vercel.com)
2. Pilih project website Oline Manuel
3. Klik **"Settings"** (icon gear)
4. Pilih **"Domains"** di sidebar kiri

### Step 2: Add Domain di Vercel

1. Di halaman Domains, ada input box "Add domain"
2. Ketik domain Anda, contoh:
   - `olinemanuel.com` (domain utama)
   - `www.olinemanuel.com` (dengan www)
3. Klik **"Add"**

Vercel akan cek domain dan kasih instruksi DNS.

### Step 3: Pilih Tipe DNS Configuration

Vercel akan tanya: **"How do you want to configure this domain?"**

Ada 2 pilihan:

#### **Option A: Nameservers (Recommended)** ⭐
✅ Paling mudah
✅ Auto SSL
✅ Auto redirect www → non-www (atau sebaliknya)

#### **Option B: A Record / CNAME**
Untuk advanced users atau jika nameserver tidak bisa diubah.

---

## 🔧 Option A: Using Nameservers (RECOMMENDED)

### 1. Vercel akan kasih 2 nameservers:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### 2. Update Nameservers di Domain Provider

#### Jika domain dari **Niagahoster**:

1. Login ke [member.niagahoster.co.id](https://member.niagahoster.co.id)
2. Pilih **"Domain"** → Pilih domain Anda
3. Klik **"Nameserver"**
4. Pilih **"Custom Nameserver"**
5. Isi:
   ```
   Nameserver 1: ns1.vercel-dns.com
   Nameserver 2: ns2.vercel-dns.com
   ```
6. **Save Changes**

#### Jika domain dari **Namecheap**:

1. Login ke Namecheap
2. Domain List → Klik **"Manage"** di domain Anda
3. Scroll ke **"Nameservers"**
4. Pilih **"Custom DNS"**
5. Isi:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
6. Save

#### Jika domain dari **GoDaddy**:

1. Login ke GoDaddy
2. My Products → Domains → Klik domain
3. Scroll ke **"Nameservers"**
4. Klik **"Change"** → **"Enter my own nameservers"**
5. Isi:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
6. Save

#### Jika domain dari **Cloudflare**:

1. Cloudflare → Pilih domain
2. DNS → Nameservers
3. Ubah ke:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
4. Save

### 3. Tunggu DNS Propagation

⏰ **Waktu:** 1-48 jam (biasanya 1-6 jam)

Cek status di:
- Vercel Dashboard → Domains (akan ada status indicator)
- Atau cek manual: https://dnschecker.org

### 4. Vercel Auto-Configure

Setelah DNS propagate, Vercel otomatis akan:
- ✅ Generate SSL certificate (HTTPS)
- ✅ Setup www redirect
- ✅ Enable CDN

**SELESAI!** Domain sudah bisa diakses.

---

## 🔧 Option B: Using A Record / CNAME

Jika tidak bisa ubah nameservers (misal domain untuk email juga), pakai A Record.

### 1. Vercel akan kasih DNS records:

#### Untuk domain utama (`olinemanuel.com`):
```
Type: A
Name: @
Value: 76.76.21.21
```

#### Untuk www (`www.olinemanuel.com`):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 2. Add DNS Records di Domain Provider

#### Jika domain dari **Niagahoster**:

1. Login → Domain → Pilih domain
2. Klik **"DNS Management"** atau **"Zone Editor"**
3. Add 2 records:

   **Record 1 (Root domain):**
   ```
   Type: A
   Name: @ (atau kosong)
   Value: 76.76.21.21
   TTL: 3600 (atau default)
   ```

   **Record 2 (WWW subdomain):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

4. **Save**

#### Jika domain dari **Namecheap**:

1. Domain List → Advanced DNS
2. Add New Record:

   ```
   Type: A Record
   Host: @
   Value: 76.76.21.21
   TTL: Automatic
   ```

   ```
   Type: CNAME Record
   Host: www
   Value: cname.vercel-dns.com
   TTL: Automatic
   ```

3. Save all changes

#### Jika domain dari **Cloudflare**:

1. Cloudflare → Domain → DNS
2. Add records:

   ```
   Type: A
   Name: @ (atau domain root)
   IPv4: 76.76.21.21
   Proxy: ON (orange cloud)
   ```

   ```
   Type: CNAME
   Name: www
   Target: cname.vercel-dns.com
   Proxy: ON
   ```

3. Save

### 3. Tunggu DNS Propagation

⏰ **Waktu:** 5 menit - 48 jam (biasanya < 1 jam untuk A Record)

Cek di: https://dnschecker.org

### 4. Verify di Vercel

1. Kembali ke Vercel → Domains
2. Klik **"Refresh"** atau tunggu
3. Status akan berubah menjadi **"Valid Configuration"**
4. SSL certificate otomatis dibuat (tunggu 5-10 menit)

---

## 🔀 Setup WWW Redirect

Jika Anda ingin:
- `www.olinemanuel.com` → redirect ke `olinemanuel.com`
- Atau sebaliknya

### Di Vercel (sudah otomatis jika pakai Nameservers)

Jika pakai A Record/CNAME, add both domains di Vercel:

1. Vercel → Domains → Add `olinemanuel.com`
2. Add lagi → `www.olinemanuel.com`
3. Vercel akan auto-redirect salah satu ke yang lain

### Pilih Primary Domain

1. Di list domains, klik **⋯** (3 dots) di domain
2. Pilih **"Make Primary"** untuk domain utama
3. Domain lain akan auto-redirect ke primary

---

## ✅ Verification & Testing

### 1. Check DNS Propagation

```bash
# Check A record
nslookup olinemanuel.com

# Check CNAME
nslookup www.olinemanuel.com
```

Atau pakai online tool: https://dnschecker.org

### 2. Test Website

1. Buka `http://olinemanuel.com` → harus redirect ke HTTPS
2. Buka `https://olinemanuel.com` → website muncul
3. Buka `https://www.olinemanuel.com` → redirect ke non-www (atau sebaliknya)
4. Test admin: `https://olinemanuel.com/#admin` → login page muncul

### 3. Check SSL Certificate

1. Klik **padlock icon** di address bar
2. Certificate issued by: Let's Encrypt (via Vercel)
3. Valid dan trusted ✅

---

## 🐛 Troubleshooting

### Domain belum bisa diakses setelah 24 jam

**Solusi:**
1. Check DNS records sudah benar di domain provider
2. Clear DNS cache:
   ```bash
   # Windows
   ipconfig /flushdns
   
   # Mac
   sudo dscacheutil -flushcache
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```
3. Coba akses dari browser lain atau mode incognito
4. Check di https://dnschecker.org (harus hijau semua)

### "DNS Configuration Error" di Vercel

**Solusi:**
1. Verify nameservers atau A/CNAME records sudah benar
2. Tunggu DNS propagate penuh (bisa sampai 48 jam)
3. Klik **"Refresh"** di Vercel Domains page
4. Jika pakai Cloudflare, pastikan Proxy **OFF** (grey cloud) untuk verification, lalu **ON** setelah verified

### "Invalid Certificate" / "Not Secure" warning

**Solusi:**
1. Tunggu 5-10 menit setelah domain verified (SSL generate otomatis)
2. Hard refresh browser: `Ctrl + Shift + R`
3. Clear browser cache
4. Jika masih error setelah 1 jam, contact Vercel support

### WWW tidak redirect

**Solusi:**
1. Pastikan `www.domain.com` sudah di-add di Vercel Domains
2. Set primary domain di Vercel
3. Vercel akan auto-redirect non-primary ke primary

### Domain masih ke old website / parking page

**Solusi:**
1. Check nameservers sudah benar dan propagated
2. Check A record pointing ke IP Vercel yang benar
3. Clear browser cache dan DNS cache
4. Tunggu DNS propagation complete

---

## 📧 Email Configuration (IMPORTANT!)

⚠️ **Jika domain juga untuk email (Gmail Workspace, cPanel email, dll):**

### Jika pakai Nameservers Vercel:

Email akan **TIDAK KERJA** karena semua DNS pindah ke Vercel!

**Solusi:**
1. Pakai **Option B (A Record/CNAME)** instead of nameservers
2. Atau add MX records di Vercel DNS setelah pindah nameserver:
   - Vercel Dashboard → Project → Domains → DNS Records
   - Add MX records dari email provider

### Jika pakai A Record/CNAME:

Email tetap kerja, tidak perlu setting apa-apa ✅

---

## 🎯 Best Practices

### 1. Gunakan HTTPS Only
Vercel otomatis redirect HTTP → HTTPS. Pastikan aktif.

### 2. Setup www Redirect
Pilih antara `domain.com` atau `www.domain.com` sebagai primary.

### 3. Monitor Domain
- Vercel akan email jika ada issue dengan domain
- Check SSL expiry (auto-renew, tapi good to monitor)

### 4. Use Vercel Analytics
Free analytics untuk monitor traffic di custom domain.

---

## 📊 After Domain Connected

### Update Links di:

1. **Social Media:**
   - Twitter/X bio
   - Instagram bio
   - YouTube channel
   - TikTok bio

2. **Google Search Console:**
   - Add property dengan domain baru
   - Submit sitemap

3. **Google Analytics:**
   - Update property URL
   - Verify tracking masih kerja

4. **Supabase (Optional):**
   - Supabase → Authentication → URL Configuration
   - Add custom domain ke "Site URL" dan "Redirect URLs"

---

## 🔗 Quick Reference

### Vercel Nameservers:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### Vercel A Record:
```
76.76.21.21
```

### Vercel CNAME:
```
cname.vercel-dns.com
```

### DNS Check Tools:
- https://dnschecker.org
- https://www.whatsmydns.net
- https://mxtoolbox.com

---

## ❓ Common Questions

**Q: Berapa lama domain aktif?**
A: 5 menit - 48 jam (rata-rata 1-6 jam)

**Q: Apakah domain gratis?**
A: Connect domain ke Vercel gratis. Tapi beli domain sendiri (biaya domain).

**Q: Bisa pakai subdomain?**
A: Bisa! Add `blog.olinemanuel.com` atau `shop.olinemanuel.com` seperti add domain biasa.

**Q: SSL/HTTPS gratis?**
A: Ya! Vercel kasih SSL gratis dari Let's Encrypt, auto-renew.

**Q: Bisa multiple domain untuk 1 website?**
A: Bisa! Add semua domain, pilih 1 primary, yang lain auto-redirect.

---

**Selamat! Website Anda sekarang accessible via custom domain! 🎉**

Need help? Check Vercel docs: https://vercel.com/docs/concepts/projects/domains
