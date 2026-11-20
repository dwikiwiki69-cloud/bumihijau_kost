'use client';

import { clsx } from 'clsx';
import { formatRupiah } from '@/lib/utils';
import { Expense } from '@/lib/mock-data';

interface ExpenseItem {
  category: string;
  amount: number;
  color?: string;
}

export interface ExpenseBreakdownProps {
  items?: ExpenseItem[];
  total?: number;
  expenses?: Expense[];
}

const categoryColors: Record<string, string> = {
  LISTRIK: 'bg-amber-400',
  AIR: 'bg-cyan-400',
  CUCI_AC: 'bg-sky-400',
  MAINTENANCE: 'bg-orange-400',
  KEBERSIHAN: 'bg-emerald-400',
  OPERASIONAL_LAINNYA: 'bg-slate-400',
};

const categoryLabels: Record<string, string> = {
  LISTRIK: '⚡ Listrik / Token',
  AIR: '💧 Air PAM / Sumur',
  CUCI_AC: '❄️ Cuci AC & Servis',
  MAINTENANCE: '🔧 Perbaikan Fasilitas',
  KEBERSIHAN: '🧹 Kebersihan & Sampah',
  OPERASIONAL_LAINNYA: '📦 Operasional Lainnya',
};

export default function ExpenseBreakdown({ items, total, expenses }: ExpenseBreakdownProps) {
  let displayItems: ExpenseItem[] = items || [];
  let displayTotal = total || 0;

  if (expenses && expenses.length > 0) {
    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    displayItems = Object.entries(grouped).map(([cat, amt]) => ({
      category: cat,
      amount: amt,
      color: categoryColors[cat] || 'bg-slate-400',
    }));

    displayTotal = displayItems.reduce((sum, item) => sum + item.amount, 0);
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <h3 className="text-sm font-bold text-slate-900 mb-4">Rincian Beban Kategori</h3>
      <div className="space-y-3.5">
        {displayItems.map((item) => {
          const percentage = displayTotal > 0 ? Math.round((item.amount / displayTotal) * 100) : 0;
          const colorClass = item.color || categoryColors[item.category] || 'bg-slate-400';
          const label = categoryLabels[item.category] || item.category;

          return (
            <div key={item.category} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">{label}</span>
                <span className="font-bold text-slate-900">
                  {formatRupiah(item.amount)} <span className="text-slate-400 font-normal">({percentage}%)</span>
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={clsx('h-full rounded-full transition-all duration-300', colorClass)}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
