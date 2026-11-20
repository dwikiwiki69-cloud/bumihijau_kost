// ============================================================
// Bumihijau Kost — Centralized Mock Data
// ============================================================

// ─── TypeScript Interfaces ───────────────────────────────────

export type RoomStatus = 'VACANT' | 'OCCUPIED' | 'DUE_SOON' | 'OVERDUE' | 'MAINTENANCE';
export type InvoiceStatus = 'UNPAID' | 'PAID' | 'DUE_SOON' | 'OVERDUE' | 'VOID';
export type ExpenseCategory =
  | 'LISTRIK'
  | 'AIR'
  | 'CUCI_AC'
  | 'MAINTENANCE'
  | 'KEBERSIHAN'
  | 'OPERASIONAL_LAINNYA';
export type ExpenseStatus = 'PENDING_REVIEW' | 'APPROVED' | 'FLAGGED' | 'VOID';

export interface Property {
  id: string;
  name: string;
  address: string;
  totalRooms: number;
  floors: number;
}

export interface Tenant {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  idNumber: string; // KTP
  checkInDate: string; // ISO date
  checkOutDate?: string;
  roomId: string;
  propertyId: string;
  emergencyContact?: string;
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  propertyId: string;
  status: RoomStatus;
  basePrice: number; // IDR
  size?: string; // e.g. "3x4 m"
  facilities?: string[];
  tenantId?: string;
  notes?: string;
}

export interface AdditionalFee {
  label: string;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  roomId: string;
  tenantId: string;
  propertyId: string;
  periodMonth: number; // 1-12
  periodYear: number;
  baseRent: number;
  additionalFees: AdditionalFee[];
  lateFee: number;
  totalAmount: number;
  dueDate: string; // ISO date
  paidDate?: string;
  status: InvoiceStatus;
  createdAt: string;
}

export interface Expense {
  id: string;
  propertyId: string;
  roomId?: string;
  category: ExpenseCategory;
  amount: number;
  description: string;
  date: string;
  status: ExpenseStatus;
  adminId: string;
  photoUrl?: string;
  notes?: string;
}

export interface MaintenanceTicket {
  id: string;
  roomId: string;
  propertyId: string;
  tenantId?: string;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
  resolvedAt?: string;
  photoUrl?: string;
}

// ─── Mock Properties ─────────────────────────────────────────

export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    name: 'Kost Merdeka',
    address: 'Jl. Merdeka No. 17, Bandung',
    totalRooms: 12,
    floors: 2,
  },
  {
    id: 'prop-2',
    name: 'Kost Pahlawan',
    address: 'Jl. Pahlawan No. 45, Bandung',
    totalRooms: 8,
    floors: 2,
  },
];

// ─── Mock Tenants ─────────────────────────────────────────────

