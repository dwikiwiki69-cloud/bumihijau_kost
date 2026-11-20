'use client';

import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { clsx } from 'clsx';
import { formatRupiah } from '@/lib/utils';

export interface NetProfitCardProps {
  amount?: number;
  netProfit?: number;
  revenue?: number;
  expenses?: number;
  period?: string;
  previousAmount?: number;
  label?: string;
}

export default function NetProfitCard({
  amount,
  netProfit,
  revenue,
  expenses,
  period = 'Bulan Ini',
  previousAmount,
  label = 'Net Profit (Laba Bersih)',
}: NetProfitCardProps) {
  const finalProfit = netProfit !== undefined ? netProfit : amount || 0;
  const isPositive = finalProfit >= 0;

  return (
    <div
      className={clsx(
        'rounded-2xl p-6 shadow-lg text-white relative overflow-hidden transition-all',
        isPositive
          ? 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800'
          : 'bg-gradient-to-br from-rose-600 to-red-800'
      )}
    >
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">{label}</span>
            <p className="text-xs text-white/70">{period}</p>
          </div>
          <span className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
            <DollarSign className="w-5 h-5 text-white" />
          </span>
        </div>

        <div className="text-3xl md:text-4xl font-black tracking-tight">
          {formatRupiah(finalProfit)}
        </div>

        {revenue !== undefined && expenses !== undefined && (
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/15 text-xs">
            <div>
              <div className="text-white/70 text-[11px]">Total Pendapatan Lunas</div>
              <div className="text-sm font-bold text-white mt-0.5">{formatRupiah(revenue)}</div>
            </div>
            <div>
              <div className="text-white/70 text-[11px]">Beban Pengeluaran Valid</div>
              <div className="text-sm font-bold text-rose-200 mt-0.5">-{formatRupiah(expenses)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
