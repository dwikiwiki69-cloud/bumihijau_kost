export const APP_NAME = "Bumihijau Kost";
export const APP_DESCRIPTION = "Aplikasi Manajemen Kost Multi-Cabang";

export const ROLES = {
  OWNER: "OWNER",
  ADMIN_KOST: "ADMIN_KOST",
  TENANT: "TENANT",
} as const;

export const ROOM_STATUS_CONFIG = {
  VACANT: {
    label: "Kosong",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
    bgCard: "bg-emerald-50 border-emerald-500",
    color: "#10b981",
  },
  OCCUPIED: {
    label: "Terisi (Lunas)",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
    bgCard: "bg-blue-50 border-blue-500",
    color: "#3b82f6",
  },
  DUE_SOON: {
    label: "Jatuh Tempo",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
    bgCard: "bg-amber-50 border-amber-500",
    color: "#f59e0b",
  },
  OVERDUE: {
    label: "Menunggak",
    badgeClass: "bg-rose-100 text-rose-800 border-rose-300",
    bgCard: "bg-rose-50 border-rose-500",
    color: "#f43f5e",
  },
  MAINTENANCE: {
    label: "Perbaikan",
    badgeClass: "bg-slate-100 text-slate-800 border-slate-300",
    bgCard: "bg-slate-50 border-slate-500",
    color: "#64748b",
  },
} as const;

export const INVOICE_STATUS_CONFIG = {
  PAID: {
    label: "Lunas",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  UNPAID: {
    label: "Belum Bayar",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
  },
  DUE_SOON: {
    label: "Segera Jatuh Tempo",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
  },
  OVERDUE: {
    label: "Menunggak",
    badgeClass: "bg-rose-100 text-rose-800 border-rose-300",
  },
  VOID: {
    label: "Dibatalkan",
    badgeClass: "bg-zinc-100 text-zinc-600 border-zinc-300 line-through",
  },
} as const;

export const EXPENSE_CATEGORY_CONFIG = {
  LISTRIK: { label: "Listrik / Token", icon: "Zap", color: "text-amber-500" },
  AIR: { label: "Air PAM / Sumur", icon: "Droplets", color: "text-cyan-500" },
  CUCI_AC: { label: "Cuci AC & Servis", icon: "Wind", color: "text-sky-500" },
  MAINTENANCE: { label: "Perbaikan Fasilitas", icon: "Wrench", color: "text-orange-500" },
  KEBERSIHAN: { label: "Kebersihan & Sampah", icon: "Trash2", color: "text-emerald-500" },
  OPERASIONAL_LAINNYA: { label: "Operasional Lainnya", icon: "MoreHorizontal", color: "text-slate-500" },
} as const;
