'use client';

import { useState } from 'react';
import {
  FileText,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  Wrench,
  Camera,
  Home,
  CreditCard,
  Send,
  Building2,
  Receipt,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatRupiah, formatDate } from '@/lib/utils';
import { mockTenants, mockRooms, mockProperties, mockInvoices, mockMaintenanceTickets } from '@/lib/mock-data';

export default function TenantPortalPage() {
  // Demo tenant
  const tenant = mockTenants[0];
  const room = mockRooms.find((r) => r.id === tenant.roomId);
  const property = mockProperties.find((p) => p.id === tenant.propertyId);
  const invoices = mockInvoices.filter((i) => i.tenantId === tenant.id);
  const currentInvoice = invoices[0] || {
    id: 'inv_current',
    invoiceNumber: 'INV-2026-11-001',
    totalAmount: 1850000,
    dueDate: '2026-11-25',
    status: 'DUE_SOON',
  };

  // Maintenance ticket form state
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDesc, setComplaintDesc] = useState('');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [ticketSent, setTicketSent] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingTicket(true);
    setTimeout(() => {
      setIsSubmittingTicket(false);
      setTicketSent(true);
      setComplaintTitle('');
      setComplaintDesc('');
      setTimeout(() => setTicketSent(false), 3000);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-200 mb-2">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Portal Anak Kost</h1>
          <p className="text-xs text-slate-500">
            Akses mandiri tagihan, bukti kwitansi digital, dan laporan komplain fasilitas
          </p>
        </div>

        {/* Tenant Profile Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
                Penghuni Terdaftar
              </span>
              <h2 className="text-xl font-bold mt-0.5">{tenant.name}</h2>
              <p className="text-xs text-emerald-100 mt-1 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5" />
                {property?.name} • Kamar {room?.number} (Lt. {room?.floor})
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-bold border border-emerald-400/30">
                Sewa Aktif
              </span>
            </div>
          </div>
        </div>

        {/* Current Invoice Card */}
        <Card className="border-2 border-emerald-500 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">Tagihan Sewa Bulan Ini</h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
              Segera Jatuh Tempo
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 mb-4">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Nomor Invoice</span>
              <span className="font-mono font-bold text-slate-900">{currentInvoice.invoiceNumber}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Jatuh Tempo Pembayaran</span>
              <span className="font-semibold text-rose-600">{formatDate(currentInvoice.dueDate)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <span className="text-sm font-bold text-slate-800">Total yang Harus Dibayar</span>
              <span className="text-2xl font-black text-emerald-700">
                {formatRupiah(currentInvoice.totalAmount)}
              </span>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-slate-700 space-y-2 mb-4">
            <div className="font-bold text-emerald-900 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              Rekening Resmi Pembayaran Kost
            </div>
            <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-emerald-100">
              <div>
                <div className="font-bold text-slate-900">Bank BCA: 8830-1928-31</div>
                <div className="text-[11px] text-slate-500">a.n. PT Bumihijau Manajemen Kost</div>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('8830192831');
                  alert('Nomor rekening disalin!');
                }}
                className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200"
              >
                Salin No. Rek
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Kirimkan bukti transfer kepada Admin Kost melalui WhatsApp untuk verifikasi pelunasan.
            </p>
          </div>

          <a
            href={`https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20sudah%20transfer%20untuk%20Kamar%20${room?.number}`}
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <Button className="w-full py-3 text-sm font-bold">
              Konfirmasi Pembayaran via WhatsApp
            </Button>
          </a>
        </Card>

        {/* Maintenance Complaint Form */}
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Lapor Komplain / Perbaikan Kamar</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            AC kurang dingin, kran air bocor, atau lampu mati? Laporkan langsung ke tim pengelola di sini.
          </p>

          {ticketSent && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Laporan komplain Anda berhasil dikirim! Admin kost akan segera menindaklanjuti.
            </div>
          )}

          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Jenis Kerusakan / Masalah</label>
              <input
                type="text"
                required
                value={complaintTitle}
                onChange={(e) => setComplaintTitle(e.target.value)}
                placeholder="Contoh: AC kamar bocor menetes air"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Rincian Komplain</label>
              <textarea
                rows={3}
                required
                value={complaintDesc}
                onChange={(e) => setComplaintDesc(e.target.value)}
                placeholder="Jelaskan sejak kapan terjadi dan bagian mana yang rusak..."
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <Button type="submit" loading={isSubmittingTicket} size="sm" className="w-full py-2.5 text-xs">
              <Send className="w-3.5 h-3.5 mr-1.5" /> Kirim Tiket Komplain
            </Button>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-slate-400 pt-4">
          Bumihijau Kost © 2026 • Platform Manajemen Kost Multi-Cabang Terpadu
        </div>
      </div>
    </div>
  );
}