export const mockTenants: Tenant[] = [
  {
    id: 'ten-1',
    name: 'Budi Santoso',
    whatsapp: '081234567890',
    email: 'budi.santoso@email.com',
    idNumber: '3273011234567890',
    checkInDate: '2024-01-15',
    roomId: 'room-1',
    propertyId: 'prop-1',
    emergencyContact: '081111111111',
  },
  {
    id: 'ten-2',
    name: 'Siti Rahayu',
    whatsapp: '082345678901',
    email: 'siti.rahayu@email.com',
    idNumber: '3273019876543210',
    checkInDate: '2024-02-01',
    roomId: 'room-2',
    propertyId: 'prop-1',
  },
  {
    id: 'ten-3',
    name: 'Ahmad Fauzi',
    whatsapp: '083456789012',
    email: 'ahmad.fauzi@email.com',
    idNumber: '3273015555555555',
    checkInDate: '2023-11-10',
    roomId: 'room-3',
    propertyId: 'prop-1',
  },
  {
    id: 'ten-4',
    name: 'Dewi Lestari',
    whatsapp: '084567890123',
    email: 'dewi.lestari@email.com',
    idNumber: '3273016666666666',
    checkInDate: '2024-03-20',
    roomId: 'room-4',
    propertyId: 'prop-1',
  },
  {
    id: 'ten-5',
    name: 'Rudi Hermawan',
    whatsapp: '085678901234',
    email: 'rudi.hermawan@email.com',
    idNumber: '3273017777777777',
    checkInDate: '2024-01-05',
    roomId: 'room-5',
    propertyId: 'prop-1',
  },
  {
    id: 'ten-6',
    name: 'Nia Kurniawati',
    whatsapp: '086789012345',
    email: 'nia.kurniawati@email.com',
    idNumber: '3273018888888888',
    checkInDate: '2024-04-01',
    roomId: 'room-6',
    propertyId: 'prop-1',
  },
  {
    id: 'ten-7',
    name: 'Doni Prasetyo',
    whatsapp: '087890123456',
    email: 'doni.prasetyo@email.com',
    idNumber: '3273019999999999',
    checkInDate: '2023-10-15',
    roomId: 'room-7',
    propertyId: 'prop-1',
  },
  {
    id: 'ten-8',
    name: 'Fitri Handayani',
    whatsapp: '088901234567',
    email: 'fitri.handayani@email.com',
    idNumber: '3273020000000001',
    checkInDate: '2024-02-14',
    roomId: 'room-8',
    propertyId: 'prop-1',
  },
  {
    id: 'ten-9',
    name: 'Hendra Wijaya',
    whatsapp: '089012345678',
    email: 'hendra.wijaya@email.com',
    idNumber: '3273020000000002',
    checkInDate: '2024-05-01',
    roomId: 'room-13',
    propertyId: 'prop-2',
  },
  {
    id: 'ten-10',
    name: 'Laila Sari',
    whatsapp: '081112233445',
    email: 'laila.sari@email.com',
    idNumber: '3273020000000003',
    checkInDate: '2024-03-10',
    roomId: 'room-14',
    propertyId: 'prop-2',
  },
  {
    id: 'ten-11',
    name: 'Muhamad Rizki',
    whatsapp: '082223344556',
    email: 'rizki@email.com',
    idNumber: '3273020000000004',
    checkInDate: '2023-12-01',
    roomId: 'room-15',
    propertyId: 'prop-2',
  },
  {
    id: 'ten-12',
    name: 'Putri Anggraini',
    whatsapp: '083334455667',
    email: 'putri@email.com',
    idNumber: '3273020000000005',
    checkInDate: '2024-01-20',
    roomId: 'room-16',
    propertyId: 'prop-2',
  },
  {
    id: 'ten-13',
    name: 'Surya Darmawan',
    whatsapp: '084445566778',
    email: 'surya@email.com',
    idNumber: '3273020000000006',
    checkInDate: '2024-06-01',
    roomId: 'room-17',
    propertyId: 'prop-2',
  },
  {
    id: 'ten-14',
    name: 'Tina Marlina',
    whatsapp: '085556677889',
    email: 'tina@email.com',
    idNumber: '3273020000000007',
    checkInDate: '2024-02-28',
    roomId: 'room-18',
    propertyId: 'prop-2',
  },
  {
    id: 'ten-15',
    name: 'Wahyu Nugroho',
    whatsapp: '086667788990',
    email: 'wahyu@email.com',
    idNumber: '3273020000000008',
    checkInDate: '2024-04-15',
    roomId: 'room-9',
    propertyId: 'prop-1',
  },
];

// ─── Mock Rooms ───────────────────────────────────────────────

