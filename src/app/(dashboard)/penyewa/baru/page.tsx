'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, User, Phone, ShieldCheck, Home, Calendar, Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockProperties, mockRooms } from '@/lib/mock-data';
import { formatRupiah } from '@/lib/utils';
import Link from 'next/link';

export default function NewTenantCheckInPage() {
  const router = useRouter();
  const [propertyId, setPropertyId] = useState(mockProperties[0].id);
  const [roomId, setRoomId] = useState('');
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [startDate, setStartDate] = useState('2026-11-21');
  const [billingCycle, setBillingCycle] = useState('MONTHLY');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Available vacant rooms
  const vacantRooms = mockRooms.filter(
    (r) => r.propertyId === propertyId && r.status === 'VACANT'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => router.push('/kamar'), 1200);
    }, 700);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/penyewa">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">Check-in Penyewa Baru (KYC)</h2>
          <p className="text-xs text-slate-500">
            Form pendaftaran tamu baru, verifikasi identitas KTP, dan kontrak sewa kamar
          </p>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-sm">
            <span className="font-bold">Check-in Berhasil!</span> Kamar otomatis diperbarui menjadi terisi dan magic-link telah digenerate.
          </div>
        </div>
      )}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Property & Room Selection */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
              <Home className="w-4 h-4" /> 1. Pemilihan Kamar Kost
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Cabang Kost</label>
                <select
                  value={propertyId}
                  onChange={(e) => setPropertyId(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900"
                >
                  {mockProperties.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Pilih Kamar Kosong</label>
                <select
                  required
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900"
                >
                  <option value="">-- Pilih Kamar Tersedia --</option>
                  {vacantRooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      Kamar {r.number} (Lt. {r.floor}) — {formatRupiah(r.basePrice)}/bln
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Personal KYC */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-4 h-4" /> 2. Data Identitas Penghuni (KYC)
            </h3>

            <div className="space-y-3">
              <Input
                label="Nama Lengkap Sesuai KTP"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Contoh: Muhammad Farhan"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nomor WhatsApp"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="08123456789"
                />

                <Input
                  label="Nomor NIK / KTP"
                  required
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="3201234567890001"
                />
              </div>

              <Input
                label="Kontak Darurat (Keluarga / Kerabat)"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="Ibu Farida (081398765432)"
              />
            </div>
          </div>

          {/* Section 3: Lease Details */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> 3. Periode & Siklus Sewa
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Tanggal Mulai Masuk</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Siklus Pembayaran</label>
                <select
                  value={billingCycle}
                  onChange={(e) => setBillingCycle(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900"
                >
                  <option value="MONTHLY">Bulanan (Per Bulan)</option>
                  <option value="YEARLY">Tahunan (Per Tahun)</option>
                </select>
              </div>
            </div>
          </div>

          <Button type="submit" loading={isSubmitting} className="w-full py-3.5 font-bold text-sm shadow-lg shadow-emerald-200">
            Selesaikan Check-in & Terbitkan Magic Link
          </Button>
        </form>
      </Card>
    </div>
  );
}
