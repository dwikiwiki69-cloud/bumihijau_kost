'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Receipt,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  Send,
  Plus,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockInvoices, mockRooms, mockTenants, Invoice } from '@/lib/mock-data';
import { INVOICE_STATUS_CONFIG } from '@/lib/constants';
import { formatRupiah, formatDate } from '@/lib/utils';

export default function InvoicesListPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const handleMarkPaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, status: 'PAID', paidDate: new Date().toISOString() } : inv
      )
    );
  };

  const filtered = invoices.filter((inv) => {
    const matchStatus = statusFilter === 'ALL' || inv.status === statusFilter;
    const matchSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.roomId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getTenantName = (tenantId: string) => {
    return mockTenants.find((t) => t.id === tenantId)?.name || 'Penghuni';
  };

  const getTenantWA = (tenantId: string) => {
    return mockTenants.find((t) => t.id === tenantId)?.whatsapp || '';
  };

  const getRoomNumber = (roomId: string) => {
    return mockRooms.find((r) => r.id === roomId)?.number || roomId;
  };

  // KPI summaries
  const totalPaid = invoices.filter((i) => i.status === 'PAID').reduce((sum, i) => sum + i.totalAmount, 0);
  const totalUnpaid = invoices.filter((i) => i.status === 'UNPAID' || i.status === 'DUE_SOON').reduce((sum, i) => sum + i.totalAmount, 0);
  const totalOverdue = invoices.filter((i) => i.status === 'OVERDUE').reduce((sum, i) => sum + i.totalAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Manajemen Tagihan & Invoice</h2>
          <p className="text-xs text-slate-500 mt-1">
            Pantau status pembayaran sewa bulanan dan kirim pengingat WhatsApp
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
          <div className="text-xs font-semibold text-emerald-700 mb-1 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" /> Tagihan Sudah Lunas
          </div>
          <div className="text-2xl font-bold text-emerald-950">{formatRupiah(totalPaid)}</div>
          <div className="text-[11px] text-emerald-600 mt-1">Bulan berjalan</div>
        </div>

        <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
          <div className="text-xs font-semibold text-blue-700 mb-1 flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> Menunggu Pembayaran
          </div>
          <div className="text-2xl font-bold text-blue-950">{formatRupiah(totalUnpaid)}</div>
          <div className="text-[11px] text-blue-600 mt-1">Belum jatuh tempo</div>
        </div>

        <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200">
          <div className="text-xs font-semibold text-rose-700 mb-1 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> Tagihan Menunggak
          </div>
          <div className="text-2xl font-bold text-rose-950">{formatRupiah(totalOverdue)}</div>
          <div className="text-[11px] text-rose-600 mt-1">Perlu tindakan penagihan</div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'UNPAID', 'DUE_SOON', 'OVERDUE', 'PAID', 'VOID'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'ALL' ? 'Semua' : st}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nomor invoice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      {/* Invoice Table Card */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
              <tr>
                <th className="px-4 py-3.5">No. Invoice</th>
                <th className="px-4 py-3.5">Penyewa & Kamar</th>
                <th className="px-4 py-3.5">Jatuh Tempo</th>
                <th className="px-4 py-3.5 text-right">Nominal</th>
                <th className="px-4 py-3.5 text-center">Status</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((inv) => {
                const config = INVOICE_STATUS_CONFIG[inv.status] || INVOICE_STATUS_CONFIG.UNPAID;
                const tenantName = getTenantName(inv.tenantId);
                const tenantWA = getTenantWA(inv.tenantId);
                const roomNum = getRoomNumber(inv.roomId);

                const waMessage = encodeURIComponent(
                  `Halo Kak ${tenantName}, berikut info tagihan sewa Kamar ${roomNum} sebesar ${formatRupiah(
                    inv.totalAmount
                  )} dengan jatuh tempo ${formatDate(inv.dueDate)}. Terima kasih!`
                );

                return (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-slate-800">
                      {inv.invoiceNumber}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{tenantName}</div>
                      <div className="text-[11px] text-slate-500">Kamar {roomNum}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDate(inv.dueDate)}
                    </td>
                    <td className="px-4 py-3 text-right font-black text-slate-900">
                      {formatRupiah(inv.totalAmount)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${config.badgeClass}`}>
                        {config.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-1">
                      {inv.status !== 'PAID' && (
                        <Button
                          size="sm"
                          onClick={() => handleMarkPaid(inv.id)}
                          className="text-xs px-2.5 py-1 h-auto bg-emerald-600 hover:bg-emerald-700"
                        >
                          Tandai Lunas
                        </Button>
                      )}

                      {tenantWA && inv.status !== 'PAID' && (
                        <a
                          href={`https://wa.me/${tenantWA.replace(/\D/g, '')}?text=${waMessage}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 transition-colors"
                        >
                          <Send className="w-3 h-3" /> WA
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
