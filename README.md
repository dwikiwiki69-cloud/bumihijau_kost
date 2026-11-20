# Bumihijau Kost — Aplikasi Manajemen Kost Multi-Cabang

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

---

## 📋 Deskripsi

**Bumihijau Kost** adalah platform SaaS B2B multi-tenant untuk manajemen properti kost (boarding house) di Indonesia. Dirancang untuk pemilik kost yang memiliki satu atau lebih cabang, platform ini menghadirkan dashboard terpusat, manajemen penghuni, pencatatan keuangan, dan portal mandiri bagi penyewa — semua dalam satu ekosistem yang aman dan skalabel.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🏠 **Room Grid Dashboard** | Visualisasi grid status kamar (Tersedia / Terisi / Maintenance) secara real-time per cabang |
| 🔐 **Role-Based Access Control** | Tiga level akses: Owner, Admin Kost, dan Tenant dengan izin granular |
| 💸 **Expense Sync + Photo Upload** | Pencatatan pengeluaran operasional dengan lampiran bukti foto (S3/R2) |
| 🔗 **Magic-Link Tenant Portal** | Portal penyewa tanpa password — akses via magic link yang dikirim ke email |
| 🧾 **Invoice Management** | Pembuatan, pengiriman, dan tracking status pembayaran tagihan sewa |
| 🔧 **Maintenance Tickets** | Sistem tiket laporan kerusakan dari penyewa hingga resolusi oleh admin |
| 📊 **Analytics Dashboard** | Grafik pendapatan, tingkat hunian, dan tren pengeluaran per cabang |
| 🗂️ **Audit Trail** | Log aktivitas lengkap untuk setiap perubahan data penting |

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons |
| **Backend** | Next.js API Routes & Server Actions |
| **Database** | PostgreSQL + Prisma ORM |
| **Storage** | S3 / Cloudflare R2 (abstraksi unified) |
| **Auth** | NextAuth.js (Magic Link + Credentials) |
| **Deployment** | Vercel (Frontend) + Railway / Supabase (Database) |

---

## 👥 Peran & Hak Akses

### 🏢 OWNER
- Akses penuh ke semua cabang yang dimiliki
- Melihat laporan keuangan konsolidasi lintas cabang
- Menambah/menghapus Admin Kost
- Mengatur paket langganan (subscription tier)

### 👤 ADMIN_KOST
- Mengelola kamar, penghuni, dan tagihan pada cabang yang ditugaskan
- Upload bukti pengeluaran operasional
- Membalas & menutup tiket maintenance
- Membuat dan mengirim invoice ke penyewa

### 🙋 TENANT
- Akses portal mandiri via magic link
- Melihat tagihan dan riwayat pembayaran
- Mengajukan tiket keluhan/maintenance
- Mengunduh kwitansi pembayaran

---

## 📁 Struktur Proyek

```
bumihijau_kost/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                 # Grup rute autentikasi
│   │   │   ├── login/
│   │   │   └── magic-link/
│   │   ├── (dashboard)/            # Grup rute dashboard (protected)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx            # Dashboard utama
│   │   │   ├── rooms/              # Manajemen kamar
│   │   │   ├── tenants/            # Manajemen penyewa
│   │   │   ├── invoices/           # Manajemen tagihan
│   │   │   ├── expenses/           # Pencatatan pengeluaran
│   │   │   ├── maintenance/        # Tiket maintenance
│   │   │   └── analytics/          # Dashboard analitik
│   │   ├── (tenant-portal)/        # Portal penyewa (magic link)
│   │   │   └── portal/[token]/
│   │   └── api/                    # API Routes
│   │       ├── auth/
│   │       ├── rooms/
│   │       ├── invoices/
│   │       ├── expenses/
│   │       └── webhooks/
│   ├── components/                 # Komponen UI reusable
│   │   ├── ui/                     # Komponen dasar (Button, Input, Card)
│   │   ├── dashboard/              # Komponen spesifik dashboard
│   │   ├── rooms/                  # Komponen Room Grid
│   │   └── forms/                  # Form components
│   ├── lib/                        # Utilitas & konfigurasi
│   │   ├── prisma.ts               # Prisma client singleton
│   │   ├── auth.ts                 # NextAuth config
│   │   ├── storage.ts              # S3/R2 abstraction
│   │   └── utils.ts                # Helper functions (clsx, etc.)
│   ├── hooks/                      # Custom React hooks
│   ├── types/                      # TypeScript type definitions
│   └── middleware.ts               # Auth middleware (route protection)
├── prisma/
│   └── schema.prisma               # Database schema
├── public/                         # Static assets
├── .env.example                    # Template environment variables
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Memulai (Getting Started)

### Prasyarat

- Node.js >= 18.x
- npm >= 9.x (atau pnpm/yarn)
- PostgreSQL database (lokal atau cloud)

### Instalasi

```bash
# 1. Clone repositori
git clone https://github.com/dwikiwiki69-cloud/bumihijau_kost.git
cd bumihijau_kost

# 2. Install dependensi
npm install

# 3. Salin file environment
cp .env.example .env.local

# 4. Isi variabel di .env.local (lihat seksi Environment Variables)

# 5. Jalankan migrasi database
npx prisma migrate dev --name init

# 6. (Opsional) Seed data awal
npx prisma db seed

# 7. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 🔧 Environment Variables

Salin `.env.example` menjadi `.env.local` dan isi nilai berikut:

```env
# ============================================================
# DATABASE
# ============================================================
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/bumihijau_kost?schema=public"

# ============================================================
# NEXTAUTH
# ============================================================
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-nextauth-secret"

# ============================================================
# EMAIL (untuk Magic Link — gunakan Resend / SendGrid / SMTP)
# ============================================================
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="no-reply@bumihijaukost.id"
EMAIL_SERVER_PASSWORD="your-smtp-password"
EMAIL_FROM="Bumihijau Kost <no-reply@bumihijaukost.id>"

# ============================================================
# STORAGE (Cloudflare R2 / AWS S3)
# ============================================================
STORAGE_ENDPOINT="https://<account-id>.r2.cloudflarestorage.com"
STORAGE_REGION="auto"
STORAGE_ACCESS_KEY_ID="your-r2-access-key"
STORAGE_SECRET_ACCESS_KEY="your-r2-secret-key"
STORAGE_BUCKET_NAME="bumihijau-kost-uploads"
STORAGE_PUBLIC_URL="https://cdn.bumihijaukost.id"

# ============================================================
# APP CONFIG
# ============================================================
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Bumihijau Kost"
```

---

## 📄 Lisensi

Didistribusikan di bawah lisensi MIT. Lihat [LICENSE](LICENSE) untuk detail lengkap.

---

## 🤝 Kontribusi

Pull request sangat disambut! Untuk perubahan besar, harap buka issue terlebih dahulu untuk mendiskusikan apa yang ingin Anda ubah.

---

<p align="center">Dibuat dengan ❤️ untuk para pemilik kost Indonesia</p>
