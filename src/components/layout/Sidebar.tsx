'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  BedDouble,
  Users,
  Receipt,
  TrendingDown,
  BarChart2,
  Settings,
  X,
} from 'lucide-react';
import { clsx } from 'clsx';

export type UserRole = 'OWNER' | 'ADMIN_KOST' | 'TENANT';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard',   href: '/dashboard',      icon: LayoutDashboard, roles: ['OWNER', 'ADMIN_KOST'] },
  { label: 'Properti',    href: '/properti',        icon: Building2,       roles: ['OWNER'] },
  { label: 'Kamar',       href: '/kamar',           icon: BedDouble,       roles: ['OWNER', 'ADMIN_KOST'] },
  { label: 'Penyewa',     href: '/penyewa',         icon: Users,           roles: ['OWNER', 'ADMIN_KOST'] },
  { label: 'Tagihan',     href: '/tagihan',         icon: Receipt,         roles: ['OWNER', 'ADMIN_KOST'] },
  { label: 'Pengeluaran', href: '/pengeluaran',     icon: TrendingDown,    roles: ['OWNER', 'ADMIN_KOST'] },
  { label: 'Laporan',     href: '/laporan',         icon: BarChart2,       roles: ['OWNER'] },
  { label: 'Pengaturan',  href: '/pengaturan',      icon: Settings,        roles: ['OWNER', 'ADMIN_KOST'] },
];

interface SidebarProps {
  role?: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ role = 'OWNER', isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const visibleItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-30 flex flex-col w-64 bg-green-900 text-green-100',
          'transition-transform duration-300 ease-in-out',
          'lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-green-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">🏢</span>
            <span className="text-lg font-bold text-white leading-tight">
              Bumihijau<br />
              <span className="text-green-300 text-sm font-normal">Kost</span>
            </span>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden text-green-300 hover:text-white p-1 rounded"
            aria-label="Tutup sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {visibleItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-green-600 text-white'
                        : 'text-green-200 hover:bg-green-800 hover:text-white'
                    )}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User profile pill */}
        <div className="px-3 py-4 border-t border-green-800">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-green-800">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-semibold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Ahmad Owner</p>
              <span
                className={clsx(
                  'text-xs px-1.5 py-0.5 rounded font-medium',
                  role === 'OWNER' ? 'bg-yellow-500 text-yellow-900' : 'bg-blue-500 text-white'
                )}
              >
                {role === 'OWNER' ? 'Owner' : 'Admin Kost'}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
