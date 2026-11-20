'use client';

import {
  Zap,
  Droplets,
  Wind,
  Wrench,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  Flag,
  XCircle,
  Eye,
} from 'lucide-react';
import { clsx } from 'clsx';
import { formatRupiah, formatDate } from '@/lib/utils';
import { Expense } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

interface ExpenseCardProps {
  expense: Expense;
  isOwner?: boolean;
  onApprove?: (id: string) => void;
  onFlag?: (id: string) => void;
  onVoid?: (id: string) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  LISTRIK: Zap,
  AIR: Droplets,
  CUCI_AC: Wind,
  MAINTENANCE: Wrench,
  KEBERSIHAN: Trash2,
  OPERASIONAL_LAINNYA: MoreHorizontal,
};

const statusClasses: Record<string, string> = {
  APPROVED: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  PENDING_REVIEW: 'bg-amber-100 text-amber-800 border-amber-300',
  FLAGGED: 'bg-rose-100 text-rose-800 border-rose-300',
  VOID: 'bg-slate-100 text-slate-500 border-slate-300 line-through',
};

export default function ExpenseCard({
  expense,
  isOwner = true,
  onApprove,
  onFlag,
  onVoid,
}: ExpenseCardProps) {
  const Icon = categoryIcons[expense.category] || MoreHorizontal;
  const statusBadge = statusClasses[expense.status] || statusClasses.PENDING_REVIEW;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <Icon className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {expense.category}
              </span>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">{expense.description}</h4>
            </div>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge}`}>
            {expense.status}
          </span>
        </div>

        <div className="space-y-1 text-xs text-slate-500 pt-2">
          <div className="flex justify-between">
            <span>Nominal</span>
            <span className="font-bold text-slate-900 text-sm">{formatRupiah(expense.amount)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tanggal</span>
            <span>{formatDate(expense.date)}</span>
          </div>
          <div className="flex justify-between">
            <span>Admin Petugas</span>
            <span className="font-mono text-slate-700">{expense.adminId}</span>
          </div>
        </div>

        {expense.notes && (
          <div className="mt-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
            <span className="font-bold">Catatan Owner:</span> {expense.notes}
          </div>
        )}
      </div>

      {/* Action buttons if pending */}
      {isOwner && expense.status === 'PENDING_REVIEW' && (
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          {onApprove && (
            <Button
              size="sm"
              onClick={() => onApprove(expense.id)}
              className="flex-1 text-xs py-1.5 h-auto bg-emerald-600 hover:bg-emerald-700"
            >
              Setujui
            </Button>
          )}
          {onFlag && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFlag(expense.id)}
              className="flex-1 text-xs py-1.5 h-auto border-amber-300 text-amber-800 hover:bg-amber-50"
            >
              Klarifikasi
            </Button>
          )}
          {onVoid && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onVoid(expense.id)}
              className="text-xs py-1.5 h-auto px-2"
            >
              <XCircle className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
