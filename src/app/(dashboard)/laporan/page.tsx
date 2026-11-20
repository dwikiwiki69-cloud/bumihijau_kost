'use client';

import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Download,
  Printer,
  Calendar,
  Building2,
  FileSpreadsheet,
} from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NetProfitCard from '@/components/analytics/NetProfitCard';
import ExpenseBreakdown from '@/components/analytics/ExpenseBreakdown';
import { formatRupiah } from '@/lib/utils';
import { mockProperties, mockExpenses, mockInvoices } from '@/lib/mock-data';

export default function AnalyticsReportsPage() {
  const [selectedProperty, setSelectedProperty] = useState('ALL');

  const totalRevenue = mockInvoices
    .filter((i) => i.status === 'PAID')
    .reduce((sum, i) => sum + i.totalAmount, 0);

  const totalExpense = mockExpenses
    .filter((e) => e.status === 'APPROVED')
    .reduce((sum, e) => sum + e.amount, 0);

  const netProfit = totalRevenue - totalExpense;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    alert('Laporan keuangan berhasil diekspor ke CSV.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Laporan Keuangan & Net Profit</h2>
          <p className="text-xs text-slate-500 mt-1">
            Analisis laba bersih (Total Invoice Lunas dikurangi Pengeluaran Approved) dan cashflow per cabang
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <FileSpreadsheet className="w-4 h-4 mr-1.5 text-emerald-600" /> Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-1.5 text-slate-600" /> Cetak Laporan
          </Button>
        </div>
      </div>

      {/* Net Profit & Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <NetProfitCard
            revenue={totalRevenue}
            expenses={totalExpense}
            netProfit={netProfit}
            period="November 2026"
          />

          {/* Monthly Cashflow Breakdown Table */}
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Cashflow Bulanan (Q4 2026)</CardTitle>
            </CardHeader>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <tr>
                    <th className="px-4 py-3">Bulan</th>
                    <th className="px-4 py-3 text-right">Pemasukan Sewa</th>
                    <th className="px-4 py-3 text-right">Pengeluaran Operasional</th>
                    <th className="px-4 py-3 text-right">Laba Bersih (Net Profit)</th>
                    <th className="px-4 py-3 text-center">Okupansi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-900">November 2026 (Berjalan)</td>
                    <td className="px-4 py-3 text-right font-medium text-emerald-700">{formatRupiah(totalRevenue)}</td>
                    <td className="px-4 py-3 text-right font-medium text-rose-700">{formatRupiah(totalExpense)}</td>
                    <td className="px-4 py-3 text-right font-black text-slate-900">{formatRupiah(netProfit)}</td>
                    <td className="px-4 py-3 text-center font-bold text-emerald-600">85%</td>
                  </tr>
                  <tr className="hover:bg-slate-50 text-slate-600">
                    <td className="px-4 py-3 font-semibold text-slate-900">Oktober 2026</td>
                    <td className="px-4 py-3 text-right font-medium text-emerald-700">{formatRupiah(38500000)}</td>
                    <td className="px-4 py-3 text-right font-medium text-rose-700">{formatRupiah(4200000)}</td>
                    <td className="px-4 py-3 text-right font-black text-slate-900">{formatRupiah(34300000)}</td>
                    <td className="px-4 py-3 text-center font-bold text-emerald-600">90%</td>
                  </tr>
                  <tr className="hover:bg-slate-50 text-slate-600">
                    <td className="px-4 py-3 font-semibold text-slate-900">September 2026</td>
                    <td className="px-4 py-3 text-right font-medium text-emerald-700">{formatRupiah(36000000)}</td>
                    <td className="px-4 py-3 text-right font-medium text-rose-700">{formatRupiah(3800000)}</td>
                    <td className="px-4 py-3 text-right font-black text-slate-900">{formatRupiah(32200000)}</td>
                    <td className="px-4 py-3 text-center font-bold text-emerald-600">80%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Expense Category Breakdown Chart */}
        <div>
          <ExpenseBreakdown expenses={mockExpenses} />
        </div>
      </div>
    </div>
  );
}
