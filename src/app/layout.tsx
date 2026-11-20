import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bumihijau Kost — Aplikasi Manajemen Kost Multi-Cabang",
  description: "Platform SaaS Manajemen Kost Multi-Cabang B2B terpadu untuk Owner, Admin Lapangan, dan Anak Kost",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