export const mockRooms: Room[] = [
  // Kost Merdeka — Floor 1 (rooms 101–106)
  {
    id: 'room-1',
    number: '101',
    floor: 1,
    propertyId: 'prop-1',
    status: 'OCCUPIED',
    basePrice: 1200000,
    size: '3x4 m',
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi'],
    tenantId: 'ten-1',
  },
  {
    id: 'room-2',
    number: '102',
    floor: 1,
    propertyId: 'prop-1',
    status: 'OVERDUE',
    basePrice: 1200000,
    size: '3x4 m',
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi'],
    tenantId: 'ten-2',
  },
  {
    id: 'room-3',
    number: '103',
    floor: 1,
    propertyId: 'prop-1',
    status: 'OCCUPIED',
    basePrice: 1000000,
    size: '3x3 m',
    facilities: ['Kipas Angin', 'Kamar Mandi Luar', 'WiFi'],
    tenantId: 'ten-3',
  },
  {
    id: 'room-4',
    number: '104',
    floor: 1,
    propertyId: 'prop-1',
    status: 'DUE_SOON',
    basePrice: 1000000,
    size: '3x3 m',
    facilities: ['Kipas Angin', 'Kamar Mandi Luar', 'WiFi'],
    tenantId: 'ten-4',
  },
  {
    id: 'room-5',
    number: '105',
    floor: 1,
    propertyId: 'prop-1',
    status: 'OCCUPIED',
    basePrice: 1200000,
    size: '3x4 m',
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi'],
    tenantId: 'ten-5',
  },
  {
    id: 'room-6',
    number: '106',
    floor: 1,
    propertyId: 'prop-1',
    status: 'VACANT',
    basePrice: 1200000,
    size: '3x4 m',
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi'],
  },
  // Kost Merdeka — Floor 2 (rooms 201–206)
  {
    id: 'room-7',
    number: '201',
    floor: 2,
    propertyId: 'prop-1',
    status: 'OCCUPIED',
    basePrice: 1500000,
    size: '4x5 m',
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi', 'Balkon'],
    tenantId: 'ten-7',
  },
  {
    id: 'room-8',
    number: '202',
    floor: 2,
    propertyId: 'prop-1',
    status: 'OCCUPIED',
    basePrice: 1500000,
    size: '4x5 m',
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi', 'Balkon'],
    tenantId: 'ten-8',
  },
  {
    id: 'room-9',
    number: '203',
    floor: 2,
    propertyId: 'prop-1',
    status: 'DUE_SOON',
    basePrice: 1300000,
    size: '3x4 m',
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi'],
    tenantId: 'ten-15',
  },
  {
    id: 'room-10',
    number: '204',
    floor: 2,
    propertyId: 'prop-1',
    status: 'VACANT',
    basePrice: 1300000,
    size: '3x4 m',
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi'],
  },
  {
    id: 'room-11',
    number: '205',
    floor: 2,
    propertyId: 'prop-1',
    status: 'MAINTENANCE',
    basePrice: 1500000,
    size: '4x5 m',
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi', 'Balkon'],
    notes: 'Perbaikan AC sedang berlangsung',
  },
  {
    id: 'room-12',
    number: '206',
    floor: 2,
    propertyId: 'prop-1',
    status: 'OCCUPIED',
    basePrice: 1300000,
    size: '3x4 m',
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi'],
    tenantId: 'ten-6',
  },
  // Kost Pahlawan — Floor 1 (rooms 101–104)
  {
    id: 'room-13',
    number: '101',
    floor: 1,
    propertyId: 'prop-2',
    status: 'OCCUPIED',
    basePrice: 900000,
    size: '3x3 m',
    facilities: ['Kipas Angin', 'Kamar Mandi Luar', 'WiFi'],
    tenantId: 'ten-9',
  },
  {
    id: 'room-14',
    number: '102',
    floor: 1,
    propertyId: 'prop-2',
    status: 'OVERDUE',
    basePrice: 900000,
    size: '3x3 m',
    facilities: ['Kipas Angin', 'Kamar Mandi Luar', 'WiFi'],
    tenantId: 'ten-10',
  },
  {
    id: 'room-15',
    number: '103',
    floor: 1,
    propertyId: 'prop-2',
    status: 'OCCUPIED',
    basePrice: 1100000,
    size: '3x4 m',
    facilities: ['AC', 'Kamar Mandi Luar', 'WiFi'],
    tenantId: 'ten-11',
  },
  {
    id: 'room-16',
    number: '104',
    floor: 1,
    propertyId: 'prop-2',
    status: 'OCCUPIED',
    basePrice: 1100000,
    size: '3x4 m',
    facilities: ['AC', 'Kamar Mandi Luar', 'WiFi'],
    tenantId: 'ten-12',
  },
  // Kost Pahlawan — Floor 2 (rooms 201–204)
  {
    id: 'room-17',
    number: '201',
    floor: 2,
    propertyId: 'prop-2',
    status: 'OCCUPIED',
    basePrice: 1200000,
    size: '3x4 m',
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi'],
    tenantId: 'ten-13',
  },
  {
    id: 'room-18',
    number: '202',
    floor: 2,
    propertyId: 'prop-2',
    status: 'OCCUPIED',
    basePrice: 1200000,
    size: '3x4 m',
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi'],
    tenantId: 'ten-14',
  },
  {
    id: 'room-19',
    number: '203',
    floor: 2,
    propertyId: 'prop-2',
    status: 'VACANT',
    basePrice: 1200000,
    size: '3x4 m',
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi'],
  },
  {
    id: 'room-20',
    number: '204',
    floor: 2,
    propertyId: 'prop-2',
    status: 'VACANT',
    basePrice: 1200000,
    size: '3x4 m',
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi'],
  },
];

