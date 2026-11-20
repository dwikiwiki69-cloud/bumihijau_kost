'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Plus,
  Phone,
  Home,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockTenants, mockRooms, mockProperties } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import TenantCard from '@/components/tenants/TenantCard';

export default function TenantsPage() {
  const [tenants, setTenants] = useState(mockTenants);
  const [search, setSearch] = useState('');
  const [propertyFilter, setPropertyFilter] = useState('ALL');

  const filtered = tenants.filter((t) => {
    const matchProp = propertyFilter === 'ALL' || t.propertyId === propertyFilter;
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.whatsapp.includes(search) ||
      t.idNumber.includes(search);
    return matchProp && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Data Penyewa (Anak Kost)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Kelola data KYC, kontak darurat, masa sewa, dan magic-link portal mandiri tiap penghuni
          </p>
        </div>

        <Link href="/penyewa/baru">
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> + Check-in Penyewa Baru
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <select
            value={propertyFilter}
            onChange={(e) => setPropertyFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium"
          >
            <option value="ALL">Semua Cabang Kost</option>
            {mockProperties.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <span className="text-xs text-slate-500 font-medium">{filtered.length} Penyewa</span>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama / WhatsApp..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      {/* Tenants Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tenant) => (
          <TenantCard
            key={tenant.id}
            tenant={tenant}
            onSelect={(t) => {
              window.open(`/portal/magic-${t.id}`, '_blank');
            }}
          />
        ))}
      </div>
    </div>
  );
}
