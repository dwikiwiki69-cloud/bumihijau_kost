# Bumihijau Kost — Aplikasi Manajemen Kost Multi-Cabang

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-emerald.svg)]()

Platform B2B SaaS terpadu untuk pengelolaan rumah kost multi-cabang (**Boarding House Management System**) yang menghubungkan **Pemilik Kost (Owner)**, **Admin Lapangan (Operator)**, dan **Penghuni (Anak Kost)** dalam satu ekosistem transparan, anti-bocor biaya, dan efisien.

---

## 🎯 Fitur Utama Frontend

### 1. Interactive Room Grid Dashboard
- **Visual Color-Coded Grid:**
  - 🟢 **VACANT (Kosong):** Siap huni dan dapat langsung di-check-in.
  - 🔵 **OCCUPIED (Terisi - Lunas):** Sewa aktif dengan status lunas.
  - 🟡 **DUE_SOON (Jatuh Tempo):** Kurang dari 3 hari sebelum batas sewa.
  - 🔴 **OVERDUE (Menunggak):** Telah melewati batas waktu pembayaran sewa.
- Filter cepat per cabang kost, status kamar, dan pencarian nomor kamar.
- Detail kamar pop-up (KYC penyewa, fasilitas kamar, riwayat pembayaran).

### 2. Sinkronisasi Pengeluaran Real-Time (Core USP)
- **Admin Mobile Input Form:**
  - Pilihan kategori besar: Listrik/Token ⚡, Air 💧, Cuci AC ❄️, Maintenance 🔧, Kebersihan 🧹, Operasional Lainnya 📋.
  - **MANDATORY Upload Bukti Nota/Struk:** Dilengkapi kompresi otomatis di sisi klien.
  - **Threshold Guard:** Peringatan otomatis jika nominal pengeluaran `MAINTENANCE` melebihi ambang batas threshold (Rp 200.000) untuk diarahkan ke Form Pengajuan Dana.
- **Antrean Verifikasi Owner (Verification Queue):**
  - Owner memvalidasi nota pengeluaran dengan tombol aksi instan: `Setujui`, `Klarifikasi/Flag`, atau `Void`.
  - Sinkronisasi otomatis ke Buku Kas & Laba Bersih (**Net Profit** = *Total Tagihan Lunas - Total Pengeluaran Approved*).

### 3. Portal Mandiri Anak Kost (Magic-Link)
- Akses publik tanpa perlu install aplikasi maupun password melalui URL unik `/portal/[token]`.
- Cek rincian invoice sewa bulan berjalan & nomor rekening resmi transfer BCA.
- Tombol konfirmasi transfer langsung ke WhatsApp Admin.
- Form pengaduan / komplain fasilitas kamar (AC rusak, kran bocor, dll).

### 4. Manajemen Tagihan & Invoice
- Monitoring tagihan bulanan: Lunas, Belum Lunas, dan Menunggak.
- Tombol integrasi pengingat tagihan instan via WhatsApp (`wa.me` dengan template pesan otomatis).
- Aksi tandai lunas manual dan filter status tagihan.

### 5. Laporan Keuangan & Net Profit
- Card Laba Bersih interaktif dengan rincian pendapatan vs beban operasional.
- Grafik visual bar persentase beban pengeluaran per kategori.
- Tabel cashflow bulanan dan fitur cetak laporan / ekspor CSV.

---

## 🛡️ Role-Based Access Control (RBAC)

| Peran (Role) | Ruang Lingkup Hak Akses |
| :--- | :--- |
| **OWNER** *(Super Admin)* | Full access seluruh cabang, Laporan Net Profit & Cashflow, antrean verifikasi bukti nota, audit log. |
| **ADMIN_KOST** *(Field Operator)* | Operasional lapangan, check-in tamu KYC, status kamar, input pengeluaran + foto nota. **Dilarang keras** melihat laba bersih atau mengedit/menghapus pengeluaran yang sudah disubmit. |
| **TENANT** *(Anak Kost)* | Akses mandiri melalui Magic Link tanpa login untuk cek tagihan, info rekening, dan lapor komplain perbaikan. |

---

## 🏗️ Struktur Direktori Frontend

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx                # Auth layout
│   │   └── login/page.tsx            # Login page dengan role demo switcher
│   ├── (dashboard)/
│   │   ├── layout.tsx                # Responsive sidebar & navbar layout
│   │   ├── dashboard/
│   │   │   ├── page.tsx              # Owner executive overview dashboard
│   │   │   └── admin/page.tsx        # Admin lapangan mobile dashboard
│   │   ├── kamar/
│   │   │   └── page.tsx              # Interactive Room Grid
│   │   ├── pengeluaran/
│   │   │   ├── page.tsx              # Owner verification queue & history
│   │   │   ├── input/page.tsx        # Admin mobile expense input form
│   │   │   └── request/page.tsx      # Form pengajuan dana di atas threshold
│   │   ├── tagihan/
│   │   │   └── page.tsx              # Manajemen invoice & reminder WhatsApp
│   │   ├── penyewa/
│   │   │   ├── page.tsx              # Data penghuni aktif
│   │   │   └── baru/page.tsx         # Check-in tamu baru (KYC)
│   │   └── laporan/
│   │       └── page.tsx              # Laporan Net Profit & Cashflow
│   ├── portal/
│   │   └── [token]/page.tsx          # Public magic-link tenant portal
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Modern SaaS landing page
│   └── globals.css                   # Tailwind styling
├── components/
│   ├── analytics/                    # NetProfitCard, ExpenseBreakdown
│   ├── dashboard/                    # StatCard, ActivityFeed
│   ├── expenses/                     # ExpenseCard
│   ├── layout/                       # Sidebar, Navbar
│   ├── rooms/                        # RoomCard, RoomDetailModal
│   ├── tenants/                      # TenantCard
│   └── ui/                           # Button, Input, Card
└── lib/
    ├── constants.ts                  # Config warna status & kategori
    ├── mock-data.ts                  # Mock data lengkap (Rooms, Invoices, Expenses)
    └── utils.ts                      # Helper format rupiah & date
```

---

## 🚀 Menjalankan Project Lokal

### 1. Prasyarat
- Node.js versi 18.x atau lebih baru (disarankan Node.js 20+)
- npm / pnpm / yarn

### 2. Instalasi & Menjalankan Dev Server
```bash
# Clone repository
git clone https://github.com/dwikiwiki69-cloud/bumihijau_kost.git
cd bumihijau_kost

# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### 3. Route Penting untuk Demo:
- `/` — Halaman Landing Page Publik
- `/login` — Halaman Login & Switcher Akses Role
- `/dashboard` — Dashboard Utama Owner Kost
- `/dashboard/admin` — Dashboard Lapangan Admin Kost
- `/kamar` — Interactive Color-Coded Room Grid
- `/pengeluaran` — Verifikasi Pengeluaran Owner
- `/pengeluaran/input` — Input Pengeluaran Nota Admin Lapangan
- `/tagihan` — Daftar Invoice & Pengingat WA
- `/penyewa/baru` — Check-in Tamu Baru (KYC)
- `/portal/demo-token-123` — Portal Mandiri Magic-Link Anak Kost

---

## 📄 Lisensi
Hak Cipta © 2026 Bumihijau Kost. All rights reserved.
