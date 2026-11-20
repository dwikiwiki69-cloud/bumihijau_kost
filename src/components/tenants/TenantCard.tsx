'use client';

import Link from 'next/link';
import { Phone, Home, Calendar, Building2, ChevronRight, User } from 'lucide-react';
import { clsx } from 'clsx';
import { Tenant } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';

export interface TenantCardProps {
  tenant?: Tenant;
  id?: string;
  name?: string;
  room?: string;
  property?: string;
  whatsapp?: string;
  checkInDate?: string;
  status?: string;
  onSelect?: (tenant: Tenant) => void;
}

export default function TenantCard({
  tenant,
  id,
  name,
  room,
  property,
  whatsapp,
  checkInDate,
  status = 'Aktif',
  onSelect,
}: TenantCardProps) {
  const displayId = tenant?.id || id || '';
  const displayName = tenant?.name || name || '';
  const displayRoom = tenant?.roomId || room || '';
  const displayWhatsapp = tenant?.whatsapp || whatsapp || '';
  const displayCheckIn = tenant?.checkInDate || checkInDate || '';

  return (
    <div
      onClick={() => tenant && onSelect && onSelect(tenant)}
      className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-md hover:border-emerald-300 transition-all duration-200 cursor-pointer space-y-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
            {displayName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 leading-tight">{displayName}</h4>
            <p className="text-xs text-slate-500 mt-0.5">Penghuni Terdaftar</p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
          {status}
        </span>
      </div>

      <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">WhatsApp:</span>
          <span className="font-semibold text-slate-800">{displayWhatsapp}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Mulai Masuk:</span>
          <span>{formatDate(displayCheckIn)}</span>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs text-emerald-600 font-semibold">
        <span>Buka Portal Mandiri ↗</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
}
