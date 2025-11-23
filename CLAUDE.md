# CLAUDE.md - AI Assistant Guidelines

## Project Overview

This is a **Business Intelligence System (BIS)** - a comprehensive ERP (Enterprise Resource Planning) web application for inventory management, procurement tracking, and sales operations. The target audience is retail/wholesale businesses in Uzbekistan, with the UI primarily in **Uzbek** language.

**Current Status**: Specification/Blueprint Phase - the `websitedescription.md` file contains the complete specification but no source code has been implemented yet.

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14+ (App Router) |
| **Frontend** | React 19, TypeScript 5+ |
| **Styling** | Tailwind CSS 3+ |
| **UI Components** | Radix UI / Shadcn UI |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Forms** | React Hook Form + Zod |
| **Database** | Prisma ORM + SQLite (dev) / PostgreSQL (prod) |
| **Excel Support** | XLSX library |
| **Theme** | next-themes (dark mode support) |

---

## Project Structure (Planned)

```
purchase-website/
├── app/                           # Next.js App Router
│   ├── api/                       # Backend API routes
│   │   ├── documents/            # Purchase documents CRUD
│   │   ├── item-master/          # Product catalog
│   │   ├── products/             # Product routes
│   │   ├── purchase-history/     # Purchase analytics
│   │   └── returns/              # Return handling
│   ├── yetib-kelgan/             # Incoming documents (purchases)
│   ├── ombor/                    # Warehouse inventory
│   ├── chiqim/                   # Write-offs
│   ├── kassa/                    # Cash register
│   ├── harajatlar/               # Expenses
│   ├── tolovlar/                 # Supplier payments
│   ├── narxlarni-yangilash/      # Price updates
│   ├── qaytarilgan/              # Returned products
│   ├── login/                    # Authentication
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Dashboard
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # Shadcn UI components
│   └── [feature-specific]/       # Feature components
├── hooks/                        # Custom React hooks
├── lib/                          # Utilities
├── types/                        # TypeScript definitions
├── prisma/                       # Database schema
├── public/                       # Static assets
├── websitedescription.md         # Complete specification
└── CLAUDE.md                     # This file
```

---

## Quick Reference

### Development Commands

```bash
npm install              # Install dependencies
npm run dev              # Start dev server (port 3000)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint
npx prisma generate      # Generate Prisma client
npx prisma db push       # Sync database schema
npx prisma studio        # Database GUI
```

### Test Credentials

```
Username: bobs
Password: bobs2025
```

---

## Key Conventions

### File Naming
- **Pages**: `page.tsx` (Next.js App Router convention)
- **Components**: PascalCase (e.g., `ProductTable.tsx`)
- **Utilities**: camelCase (e.g., `formatPrice.ts`)
- **Hooks**: `use-[name].ts` (e.g., `use-pagination.ts`)

### Code Style
- TypeScript for all files
- Functional components with hooks
- Server Components by default (Next.js App Router)
- Client Components only when necessary (`'use client'`)

### Styling
- Tailwind CSS utility classes
- Shadcn UI components from `components/ui/`
- Color scheme: Blue (primary), Slate (backgrounds), Green/Amber/Red (status)

### API Routes
- RESTful conventions
- JSON responses
- Prisma ORM for database operations
- Error handling with appropriate HTTP status codes

---

## Database Models

