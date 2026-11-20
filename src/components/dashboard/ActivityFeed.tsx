'use client';

import { clsx } from 'clsx';

export type ActivityStatus = 'success' | 'pending' | 'failed' | 'info';

export interface ActivityItem {
  id: string;
  avatarInitials: string;
  avatarBg: string;
  action: string;
  description: string;
  timestamp: string;
  status: ActivityStatus;
}

const defaultActivities: ActivityItem[] = [
  {
    id: '1',
    avatarInitials: 'FA',
    avatarBg: 'bg-emerald-600',
    action: 'Pembayaran Sewa Diterima',
    description: 'Faris Pratama melunasi sewa Kamar 101 periode November',
    timestamp: '10 menit yang lalu',
    status: 'success',
  },
  {
    id: '2',
    avatarInitials: 'BK',
    avatarBg: 'bg-amber-600',
    action: 'Pengeluaran Disubmit Admin',
    description: 'Budi Kost mencatat pembelian token listrik Rp 200.000',
    timestamp: '1 jam yang lalu',
    status: 'pending',
  },
  {
    id: '3',
    avatarInitials: 'DM',
    avatarBg: 'bg-blue-600',
    action: 'Komplain Fasilitas Masuk',
    description: 'Dina melaporkan AC kamar 204 bocor menetes air',
    timestamp: '3 jam yang lalu',
    status: 'info',
  },
  {
    id: '4',
    avatarInitials: 'SY',
    avatarBg: 'bg-purple-600',
    action: 'Penyewa Baru Check-in',
    description: 'Siti Aminah berhasil check-in di Kamar 103 (Kost Pahlawan)',
    timestamp: 'Kemarin',
    status: 'success',
  },
];

const statusConfig: Record<ActivityStatus, { label: string; classes: string }> = {
  success: { label: 'Lunas', classes: 'bg-emerald-100 text-emerald-800' },
  pending: { label: 'Menunggu', classes: 'bg-amber-100 text-amber-800' },
  failed:  { label: 'Gagal',    classes: 'bg-rose-100 text-rose-800' },
  info:    { label: 'Laporan',  classes: 'bg-blue-100 text-blue-800' },
};

interface ActivityFeedProps {
  items?: ActivityItem[];
  title?: string;
}

export default function ActivityFeed({ items = defaultActivities, title = 'Aktivitas Terkini Operasional' }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5">
      <h3 className="text-base font-bold text-slate-900 mb-4">{title}</h3>
      <ul className="divide-y divide-slate-100">
        {items.map((item) => {
          const { label, classes } = statusConfig[item.status];
          return (
            <li key={item.id} className="flex items-start gap-3 py-3">
              {/* Avatar */}
              <div
                className={clsx(
                  'flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-xs',
                  item.avatarBg
                )}
              >
                {item.avatarInitials}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 leading-snug">{item.action}</p>
                <p className="text-xs text-slate-500 truncate mt-0.5">{item.description}</p>
              </div>

              {/* Status and timestamp */}
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className={clsx('text-[10px] font-bold px-2 py-0.5 rounded-full', classes)}>
                  {label}
                </span>
                <span className="text-[10px] text-slate-400">{item.timestamp}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
