'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Receipt,
  Users,
  Grid3X3,
  Smartphone,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingHomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-200">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 leading-none block">
                Bumihijau <span className="text-emerald-600">Kost</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">B2B SaaS Kost Multi-Cabang</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/portal/demo-token-123" className="hidden sm:inline-block text-xs font-semibold text-slate-600 hover:text-emerald-600">
              Portal Anak Kost
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm" className="text-xs">
                Masuk
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="text-xs">
                Buka Demo App →
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-24 bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in duration-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Sistem Multi-Cabang Berbasis RBAC & Audit Trail Otomatis
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Kelola Bisnis Kost Lebih Mudah, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
              Transparan & Bebas Bocor Biaya
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Platform modern untuk Juragan Kost & Field Admin. Sinkronisasi bukti pengeluaran nota real-time, grid kamar warna-warni, portal anak kost magic-link, dan rekonsiliasi laba bersih otomatis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 py-3.5 shadow-xl shadow-emerald-200">
                Coba Demo Sekarang <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-3.5">
                Login Akun
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multi-Tenancy Aman
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Anti-Manipulasi Nota
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Tanpa Perlu Install App
            </span>
          </div>
        </div>
      </section>

      {/* Feature Highlights (3 Core USPs) */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">
              Fitur Unggulan Bumihijau Kost
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              Dirancang Khusus untuk Memecahkan Masalah Operasional Kost di Lapangan
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-all hover:shadow-lg space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-200">
                <Grid3X3 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Interactive Room Grid</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Visualisasi denah kamar color-coded (Hijau Kosong, Biru Lunas, Kuning Jatuh Tempo, Merah Menunggak). Cek okupansi cabang dalam 1 detik.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-all hover:shadow-lg space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-200">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Sinkronisasi Nota Pengeluaran</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Admin lapangan wajib melampirkan foto nota dengan kompresi otomatis. Owner memverifikasi secara langsung dan laba bersih langsung ter-update.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-all hover:shadow-lg space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-200">
                <Smartphone className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Portal Magic-Link Anak Kost</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Anak kost tidak perlu install aplikasi. Cukup buka link unik untuk melihat tagihan, konfirmasi pembayaran WA, dan lapor komplain fasilitas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Breakdown Table */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Hak Akses Ketat Berbasis Peran (RBAC)
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Setiap pihak hanya melihat apa yang menjadi tanggung jawabnya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-emerald-200 shadow-sm">
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                OWNER (Super Admin)
              </span>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li>✓ Akses penuh seluruh cabang kost</li>
                <li>✓ Laporan Keuangan & Net Profit</li>
                <li>✓ Antrean Verifikasi Pengeluaran</li>
                <li>✓ Audit Trail Log mutasi data</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-blue-200 shadow-sm">
              <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                ADMIN KOST (Field Operator)
              </span>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li>✓ Input pengeluaran harian + foto nota</li>
                <li>✓ Check-in tamu baru & kamar</li>
                <li>✗ Dilarang melihat laba bersih</li>
                <li>✗ Tidak bisa hapus pengeluaran terkirim</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
                ANAK KOST (Tenant)
              </span>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li>✓ Akses instan via Magic-Link URL</li>
                <li>✓ Cek status invoice & rekening bayar</li>
                <li>✓ Kirim laporan komplain perbaikan</li>
                <li>✓ Unduh kwitansi pembayaran digital</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-white font-bold">
            <Building2 className="w-5 h-5 text-emerald-500" />
            Bumihijau Kost Multi-Cabang
          </div>
          <div>
            © 2026 Bumihijau Kost. All rights reserved. Built with Next.js, TypeScript & Tailwind CSS.
          </div>
        </div>
      </footer>
    </div>
  );
}
