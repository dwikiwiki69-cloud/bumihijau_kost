"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("owner@bumihijaukost.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <Card className="shadow-xl border-emerald-100 backdrop-blur-sm bg-white/95">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200 mb-3">
          <Building2 className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Bumihijau Kost
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Aplikasi Manajemen Kost Multi-Cabang
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            label="Email Akun"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            required
            className="pl-10"
          />
        </div>

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-600">
            <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
            Ingat saya
          </label>
          <a href="#" className="font-medium text-emerald-600 hover:text-emerald-700">
            Lupa password?
          </a>
        </div>

        <Button type="submit" loading={loading} className="w-full text-base py-3">
          Masuk ke Dashboard
        </Button>
      </form>

      {/* Role Switcher Demo Box */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Pilihan Akses Role:
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => {
              setEmail("owner@bumihijaukost.com");
              router.push("/dashboard");
            }}
            className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/50 text-left transition-colors"
          >
            <div className="font-semibold text-emerald-900">Owner Kost</div>
            <div className="text-[10px] text-emerald-700">Super Admin Laporan & Verifikasi</div>
          </button>
          <button
            type="button"
            onClick={() => {
              setEmail("admin@bumihijaukost.com");
              router.push("/dashboard/admin");
            }}
            className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/50 text-left transition-colors"
          >
            <div className="font-semibold text-blue-900">Admin Lapangan</div>
            <div className="text-[10px] text-blue-700">Input Pengeluaran & Operasional</div>
          </button>
        </div>
        <div className="mt-3 text-center">
          <Link
            href="/portal/demo-token-123"
            className="text-xs text-slate-500 hover:text-emerald-600 font-medium inline-flex items-center gap-1"
          >
            👉 Klik untuk melihat Demo Portal Tenant (Magic-Link)
          </Link>
        </div>
      </div>
    </Card>
  );
}
