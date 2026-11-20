'use client';

import { useState } from 'react';
import { mockProperties, mockRooms, mockTenants, Room, RoomStatus } from '@/lib/mock-data';
import RoomCard from '@/components/rooms/RoomCard';
import RoomDetailModal from '@/components/rooms/RoomDetailModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, Filter, Plus, Search } from 'lucide-react';
import Link from 'next/link';

export default function RoomGridPage() {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(mockProperties[0].id);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Filter rooms
  const propertyRooms = mockRooms.filter((r) => r.propertyId === selectedPropertyId);
  const filteredRooms = propertyRooms.filter((r) => {
    const matchStatus = statusFilter === 'ALL' || r.status === statusFilter;
    const matchSearch = r.number.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getTenantForRoom = (tenantId?: string) => {
    if (!tenantId) return undefined;
    return mockTenants.find((t) => t.id === tenantId);
  };

  // Status counters
  const total = propertyRooms.length;
  const vacant = propertyRooms.filter((r) => r.status === 'VACANT').length;
  const occupied = propertyRooms.filter((r) => r.status === 'OCCUPIED').length;
  const dueSoon = propertyRooms.filter((r) => r.status === 'DUE_SOON').length;
  const overdue = propertyRooms.filter((r) => r.status === 'OVERDUE').length;

  return (
    <div className="space-y-6">
      {/* Top Header & Property Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Interactive Room Grid</h2>
          <p className="text-xs text-slate-500 mt-1">
            Visualisasi status kamar secara real-time berdasarkan pembayaran & hunian
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Property Dropdown Selector */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs">
            <Building2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
            <select
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              className="text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
            >
              {mockProperties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <Link href="/penyewa/baru">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-1.5" /> Check-in Tamu
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary KPI Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <button
          onClick={() => setStatusFilter('ALL')}
          className={`p-3 rounded-xl border text-left transition-all ${
            statusFilter === 'ALL'
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-[11px] opacity-80 font-medium">Semua Kamar</div>
          <div className="text-xl font-bold">{total}</div>
        </button>

        <button
          onClick={() => setStatusFilter('VACANT')}
          className={`p-3 rounded-xl border text-left transition-all ${
            statusFilter === 'VACANT'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50'
          }`}
        >
          <div className="text-[11px] font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Kosong
          </div>
          <div className="text-xl font-bold text-emerald-950">{vacant}</div>
        </button>

        <button
          onClick={() => setStatusFilter('OCCUPIED')}
          className={`p-3 rounded-xl border text-left transition-all ${
            statusFilter === 'OCCUPIED'
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-white text-blue-800 border-blue-200 hover:bg-blue-50'
          }`}
        >
          <div className="text-[11px] font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Terisi (Lunas)
          </div>
          <div className="text-xl font-bold text-blue-950">{occupied}</div>
        </button>

        <button
          onClick={() => setStatusFilter('DUE_SOON')}
          className={`p-3 rounded-xl border text-left transition-all ${
            statusFilter === 'DUE_SOON'
              ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
              : 'bg-white text-amber-800 border-amber-200 hover:bg-amber-50'
          }`}
        >
          <div className="text-[11px] font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Jatuh Tempo
          </div>
          <div className="text-xl font-bold text-amber-950">{dueSoon}</div>
        </button>

        <button
          onClick={() => setStatusFilter('OVERDUE')}
          className={`p-3 rounded-xl border text-left transition-all ${
            statusFilter === 'OVERDUE'
              ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
              : 'bg-white text-rose-800 border-rose-200 hover:bg-rose-50'
          }`}
        >
          <div className="text-[11px] font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Menunggak
          </div>
          <div className="text-xl font-bold text-rose-950">{overdue}</div>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nomor kamar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            tenant={getTenantForRoom(room.tenantId)}
            onClick={() => setSelectedRoom(room)}
          />
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-sm text-slate-500">Tidak ada kamar yang cocok dengan filter atau pencarian Anda.</p>
        </Card>
      )}

      {/* Slide-over Detail Modal */}
      {selectedRoom && (
        <RoomDetailModal
          room={selectedRoom}
          tenant={getTenantForRoom(selectedRoom.tenantId)}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
}