// ─── Mock Invoices ────────────────────────────────────────────

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV/2026/11/001',
    roomId: 'room-1',
    tenantId: 'ten-1',
    propertyId: 'prop-1',
    periodMonth: 11,
    periodYear: 2026,
    baseRent: 1200000,
    additionalFees: [{ label: 'Listrik', amount: 150000 }],
    lateFee: 0,
    totalAmount: 1350000,
    dueDate: '2026-11-25',
    status: 'UNPAID',
    createdAt: '2026-11-01',
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV/2026/11/002',
    roomId: 'room-2',
    tenantId: 'ten-2',
    propertyId: 'prop-1',
    periodMonth: 11,
    periodYear: 2026,
    baseRent: 1200000,
    additionalFees: [{ label: 'Listrik', amount: 120000 }],
    lateFee: 50000,
    totalAmount: 1370000,
    dueDate: '2026-11-10',
    status: 'OVERDUE',
    createdAt: '2026-11-01',
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV/2026/11/003',
    roomId: 'room-3',
    tenantId: 'ten-3',
    propertyId: 'prop-1',
    periodMonth: 11,
    periodYear: 2026,
    baseRent: 1000000,
    additionalFees: [{ label: 'Listrik', amount: 100000 }],
    lateFee: 0,
    totalAmount: 1100000,
    dueDate: '2026-11-30',
    paidDate: '2026-11-05',
    status: 'PAID',
    createdAt: '2026-11-01',
  },
  {
    id: 'inv-4',
    invoiceNumber: 'INV/2026/11/004',
    roomId: 'room-4',
    tenantId: 'ten-4',
    propertyId: 'prop-1',
    periodMonth: 11,
    periodYear: 2026,
    baseRent: 1000000,
    additionalFees: [{ label: 'Listrik', amount: 90000 }],
    lateFee: 0,
    totalAmount: 1090000,
    dueDate: '2026-11-23',
    status: 'DUE_SOON',
    createdAt: '2026-11-01',
  },
  {
    id: 'inv-5',
    invoiceNumber: 'INV/2026/11/005',
    roomId: 'room-5',
    tenantId: 'ten-5',
    propertyId: 'prop-1',
    periodMonth: 11,
    periodYear: 2026,
    baseRent: 1200000,
    additionalFees: [{ label: 'Listrik', amount: 110000 }],
    lateFee: 0,
    totalAmount: 1310000,
    dueDate: '2026-11-30',
    paidDate: '2026-11-02',
    status: 'PAID',
    createdAt: '2026-11-01',
  },
  {
    id: 'inv-6',
    invoiceNumber: 'INV/2026/10/001',
    roomId: 'room-1',
    tenantId: 'ten-1',
    propertyId: 'prop-1',
    periodMonth: 10,
    periodYear: 2026,
    baseRent: 1200000,
    additionalFees: [{ label: 'Listrik', amount: 145000 }],
    lateFee: 0,
    totalAmount: 1345000,
    dueDate: '2026-10-25',
    paidDate: '2026-10-20',
    status: 'PAID',
    createdAt: '2026-10-01',
  },
  {
    id: 'inv-7',
    invoiceNumber: 'INV/2026/11/006',
    roomId: 'room-7',
    tenantId: 'ten-7',
    propertyId: 'prop-1',
    periodMonth: 11,
    periodYear: 2026,
    baseRent: 1500000,
    additionalFees: [
      { label: 'Listrik', amount: 180000 },
      { label: 'Air', amount: 50000 },
    ],
    lateFee: 0,
    totalAmount: 1730000,
    dueDate: '2026-11-30',
    paidDate: '2026-11-08',
    status: 'PAID',
    createdAt: '2026-11-01',
  },
  {
    id: 'inv-8',
    invoiceNumber: 'INV/2026/11/007',
    roomId: 'room-8',
    tenantId: 'ten-8',
    propertyId: 'prop-1',
    periodMonth: 11,
    periodYear: 2026,
    baseRent: 1500000,
    additionalFees: [{ label: 'Listrik', amount: 170000 }],
    lateFee: 0,
    totalAmount: 1670000,
    dueDate: '2026-11-30',
    status: 'UNPAID',
    createdAt: '2026-11-01',
  },
  {
    id: 'inv-9',
    invoiceNumber: 'INV/2026/11/008',
    roomId: 'room-9',
    tenantId: 'ten-15',
    propertyId: 'prop-1',
    periodMonth: 11,
    periodYear: 2026,
    baseRent: 1300000,
    additionalFees: [{ label: 'Listrik', amount: 130000 }],
    lateFee: 0,
    totalAmount: 1430000,
    dueDate: '2026-11-23',
    status: 'DUE_SOON',
    createdAt: '2026-11-01',
  },
  {
    id: 'inv-10',
    invoiceNumber: 'INV/2026/11/009',
    roomId: 'room-13',
    tenantId: 'ten-9',
    propertyId: 'prop-2',
    periodMonth: 11,
    periodYear: 2026,
    baseRent: 900000,
    additionalFees: [{ label: 'Listrik', amount: 80000 }],
    lateFee: 0,
    totalAmount: 980000,
    dueDate: '2026-11-30',
    paidDate: '2026-11-10',
    status: 'PAID',
    createdAt: '2026-11-01',
  },
  {
    id: 'inv-11',
    invoiceNumber: 'INV/2026/11/010',
    roomId: 'room-14',
    tenantId: 'ten-10',
    propertyId: 'prop-2',
    periodMonth: 11,
    periodYear: 2026,
    baseRent: 900000,
    additionalFees: [{ label: 'Listrik', amount: 75000 }],
    lateFee: 75000,
    totalAmount: 1050000,
    dueDate: '2026-11-05',
    status: 'OVERDUE',
    createdAt: '2026-11-01',
  },
  {
    id: 'inv-12',
    invoiceNumber: 'INV/2026/09/001',
    roomId: 'room-2',
    tenantId: 'ten-2',
    propertyId: 'prop-1',
    periodMonth: 9,
    periodYear: 2026,
    baseRent: 1200000,
    additionalFees: [{ label: 'Listrik', amount: 115000 }],
    lateFee: 50000,
    totalAmount: 1365000,
    dueDate: '2026-09-10',
    status: 'OVERDUE',
    createdAt: '2026-09-01',
  },
  // Additional invoices for pagination demo
  {
    id: 'inv-13',
    invoiceNumber: 'INV/2026/08/001',
    roomId: 'room-1',
    tenantId: 'ten-1',
    propertyId: 'prop-1',
    periodMonth: 8,
    periodYear: 2026,
    baseRent: 1200000,
    additionalFees: [{ label: 'Listrik', amount: 155000 }],
    lateFee: 0,
    totalAmount: 1355000,
    dueDate: '2026-08-25',
    paidDate: '2026-08-22',
    status: 'PAID',
    createdAt: '2026-08-01',
  },
  {
    id: 'inv-14',
    invoiceNumber: 'INV/2026/07/001',
    roomId: 'room-1',
    tenantId: 'ten-1',
    propertyId: 'prop-1',
    periodMonth: 7,
    periodYear: 2026,
    baseRent: 1200000,
    additionalFees: [{ label: 'Listrik', amount: 165000 }],
    lateFee: 0,
    totalAmount: 1365000,
    dueDate: '2026-07-25',
    paidDate: '2026-07-18',
    status: 'PAID',
    createdAt: '2026-07-01',
  },
  {
    id: 'inv-15',
    invoiceNumber: 'INV/2026/11/011',
    roomId: 'room-15',
    tenantId: 'ten-11',
    propertyId: 'prop-2',
    periodMonth: 11,
    periodYear: 2026,
    baseRent: 1100000,
    additionalFees: [{ label: 'Listrik', amount: 100000 }],
    lateFee: 0,
    totalAmount: 1200000,
    dueDate: '2026-11-30',
    paidDate: '2026-11-12',
    status: 'PAID',
    createdAt: '2026-11-01',
  },
  {
    id: 'inv-16',
    invoiceNumber: 'INV/2026/11/012',
    roomId: 'room-16',
    tenantId: 'ten-12',
    propertyId: 'prop-2',
    periodMonth: 11,
    periodYear: 2026,
    baseRent: 1100000,
    additionalFees: [{ label: 'Listrik', amount: 95000 }],
    lateFee: 0,
    totalAmount: 1195000,
    dueDate: '2026-11-30',
    status: 'UNPAID',
    createdAt: '2026-11-01',
  },
  {
    id: 'inv-17',
    invoiceNumber: 'INV/2026/11/013',
    roomId: 'room-17',
    tenantId: 'ten-13',
    propertyId: 'prop-2',
    periodMonth: 11,
    periodYear: 2026,
    baseRent: 1200000,
    additionalFees: [{ label: 'Listrik', amount: 120000 }],
    lateFee: 0,
    totalAmount: 1320000,
    dueDate: '2026-11-30',
    paidDate: '2026-11-15',
    status: 'PAID',
    createdAt: '2026-11-01',
  },
  {
    id: 'inv-18',
    invoiceNumber: 'INV/2026/11/014',
    roomId: 'room-18',
    tenantId: 'ten-14',
    propertyId: 'prop-2',
    periodMonth: 11,
    periodYear: 2026,
    baseRent: 1200000,
    additionalFees: [{ label: 'Listrik', amount: 115000 }],
    lateFee: 0,
    totalAmount: 1315000,
    dueDate: '2026-11-30',
    status: 'UNPAID',
    createdAt: '2026-11-01',
  },
  {
    id: 'inv-19',
    invoiceNumber: 'INV/2026/11/015',
    roomId: 'room-12',
    tenantId: 'ten-6',
    propertyId: 'prop-1',
    periodMonth: 11,
    periodYear: 2026,
    baseRent: 1300000,
    additionalFees: [{ label: 'Listrik', amount: 125000 }],
    lateFee: 0,
    totalAmount: 1425000,
    dueDate: '2026-11-30',
    paidDate: '2026-11-07',
    status: 'PAID',
    createdAt: '2026-11-01',
  },
  {
    id: 'inv-20',
    invoiceNumber: 'INV/2026/06/001',
    roomId: 'room-1',
    tenantId: 'ten-1',
    propertyId: 'prop-1',
    periodMonth: 6,
    periodYear: 2026,
    baseRent: 1200000,
    additionalFees: [{ label: 'Listrik', amount: 158000 }],
    lateFee: 0,
    totalAmount: 1358000,
    dueDate: '2026-06-25',
    paidDate: '2026-06-20',
    status: 'PAID',
    createdAt: '2026-06-01',
  },
  {
    id: 'inv-21',
    invoiceNumber: 'INV/2026/05/001',
    roomId: 'room-1',
    tenantId: 'ten-1',
    propertyId: 'prop-1',
    periodMonth: 5,
    periodYear: 2026,
    baseRent: 1200000,
    additionalFees: [{ label: 'Listrik', amount: 162000 }],
    lateFee: 0,
    totalAmount: 1362000,
    dueDate: '2026-05-25',
    paidDate: '2026-05-21',
    status: 'PAID',
    createdAt: '2026-05-01',
  },
];