### Document (Purchase Orders)
```prisma
model Document {
  id          Int       @id @default(autoincrement())
  docNumber   String    @unique
  date        String
  supplier    String
  warehouse   String
  paymentType String    // "naqd" (cash) or "bank"
  totalAmount String
  status      String    // Tasdiqlangan/Qoralama/Bekor qilingan/Kutilmoqda
  itemsCount  Int
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

### Product (Line Items)
```prisma
model Product {
  id            Int      @id @default(autoincrement())
  barcode       String
  name          String
  quantity      Int
  markup        Float
  purchasePrice String
  sellingPrice  String
  totalPurchase String
  totalSelling  String
  productGroup  String
  documentId    Int
  document      Document @relation(fields: [documentId], references: [id])
  createdAt     DateTime @default(now())
}
```

### ItemMaster (Product Catalog)
```prisma
model ItemMaster {
  id           Int      @id @default(autoincrement())
  barcode      String   @unique
  name         String
  productGroup String
  unit         String   // "dona" = piece
  description  String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

---

## API Endpoints

| Endpoint | Methods | Purpose |
|----------|---------|---------|
| `/api/documents` | GET, POST | List/create purchase documents |
| `/api/documents/[id]` | GET, PUT, PATCH, DELETE | Single document operations |
| `/api/item-master` | GET, POST | Product catalog management |
| `/api/products/barcode/[code]` | GET | Barcode lookup |
| `/api/purchase-history/supplier/[name]` | GET | Supplier purchase history |
| `/api/returns` | GET, POST | Return document management |

---

## Page Routes

| Route | Purpose |
|-------|---------|
| `/` | Dashboard with analytics |
| `/login` | Authentication |
| `/yetib-kelgan` | Purchase documents list |
| `/yetib-kelgan/add` | Create new purchase |
| `/yetib-kelgan/[id]` | View document |
| `/yetib-kelgan/edit/[id]` | Edit document |
| `/ombor` | Warehouse inventory |
| `/chiqim` | Write-offs |
| `/kassa` | Cash register |
| `/harajatlar` | Expenses |
| `/tolovlar` | Supplier payments |
| `/narxlarni-yangilash` | Price updates |
| `/qaytarilgan` | Returned products |

---

## Status Values

| Status | Uzbek | Color |
|--------|-------|-------|
| Confirmed | Tasdiqlangan | Green |
| Draft | Qoralama | Amber |
| Cancelled | Bekor qilingan | Red |
| Pending | Kutilmoqda | Blue |

---

## Uzbek Language Reference

| Uzbek | English |
|-------|---------|
| Kirim hujjatlari | Incoming documents |
| Ombor qoldiqlari | Warehouse inventory |
| Ta'minotchi | Supplier |
| Mahsulot | Product |
| Miqdori | Quantity |
| Narxi | Price |
| Summa | Amount |
| Sana | Date |
| Jami | Total |
| Qidirish | Search |
| Saqlash | Save |
| Bekor qilish | Cancel |
| Tasdiqlash | Confirm |
| Yangi | New |
| dona | piece (unit) |
| naqd | cash |

---

## Key Features

1. **Dashboard** - Inventory health score, ABC/XYZ analysis, metrics
2. **Purchase Management** - CRUD for purchase documents with products
3. **Inventory Tracking** - Stock levels with visual indicators
4. **Write-offs** - Track expired/damaged items
5. **Cash Register** - Income/expense tracking
6. **Supplier Payments** - Payment tracking by method
7. **Price Updates** - Inline price editing
8. **Returns** - Partial return handling with reasons
9. **Excel Import/Export** - XLSX library integration
10. **Barcode Scanning** - Product lookup by barcode

---

## Design Patterns

### Layout
- Fixed sidebar (256px) with gradient slate background
- Dark header with user dropdown
- Main content area with cards and tables

### Components
- Cards with subtle shadows and rounded corners
- Tables with hover states and striped rows
- Progress bars for stock levels
- Color-coded status badges
- Gradient buttons for primary actions

### Forms
- React Hook Form for state management
- Zod for validation
- Real-time calculations (markups, totals, VAT)

---

## Important Notes for AI Assistants

1. **Specification First**: Always refer to `websitedescription.md` for detailed requirements
2. **Language**: UI text should be in Uzbek (product names may be in Russian)
3. **No Code Yet**: This is currently a specification-only repository
4. **Shadcn UI**: Use pre-built components where possible
5. **Type Safety**: Enforce TypeScript throughout
6. **Prisma ORM**: Use for all database operations
7. **Server Components**: Prefer by default in Next.js App Router
8. **Error Handling**: Implement proper error boundaries and API error responses

---

## Getting Started (Implementation)

When implementing this specification:

1. **Initialize Next.js project**
   ```bash
   npx create-next-app@latest . --typescript --tailwind --app
   ```

2. **Install dependencies**
   ```bash
   npm install @prisma/client prisma react-hook-form zod @hookform/resolvers recharts xlsx lucide-react next-themes
   npx shadcn-ui@latest init
   ```

3. **Setup database**
   ```bash
   npx prisma init
   # Add models to schema.prisma
   npx prisma generate
   npx prisma db push
   ```

4. **Follow specification** - Reference `websitedescription.md` for:
   - Page layouts and components
   - API endpoint requirements
   - Form fields and validations
   - Status workflows
   - UI/UX patterns

---

## File Reference

- `websitedescription.md` - Complete specification document (756 lines)
- `CLAUDE.md` - This file (AI assistant guidelines)
