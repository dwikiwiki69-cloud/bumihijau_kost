'use client';

import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface StatCardProps {
  title?: string;
  label?: string;
  value: string;
  change?: string | number;
  trend?: 'up' | 'down';
  icon: LucideIcon;
  color?: 'green' | 'red' | 'blue' | 'purple';
  iconBgColor?: string;
  iconColor?: string;
}

const colorMap = {
  green: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
  red: { bg: 'bg-rose-100', text: 'text-rose-600' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
};

export default function StatCard({
  title,
  label,
  value,
  change,
  trend,
  icon: Icon,
  color = 'green',
  iconBgColor,
  iconColor,
}: StatCardProps) {
  const displayLabel = title || label || '';
  const chosenColor = colorMap[color];
  const bgClass = iconBgColor || chosenColor.bg;
  const textClass = iconColor || chosenColor.text;

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5 flex flex-col justify-between gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">{displayLabel}</span>
        <div className={clsx('p-2.5 rounded-xl', bgClass)}>
          <Icon className={clsx('w-5 h-5', textClass)} />
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-2xl font-black text-slate-900 tracking-tight">{value}</div>
        {change !== undefined && (
          <div className="flex items-center gap-1.5 text-xs">
            <span
              className={clsx(
                'font-bold',
                trend === 'up'
                  ? 'text-emerald-600'
                  : trend === 'down'
                  ? 'text-rose-600'
                  : 'text-slate-500'
              )}
            >
              {typeof change === 'number'
                ? `${change >= 0 ? '+' : ''}${change}%`
                : change}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