// ─── Mock Expenses ────────────────────────────────────────────

export const mockExpenses: Expense[] = [
  {
    id: 'exp-1',
    propertyId: 'prop-1',
    category: 'LISTRIK',
    amount: 850000,
    description: 'Tagihan listrik PLN November 2026',
    date: '2026-11-05',
    status: 'APPROVED',
    adminId: 'admin-1',
  },
  {
    id: 'exp-2',
    propertyId: 'prop-1',
    category: 'AIR',
    amount: 200000,
    description: 'Tagihan PDAM November 2026',
    date: '2026-11-06',
    status: 'APPROVED',
    adminId: 'admin-1',
  },
  {
    id: 'exp-3',
    propertyId: 'prop-1',
    roomId: 'room-11',
    category: 'CUCI_AC',
    amount: 150000,
    description: 'Cuci AC kamar 205',
    date: '2026-11-10',
    status: 'PENDING_REVIEW',
    adminId: 'admin-1',
  },
  {
    id: 'exp-4',
    propertyId: 'prop-1',
    category: 'KEBERSIHAN',
    amount: 300000,
    description: 'Jasa kebersihan bulanan',
    date: '2026-11-01',
    status: 'APPROVED',
    adminId: 'admin-1',
  },
  {
    id: 'exp-5',
    propertyId: 'prop-2',
    category: 'LISTRIK',
    amount: 650000,
    description: 'Tagihan listrik PLN November 2026',
    date: '2026-11-05',
    status: 'APPROVED',
    adminId: 'admin-2',
  },
  {
    id: 'exp-6',
    propertyId: 'prop-2',
    category: 'MAINTENANCE',
    amount: 500000,
    description: 'Perbaikan atap bocor area tangga',
    date: '2026-11-08',
    status: 'APPROVED',
    adminId: 'admin-2',
  },
  {
    id: 'exp-7',
    propertyId: 'prop-1',
    category: 'OPERASIONAL_LAINNYA',
    amount: 75000,
    description: 'Pembelian alat kebersihan',
    date: '2026-11-12',
    status: 'PENDING_REVIEW',
    adminId: 'admin-1',
  },
  {
    id: 'exp-8',
    propertyId: 'prop-1',
    roomId: 'room-3',
    category: 'MAINTENANCE',
    amount: 200000,
    description: 'Perbaikan pintu kamar 103',
    date: '2026-11-15',
    status: 'FLAGGED',
    adminId: 'admin-1',
    notes: 'Harga terlalu tinggi, perlu klarifikasi',
  },
  {
    id: 'exp-9',
    propertyId: 'prop-2',
    category: 'AIR',
    amount: 150000,
    description: 'Tagihan PDAM November 2026',
    date: '2026-11-06',
    status: 'APPROVED',
    adminId: 'admin-2',
  },
  {
    id: 'exp-10',
    propertyId: 'prop-1',
    category: 'LISTRIK',
    amount: 820000,
    description: 'Tagihan listrik PLN Oktober 2026',
    date: '2026-10-05',
    status: 'APPROVED',
    adminId: 'admin-1',
  },
  {
    id: 'exp-11',
    propertyId: 'prop-1',
    category: 'AIR',
    amount: 190000,
    description: 'Tagihan PDAM Oktober 2026',
    date: '2026-10-06',
    status: 'APPROVED',
    adminId: 'admin-1',
  },
  {
    id: 'exp-12',
    propertyId: 'prop-2',
    roomId: 'room-14',
    category: 'CUCI_AC',
    amount: 150000,
    description: 'Cuci AC kamar 102 Pahlawan',
    date: '2026-10-20',
    status: 'APPROVED',
    adminId: 'admin-2',
  },
  {
    id: 'exp-13',
    propertyId: 'prop-1',
    category: 'KEBERSIHAN',
    amount: 300000,
    description: 'Jasa kebersihan bulanan Oktober',
    date: '2026-10-01',
    status: 'APPROVED',
    adminId: 'admin-1',
  },
  {
    id: 'exp-14',
    propertyId: 'prop-2',
    category: 'KEBERSIHAN',
    amount: 250000,
    description: 'Jasa kebersihan bulanan Oktober',
    date: '2026-10-01',
    status: 'APPROVED',
    adminId: 'admin-2',
  },
  {
    id: 'exp-15',
    propertyId: 'prop-1',
    roomId: 'room-7',
    category: 'MAINTENANCE',
    amount: 350000,
    description: 'Ganti kran air kamar mandi 201',
    date: '2026-10-15',
    status: 'APPROVED',
    adminId: 'admin-1',
  },
  {
    id: 'exp-16',
    propertyId: 'prop-2',
    category: 'LISTRIK',
    amount: 620000,
    description: 'Tagihan listrik PLN Oktober 2026',
    date: '2026-10-05',
    status: 'APPROVED',
    adminId: 'admin-2',
  },
  {
    id: 'exp-17',
    propertyId: 'prop-1',
    category: 'OPERASIONAL_LAINNYA',
    amount: 120000,
    description: 'Internet bulanan',
    date: '2026-11-01',
    status: 'APPROVED',
    adminId: 'admin-1',
  },
  {
    id: 'exp-18',
    propertyId: 'prop-2',
    category: 'OPERASIONAL_LAINNYA',
    amount: 120000,
    description: 'Internet bulanan',
    date: '2026-11-01',
    status: 'APPROVED',
    adminId: 'admin-2',
  },
  {
    id: 'exp-19',
    propertyId: 'prop-1',
    roomId: 'room-11',
    category: 'MAINTENANCE',
    amount: 400000,
    description: 'Perbaikan AC kamar 205 (freon)',
    date: '2026-11-18',
    status: 'PENDING_REVIEW',
    adminId: 'admin-1',
  },
  {
    id: 'exp-20',
    propertyId: 'prop-2',
    category: 'MAINTENANCE',
    amount: 275000,
    description: 'Cat ulang koridor lantai 1',
    date: '2026-10-25',
    status: 'APPROVED',
    adminId: 'admin-2',
  },
];

