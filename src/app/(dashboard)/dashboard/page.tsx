'use client';

import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Home,
  PlusCircle,
  Receipt,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatRupiah } from '@/lib/utils';
import { mockProperties, mockRooms, mockExpenses, mockInvoices } from '@/lib/mock-data';

export default function DashboardOverviewPage() {
  const totalRooms = mockRooms.length;
  const occupiedRooms = mockRooms.filter((r) => r.status === 'OCCUPIED' || r.status === 'DUE_SOON').length;
  const overdueRooms = mockRooms.filter((r) => r.status === 'OVERDUE').length;
  const vacantRooms = mockRooms.filter((r) => r.status === 'VACANT').length;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

  const totalRevenue = mockInvoices
    .filter((inv) => inv.status === 'PAID')
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const totalExpenses = mockExpenses
    .filter((exp) => exp.status === 'APPROVED')
    .reduce((sum, exp) => sum + exp.amount, 0);

  const netProfit = totalRevenue - totalExpenses;
  const pendingExpenses = mockExpenses.filter((exp) => exp.status === 'PENDING_REVIEW');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-6 md:p-8 text-white shadow-lg shadow-emerald-900/10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-emerald-500/30 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-2">
              Super Admin / Owner View
            </span>
            <h2 className="text-2xl md:text-3xl font-bold">
              Selamat Datang Kembali, Pak Dwiki! 👋
            </h2>
            <p className="text-emerald-100 text-sm mt-1 max-w-xl">
              Berikut ringkasan performa 2 cabang kost Anda hari ini. Total {totalRooms} kamar dengan okupansi {occupancyRate}%.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/kamar">
              <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-0">
                Lihat Grid Kamar
              </Button>
            </Link>
            <Link href="/pengeluaran">
              <Button size="sm" className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-semibold shadow-none">
                Verifikasi Pengeluaran ({pendingExpenses.length})
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pendapatan Lunas (Bulan Ini)"
          value={formatRupiah(totalRevenue)}
          change="+12.5%"
          trend="up"
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Total Beban Pengeluaran"
          value={formatRupiah(totalExpenses)}
          change="+4.2%"
          trend="down"
          icon={TrendingDown}
          color="red"
        />
        <StatCard
          title="Laba Bersih (Net Profit)"
          value={formatRupiah(netProfit)}
          change="+18.1%"
          trend="up"
          icon={DollarSign}
          color="blue"
        />
        <StatCard
          title="Tingkat Hunian (Occupancy)"
          value={`${occupancyRate}%`}
          change={`${occupiedRooms} dari ${totalRooms} kamar`}
          trend="up"
          icon={Home}
          color="purple"
        />
      </div>

      {/* Quick Actions & Room Status Overview Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Room status distribution */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Status Ketersediaan Kamar Terkini</CardTitle>
            <Link href="/kamar" className="text-xs font-semibold text-emerald-600 hover:underline">
              Buka Interactive Room Grid →
            </Link>
          </CardHeader>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                Kosong
              </div>
              <div className="text-2xl font-bold text-emerald-900">{vacantRooms}</div>
              <div className="text-[11px] text-emerald-600">Siap Ditempati</div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700 text-xs font-semibold mb-1">
                <Home className="w-4 h-4" />
                Terisi Lunas
              </div>
              <div className="text-2xl font-bold text-blue-900">{occupiedRooms}</div>
              <div className="text-[11px] text-blue-600">Sewa Aktif</div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-700 text-xs font-semibold mb-1">
                <Clock className="w-4 h-4" />
                Jatuh Tempo
              </div>
              <div className="text-2xl font-bold text-amber-900">2</div>
              <div className="text-[11px] text-amber-600">&lt; 3 hari lagi</div>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
              <div className="flex items-center gap-2 text-rose-700 text-xs font-semibold mb-1">
                <AlertCircle className="w-4 h-4" />
                Menunggak
              </div>
              <div className="text-2xl font-bold text-rose-900">{overdueRooms}</div>
              <div className="text-[11px] text-rose-600">Perlu Penagihan</div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
            <span className="text-xs text-slate-500">Cabang Aktif:</span>
            <div className="flex gap-2">
              {mockProperties.map((p) => (
                <span key={p.id} className="text-xs font-medium px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700">
                  📍 {p.name} ({p.totalRooms} kmr)
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Pending Verification Queue for Owner */}
        <Card className="border-amber-200 bg-amber-50/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <CardTitle className="text-amber-950">Antrean Verifikasi Pengeluaran</CardTitle>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
              {pendingExpenses.length} Baru
            </span>
          </CardHeader>

          <p className="text-xs text-slate-600 mb-4">
            Pengeluaran operasional yang disubmit oleh Admin Kost dan memerlukan validasi bukti nota dari Owner.
          </p>

          <div className="space-y-3">
            {pendingExpenses.slice(0, 3).map((exp) => (
              <div key={exp.id} className="p-3 bg-white rounded-xl border border-amber-200 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-900">{exp.description}</div>
                  <div className="text-[11px] text-slate-500">
                    {exp.category} • {formatRupiah(exp.amount)}
                  </div>
                </div>
                <Link href="/pengeluaran">
                  <Button size="sm" variant="outline" className="text-xs px-2.5 py-1 h-auto text-emerald-700 border-emerald-300 hover:bg-emerald-50">
                    Cek
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <Link href="/pengeluaran" className="block mt-4">
            <Button variant="outline" size="sm" className="w-full text-xs">
              Buka Semua Antrean Verifikasi →
            </Button>
          </Link>
        </Card>
      </div>

      {/* Activity Feed */}
      <div>
        <ActivityFeed />
      </div>
    </div>
  );
}
