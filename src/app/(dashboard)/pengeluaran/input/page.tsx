'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Camera,
  Upload,
  AlertCircle,
  Zap,
  Droplets,
  Wind,
  Wrench,
  Trash2,
  MoreHorizontal,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockProperties, mockRooms } from '@/lib/mock-data';
import { formatRupiah } from '@/lib/utils';
import Link from 'next/link';

const categories = [
  { id: 'LISTRIK', label: 'Listrik / Token', icon: Zap, color: 'text-amber-500 bg-amber-50 border-amber-200' },
  { id: 'AIR', label: 'Air PAM / Sumur', icon: Droplets, color: 'text-cyan-500 bg-cyan-50 border-cyan-200' },
  { id: 'CUCI_AC', label: 'Cuci AC & Servis', icon: Wind, color: 'text-sky-500 bg-sky-50 border-sky-200' },
  { id: 'MAINTENANCE', label: 'Perbaikan / Tukang', icon: Wrench, color: 'text-orange-500 bg-orange-50 border-orange-200' },
  { id: 'KEBERSIHAN', label: 'Kebersihan & Sampah', icon: Trash2, color: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
  { id: 'OPERASIONAL_LAINNYA', label: 'Operasional Lainnya', icon: MoreHorizontal, color: 'text-slate-500 bg-slate-50 border-slate-200' },
];

export default function InputExpensePage() {
  const router = useRouter();
  const [propertyId, setPropertyId] = useState(mockProperties[0].id);
  const [category, setCategory] = useState('LISTRIK');
  const [amount, setAmount] = useState('');
  const [roomId, setRoomId] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('2026-11-21');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Threshold rule: max Rp 200.000 for direct expense logging
  const currentProperty = mockProperties.find((p) => p.id === propertyId);
  const threshold = 200000;
  const numAmount = Number(amount) || 0;
  const isAboveThreshold = numAmount > threshold && category === 'MAINTENANCE';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewImage) {
      alert('Foto bukti nota/struk pengeluaran wajib diunggah!');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/pengeluaran');
      }, 1200);
    }, 700);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/pengeluaran">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">Input Pengeluaran Operasional</h2>
          <p className="text-xs text-slate-500">
            Form pencatatan pengeluaran lapangan oleh Admin Kost untuk disinkronkan ke Owner
          </p>
        </div>
      </div>

      {showSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-sm">
            <span className="font-bold">Pengeluaran Berhasil Dicatat!</span> Telah masuk ke Antrean Verifikasi Owner.
          </div>
        </div>
      )}

      {/* Threshold Warning Banner */}
      {isAboveThreshold && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <div className="font-bold">Perhatian: Nominal Melebihi Batas Threshold ({formatRupiah(threshold)})</div>
            <p>
              Pengeluaran kategori Maintenance di atas batas harus diajukan melalui Pengajuan Dana ke Owner terlebih dahulu.
            </p>
            <Link href="/pengeluaran/request" className="inline-block text-amber-800 font-bold underline mt-1">
              Buka Form Pengajuan Dana →
            </Link>
          </div>
        </div>
      )}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cabang Kost */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Pilih Cabang Kost</label>
            <select
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {mockProperties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.address}
                </option>
              ))}
            </select>
          </div>

          {/* Kategori Pengeluaran (Large Grid Buttons) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">Kategori Pengeluaran</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20 text-emerald-950 font-bold'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-600' : 'text-slate-500'}`} />
                    <span className="text-xs">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nominal Rp */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Jumlah Pengeluaran (Rp)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">Rp</span>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="150000"
                className="w-full rounded-xl border border-slate-300 bg-white pl-12 pr-3.5 py-2.5 text-base font-bold text-slate-900 placeholder:text-slate-300 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            {numAmount > 0 && (
              <p className="text-xs text-emerald-700 font-semibold">{formatRupiah(numAmount)}</p>
            )}
          </div>

          {/* Spesifik Kamar (Optional) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Spesifik Kamar (Opsional — contoh: Cuci AC Kamar 04)
            </label>
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="">-- Pengeluaran Fasilitas Umum / Semua Kamar --</option>
              {mockRooms
                .filter((r) => r.propertyId === propertyId)
                .map((r) => (
                  <option key={r.id} value={r.id}>
                    Kamar {r.number} (Lt. {r.floor})
                  </option>
                ))}
            </select>
          </div>

          {/* Tanggal Transaksi & Deskripsi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Tanggal Transaksi</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Deskripsi / Keterangan</label>
              <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Contoh: Beli token listrik meteran 2"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Bukti Foto Wajib Upload */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-emerald-600" />
                Foto Bukti Struk / Nota (WAJIB NOT NULL)
              </label>
              <span className="text-[10px] text-slate-400">Kompresi Otomatis Klien</span>
            </div>

            <label className="block cursor-pointer">
              <div className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl p-6 text-center bg-emerald-50/30 transition-colors">
                {previewImage ? (
                  <div className="space-y-2">
                    <img
                      src={previewImage}
                      alt="Bukti Preview"
                      className="max-h-48 mx-auto rounded-xl shadow-md border border-slate-200 object-cover"
                    />
                    <p className="text-xs text-emerald-700 font-semibold">Klik untuk ganti foto</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="text-xs font-semibold text-slate-800">
                      Ambil Foto atau Pilih Gambar Nota
                    </div>
                    <p className="text-[11px] text-slate-400">JPG, PNG (Maks 5MB)</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </label>
          </div>

          <Button type="submit" loading={isSubmitting} className="w-full py-3.5 text-base font-bold shadow-lg shadow-emerald-200">
            Submit Pengeluaran ke Owner
          </Button>
        </form>
      </Card>
    </div>
  );
}
