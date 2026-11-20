'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockProperties } from '@/lib/mock-data';
import { formatRupiah } from '@/lib/utils';
import Link from 'next/link';

export default function RequestExpensePage() {
  const router = useRouter();
  const [propertyId, setPropertyId] = useState(mockProperties[0].id);
  const [category, setCategory] = useState('MAINTENANCE');
  const [estimatedAmount, setEstimatedAmount] = useState('750000');
  const [reason, setReason] = useState('Penggantian kompresor AC kamar 08 yang rusak dan berisik.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => router.push('/pengeluaran'), 1500);
    }, 600);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/pengeluaran">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">Pengajuan Dana di Atas Batas</h2>
          <p className="text-xs text-slate-500">
            Persetujuan Owner diperlukan sebelum melakukan perbaikan bernilai besar
          </p>
        </div>
      </div>

      {submitted && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-sm">
            <span className="font-bold">Pengajuan Terkirim!</span> Menunggu approval dari Owner Kost.
          </div>
        </div>
      )}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Cabang Kost</label>
            <select
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
            >
              {mockProperties.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Estimasi Kebutuhan Dana (Rp)</label>
            <Input
              type="number"
              value={estimatedAmount}
              onChange={(e) => setEstimatedAmount(e.target.value)}
              required
            />
            <p className="text-xs text-emerald-700 font-semibold">{formatRupiah(Number(estimatedAmount) || 0)}</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Alasan & Rincian Pengajuan Dana</label>
            <textarea
              rows={4}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Jelaskan kebutuhan pengeluaran secara lengkap..."
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <Button type="submit" loading={isSubmitting} className="w-full py-3">
            Kirim Pengajuan ke Owner
          </Button>
        </form>
      </Card>
    </div>
  );
}
