# Oline Manuel 

Official website profile untuk Oline Manuel (JKT48 Generation 12) dengan admin dashboard untuk manage konten secara dinamis.

## ✨ Features

- 🏠 **Homepage** - Hero section dengan profile highlight
- 👤 **Profile** - Bio lengkap, fun facts, career timeline, discography
- 🖼️ **Gallery** - Photo gallery dengan kategori (Performance, Photoshoot, #RabOline)
- 🎥 **Media** - YouTube video collection dengan lightbox
- 📅 **Events** - Upcoming shows dan events
- 🔐 **Admin Dashboard** - Manage semua konten tanpa coding!

## 🚀 New: Dynamic Content Management

Website ini sekarang menggunakan **Supabase** sebagai backend, sehingga admin bisa update konten (events, photos, videos, profile) melalui dashboard tanpa perlu edit kode!

### Admin Dashboard Features:
- ✅ Manage Events (Create, Read, Update, Delete)
- ✅ Manage Gallery Images (with Twitter/X image support)
- ✅ Manage Videos (YouTube integration)
- ✅ Manage Profile data
- ✅ Secure authentication
- ✅ Real-time updates

## 📋 Prerequisites

- Node.js (v16 atau lebih baru)
- NPM atau Yarn
- Akun Supabase (gratis) - [Sign up here](https://supabase.com)

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase
Ikuti panduan lengkap di [SETUP_SUPABASE.md](SETUP_SUPABASE.md) atau quick start di [QUICK_START.md](QUICK_START.md)

**TL;DR:**
1. Buat Supabase project
2. Run SQL schema dari `supabase-schema.sql`
3. Buat admin user di Authentication
4. Copy Project URL & anon key ke `.env.local`

### 3. Configure Environment Variables
Edit `.env.local`:
```env
GEMINI_API_KEY=PLACEHOLDER_API_KEY

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server
```bash
npm run dev
```

Visit: `http://localhost:5173`

### 5. Access Admin Dashboard
1. Klik menu "AdminDashboard" atau navigate ke `/admin`
2. Login dengan admin credentials yang dibuat di Supabase
3. Mulai manage konten!

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS (custom design system)
- **Backend**: Supabase (PostgreSQL + Authentication + Real-time)
- **Deployment**: Vercel/Netlify ready

## 📁 Project Structure

```
├── components/           # Reusable UI components
├── pages/               # Page components
│   ├── admin/          # Admin dashboard pages
│   │   ├── AdminLogin.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminEvents.tsx
│   │   ├── AdminGallery.tsx
│   │   └── AdminVideos.tsx
│   ├── HomePage.tsx
│   ├── ProfilePage.tsx
│   ├── GalleryPage.tsx
│   ├── MediaPage.tsx
│   └── EventsPage.tsx
├── hooks/              # Custom React hooks
│   └── useSupabaseData.ts
├── lib/                # Utilities & configs
│   └── supabase.ts
├── supabase-schema.sql # Database schema
├── SETUP_SUPABASE.md   # Detailed setup guide
└── QUICK_START.md      # Quick start guide
```

## 🔒 Security

- ✅ Row Level Security (RLS) enabled
- ✅ Public read-only access untuk website content
- ✅ Admin authentication required untuk CRUD operations
- ✅ Environment variables protected (.env.local in .gitignore)

## 📝 Admin Usage

### Add Gallery Image (dari Twitter/X):
1. Buka tweet dengan foto
2. Klik kanan foto → Copy image address
3. Admin Dashboard → Gallery → Add Image → Paste URL

### Add Video (dari YouTube):
1. Copy YouTube URL atau Video ID
2. Admin Dashboard → Videos → Add Video → Paste

### Add Event:
1. Admin Dashboard → Events → Add Event
2. Fill form dengan event details
3. Save

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Import project di Vercel
3. Add environment variables di Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### Netlify
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables di Netlify dashboard

## 🆘 Troubleshooting

Lihat section "Troubleshooting" di [SETUP_SUPABASE.md](SETUP_SUPABASE.md)

## 📄 License