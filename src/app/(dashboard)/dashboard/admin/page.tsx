'use client';

import Link from 'next/link';
import {
  PlusCircle,
  UserCheck,
  Wrench,
  AlertTriangle,
  Receipt,
  BedDouble,
  Clock,
  Camera,
} from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatRupiah } from '@/lib/utils';
import { mockRooms, mockExpenses } from '@/lib/mock-data';

export default function AdminDashboardPage() {
  const totalOccupied = mockRooms.filter((r) => r.status === 'OCCUPIED' || r.status === 'DUE_SOON').length;
  const overdueRooms = mockRooms.filter((r) => r.status === 'OVERDUE');
  const myExpenses = mockExpenses.filter((e) => e.adminId === 'admin_1');

  return (
    <div className="space-y-6">
      {/* Admin Mobile-First Welcome */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-xs font-semibold uppercase">
            Admin Kost (Field Operator)
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold">Halo, Mas Budi! 👷‍♂️</h2>
        <p className="text-blue-200 text-xs mt-1">
          Operasional Cabang: Kost Merdeka & Pahlawan. Catat pengeluaran harian dan kelola tamu di lapangan.
        </p>
      </div>

      {/* Big Action Buttons (Touch-friendly for phone) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/pengeluaran/input" className="block">
          <div className="p-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200 transition-all flex items-center justify-between group">
            <div className="space-y-1">
              <div className="text-xs font-medium text-emerald-100 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" /> Bukti Nota Wajib
              </div>
              <div className="text-lg font-bold">Input Pengeluaran</div>
              <div className="text-xs text-emerald-100">Listrik, Air, AC, Servis</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlusCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </Link>

        <Link href="/penyewa/baru" className="block">
          <div className="p-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 transition-all flex items-center justify-between group">
            <div className="space-y-1">
              <div className="text-xs font-medium text-blue-100 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" /> Check-in KYC
              </div>
              <div className="text-lg font-bold">Penyewa Baru</div>
              <div className="text-xs text-blue-100">Upload KTP & Pilih Kamar</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BedDouble className="w-6 h-6 text-white" />
            </div>
          </div>
        </Link>

        <Link href="/kamar" className="block">
          <div className="p-5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-200 transition-all flex items-center justify-between group">
            <div className="space-y-1">
              <div className="text-xs font-medium text-amber-100 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Cek Kamar
              </div>
              <div className="text-lg font-bold">Status Kamar</div>
              <div className="text-xs text-amber-100">Visual Grid Lapangan</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </Link>
      </div>

      {/* Operational Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overdue alert for Admin to remind */}
        <Card className="border-rose-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <CardTitle className="text-rose-950">Daftar Kamar Menunggak</CardTitle>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
              {overdueRooms.length} Kamar
            </span>
          </CardHeader>
          <p className="text-xs text-slate-600 mb-3">
            Kamar berikut telah melewati tanggal jatuh tempo. Segera koordinasikan dengan penyewa:
          </p>
          <div className="space-y-2">
            {overdueRooms.map((room) => (
              <div key={room.id} className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-rose-950">Kamar {room.number}</div>
                  <div className="text-xs text-rose-700">Penyewa: {room.tenantId ? 'Terdaftar' : 'Belum update'}</div>
                </div>
                <Link href={`/kamar`}>
                  <Button size="sm" variant="outline" className="text-xs border-rose-300 text-rose-700 hover:bg-rose-100">
                    Detail Kamar
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>

        {/* Expenses submitted by Admin */}
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Pengeluaran Terakhir yang Anda Submit</CardTitle>
            <Link href="/pengeluaran" className="text-xs text-emerald-600 font-semibold hover:underline">
              Lihat Semua →
            </Link>
          </CardHeader>
          <div className="space-y-2.5">
            {myExpenses.slice(0, 4).map((exp) => (
              <div key={exp.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-800">{exp.description}</div>
                  <div className="text-slate-500">{exp.category} • {exp.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">{formatRupiah(exp.amount)}</div>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mt-0.5 ${
                    exp.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                    exp.status === 'PENDING_REVIEW' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {exp.status === 'PENDING_REVIEW' ? 'Menunggu Owner' : exp.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
