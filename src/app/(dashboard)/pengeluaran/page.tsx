'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Filter,
  CheckCircle,
  Flag,
  XCircle,
  Clock,
  Eye,
  AlertCircle,
  Check,
  Building2,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockExpenses, mockProperties, Expense, ExpenseStatus } from '@/lib/mock-data';
import { formatRupiah, formatDate } from '@/lib/utils';
import ExpenseCard from '@/components/expenses/ExpenseCard';

export default function ExpensesListPage() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('ALL');

  // Handle owner verification actions
  const handleApprove = (id: string) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'APPROVED' as ExpenseStatus } : e))
    );
  };

  const handleFlag = (id: string) => {
    const comment = prompt('Masukkan catatan/klarifikasi untuk Admin Kost:');
    if (comment !== null) {
      setExpenses((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, status: 'FLAGGED' as ExpenseStatus, notes: comment } : e
        )
      );
    }
  };

  const handleVoid = (id: string) => {
    if (confirm('Apakah Anda yakin ingin membatalkan (Void) pengeluaran ini?')) {
      setExpenses((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: 'VOID' as ExpenseStatus } : e))
      );
    }
  };

  // Filtered list
  const filtered = expenses.filter((e) => {
    const matchStatus = statusFilter === 'ALL' || e.status === statusFilter;
    const matchCategory = categoryFilter === 'ALL' || e.category === categoryFilter;
    const matchProperty = selectedPropertyId === 'ALL' || e.propertyId === selectedPropertyId;
    return matchStatus && matchCategory && matchProperty;
  });

  const pendingList = expenses.filter((e) => e.status === 'PENDING_REVIEW');
  const approvedTotal = expenses
    .filter((e) => e.status === 'APPROVED')
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Sinkronisasi Pengeluaran Operasional</h2>
          <p className="text-xs text-slate-500 mt-1">
            Verifikasi bukti nota dari Admin Kost untuk sinkronisasi otomatis ke Buku Kas & Net Profit Owner
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/pengeluaran/input">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-1.5" /> + Input Pengeluaran
            </Button>
          </Link>
        </div>
      </div>

      {/* Verification Queue (Highlights pending) */}
      {pendingList.length > 0 && (
        <Card className="border-amber-300 bg-amber-50/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
              <h3 className="text-base font-bold text-amber-950">
                Antrean Verifikasi Owner ({pendingList.length} Menunggu Persetujuan)
              </h3>
            </div>
            <span className="text-xs font-semibold text-amber-800">Review bukti foto nota sebelum menyetujui</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingList.map((exp) => (
              <div
                key={exp.id}
                className="p-4 rounded-xl bg-white border border-amber-200 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {exp.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{exp.description}</h4>
                    <p className="text-xs text-slate-500">{formatDate(exp.date)} • Admin ID: {exp.adminId}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-slate-900">{formatRupiah(exp.amount)}</span>
                  </div>
                </div>

                {exp.photoUrl && (
                  <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
                    <Eye className="w-3.5 h-3.5" /> Bukti Nota Terlampir
                  </div>
                )}

                {/* Inline Action Buttons for Owner */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <Button
                    size="sm"
                    onClick={() => handleApprove(exp.id)}
                    className="flex-1 text-xs py-1.5 h-auto bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Check className="w-3.5 h-3.5 mr-1" /> Setujui
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFlag(exp.id)}
                    className="flex-1 text-xs py-1.5 h-auto border-amber-300 text-amber-800 hover:bg-amber-50"
                  >
                    <Flag className="w-3.5 h-3.5 mr-1" /> Klarifikasi
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleVoid(exp.id)}
                    className="text-xs py-1.5 h-auto px-2"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Filter Tabs & Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'APPROVED', 'PENDING_REVIEW', 'FLAGGED', 'VOID'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'ALL' ? 'Semua Status' : st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedPropertyId}
            onChange={(e) => setSelectedPropertyId(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium"
          >
            <option value="ALL">Semua Cabang Kost</option>
            {mockProperties.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Expense Cards Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onApprove={() => handleApprove(expense.id)}
            onFlag={() => handleFlag(expense.id)}
            onVoid={() => handleVoid(expense.id)}
          />
        ))}
      </div>
    </div>
  );
}