// ─── Mock Maintenance Tickets ─────────────────────────────────

export const mockMaintenanceTickets: MaintenanceTicket[] = [
  {
    id: 'mnt-1',
    roomId: 'room-11',
    propertyId: 'prop-1',
    tenantId: undefined,
    title: 'AC tidak dingin',
    description: 'AC di kamar 205 sudah tidak dingin sejak 3 hari yang lalu',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    createdAt: '2026-11-15T10:00:00Z',
  },
  {
    id: 'mnt-2',
    roomId: 'room-3',
    propertyId: 'prop-1',
    tenantId: 'ten-3',
    title: 'Pintu kamar susah ditutup',
    description: 'Pintu kamar tidak bisa menutup dengan sempurna, engsel longgar',
    status: 'RESOLVED',
    priority: 'MEDIUM',
    createdAt: '2026-11-14T08:30:00Z',
    resolvedAt: '2026-11-16T14:00:00Z',
  },
  {
    id: 'mnt-3',
    roomId: 'room-7',
    propertyId: 'prop-1',
    tenantId: 'ten-7',
    title: 'Kran air bocor',
    description: 'Kran air di kamar mandi menetes terus',
    status: 'RESOLVED',
    priority: 'LOW',
    createdAt: '2026-10-14T09:00:00Z',
    resolvedAt: '2026-10-16T11:00:00Z',
  },
  {
    id: 'mnt-4',
    roomId: 'room-14',
    propertyId: 'prop-2',
    tenantId: 'ten-10',
    title: 'Lampu mati',
    description: 'Lampu kamar mandi mati',
    status: 'OPEN',
    priority: 'LOW',
    createdAt: '2026-11-19T16:00:00Z',
  },
  {
    id: 'mnt-5',
    roomId: 'room-1',
    propertyId: 'prop-1',
    tenantId: 'ten-1',
    title: 'Wifi lemot',
    description: 'Koneksi WiFi di kamar sangat lambat terutama malam hari',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    createdAt: '2026-11-18T20:00:00Z',
  },
];

// ─── Helper Functions ─────────────────────────────────────────

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getTenantByRoom(roomId: string): Tenant | undefined {
  return mockTenants.find((t) => t.roomId === roomId);
}

export function getRoomsByProperty(propertyId: string): Room[] {
  return mockRooms.filter((r) => r.propertyId === propertyId);
}

export function getInvoicesByRoom(roomId: string): Invoice[] {
  return mockInvoices.filter((i) => i.roomId === roomId);
}

export function getExpensesByRoom(roomId: string): Expense[] {
  return mockExpenses.filter((e) => e.roomId === roomId);
}

export function getMaintenanceByRoom(roomId: string): MaintenanceTicket[] {
  return mockMaintenanceTickets.filter((m) => m.roomId === roomId);
}
