'use client';

import { useState } from 'react';
import { Room, RoomStatus, Tenant } from '@/lib/mock-data';
import { ROOM_STATUS_CONFIG } from '@/lib/constants';
import { formatRupiah } from '@/lib/utils';
import { User, Phone, CheckCircle, Clock, AlertTriangle, XCircle, ArrowUpRight } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  tenant?: Tenant;
  onClick: () => void;
}

export default function RoomCard({ room, tenant, onClick }: RoomCardProps) {
  const config = ROOM_STATUS_CONFIG[room.status] || ROOM_STATUS_CONFIG.VACANT;

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer rounded-2xl border-2 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${config.bgCard}`}
    >
      {/* Header card: Room Number & Status Pill */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-xl font-black text-slate-900 tracking-tight">
          Kamar {room.number}
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${config.badgeClass}`}>
          {config.label}
        </span>
      </div>

      {/* Info Tenant / Vacant indicator */}
      <div className="space-y-1.5 mb-3 min-h-[44px]">
        {tenant ? (
          <>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 truncate">
              <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">{tenant.name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <Phone className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{tenant.whatsapp}</span>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 italic pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Kamar kosong & siap huni
          </div>
        )}
      </div>

      {/* Price & Floor Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
        <span className="text-[11px] font-medium text-slate-500">
          Lt. {room.floor} • {room.size || '3x4m'}
        </span>
        <span className="font-bold text-slate-900">
          {formatRupiah(room.basePrice)}
          <span className="text-[10px] font-normal text-slate-500">/bln</span>
        </span>
      </div>
    </div>
  );
}
