'use client';

import { X, User, Phone, Calendar, CreditCard, ShieldAlert, Wrench, ArrowRight } from 'lucide-react';
import { Room, Tenant } from '@/lib/mock-data';
import { ROOM_STATUS_CONFIG } from '@/lib/constants';
import { formatRupiah, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface RoomDetailModalProps {
  room: Room | null;
  tenant?: Tenant;
  onClose: () => void;
}

export default function RoomDetailModal({ room, tenant, onClose }: RoomDetailModalProps) {
  if (!room) return null;

  const config = ROOM_STATUS_CONFIG[room.status] || ROOM_STATUS_CONFIG.VACANT;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 bg-slate-50 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900">Kamar {room.number}</h3>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${config.badgeClass}`}>
                {config.label}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Lantai {room.floor} • Ukuran {room.size || '3x4 m'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Price information */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-sm font-medium text-slate-600">Harga Sewa Dasar</span>
            <span className="text-lg font-black text-emerald-700">{formatRupiah(room.basePrice)}/bulan</span>
          </div>

          {/* Tenant KYC / Information if occupied */}
          {tenant ? (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Data Penghuni Saat Ini
              </h4>
              <div className="p-4 rounded-xl border border-slate-200 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama Lengkap</span>
                  <span className="font-semibold text-slate-900">{tenant.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nomor WhatsApp</span>
                  <a
                    href={`https://wa.me/${tenant.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-emerald-600 hover:underline"
                  >
                    {tenant.whatsapp} ↗
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">No. KTP / Identitas</span>
                  <span className="font-mono text-xs text-slate-700">{tenant.idNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tanggal Mulai Sewa</span>
                  <span className="text-slate-700">{formatDate(tenant.checkInDate)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center border-2 border-dashed border-emerald-200 rounded-xl bg-emerald-50/50">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                <User className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800">Kamar Kosong</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Kamar ini belum ada penghuni. Anda dapat mendaftarkan tamu baru sekarang.
              </p>
              <Link href="/penyewa/baru">
                <Button size="sm" className="mt-4">
                  + Check-in Tamu Baru
                </Button>
              </Link>
            </div>
          )}

          {/* Room facilities */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Fasilitas Kamar
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(room.facilities || ['AC', 'Kamar Mandi Dalam', 'Kasur Springbed', 'Lemari', 'WiFi']).map((fac) => (
                <span key={fac} className="px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-700">
                  ✓ {fac}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Tutup
          </Button>
          {tenant && (
            <Link href={`/penyewa/${tenant.id}`}>
              <Button size="sm">
                Lihat Detail Penghuni <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
