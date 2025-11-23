# Business Intelligence System (BIS) - Complete Website Description

## Project Overview

This is a **Business Intelligence System (BIS)** - a comprehensive ERP (Enterprise Resource Planning) web application designed for inventory management, procurement tracking, and sales operations for retail/wholesale businesses. The interface is primarily in **Uzbek** language with some Russian product names.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14+ (App Router) |
| **Frontend** | React 19, TypeScript 5+ |
| **Styling** | Tailwind CSS 3+ |
| **UI Components** | Radix UI / Shadcn UI (40+ components) |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Forms** | React Hook Form + Zod |
| **Database** | Prisma ORM + SQLite (dev) / PostgreSQL (prod) |
| **Excel Support** | XLSX library |

---

## Application Layout

### Global Layout Structure

The application uses a consistent layout across all pages:

```
+------------------+----------------------------------------+
|                  |           HEADER (Top Bar)             |
|    SIDEBAR       |----------------------------------------|
|    (Left)        |                                        |
|                  |           MAIN CONTENT                 |
|    Navigation    |           (Page Content)               |
|    Menu          |                                        |
|                  |                                        |
+------------------+----------------------------------------+
```

### Header (Top Navigation Bar)
- **Background**: Dark slate (`bg-slate-900`)
- **Color**: White text
- **Elements**:
  - Mobile menu toggle button (hamburger icon, visible on mobile only)
  - "Yangi tovar qoshish" button (Add new product)
  - "Yangi taminotchi qoshish" button (Add new supplier)
  - User profile dropdown menu (avatar icon)
    - User info display
    - Profile link
    - Settings link
    - Logout button (opens confirmation modal)

### Sidebar Navigation
- **Background**: Gradient from slate-900 via slate-800 to slate-900
- **Width**: 256px (w-64)
- **Logo**: Blue gradient box with "BIS" text + "Business Intelligence System v1.0"
- **Menu Settings**: Dropdown to show/hide menu items (Eye/EyeOff icons)
- **Menu Items** (with icons):
  1. Dashboard (BarChart2 icon)
  2. Kirim hujjatlari (ShoppingCart icon)
  3. Qaytarilgan mahsulotlar (RotateCcw icon)
  4. Tovarlarni hisobdan chiqarish (TrendingDown icon)
  5. Kassa (expandable submenu):
     - Kassa
     - Harajatlar
     - Yetkazib beruvchilarga to'lovlar
  6. Ombor qoldiqlari (Package icon)
  7. Yetkazib beruvchilar (expandable submenu):
     - Ro'yxat
     - Qarzdorlik
  8. Narxlarni yangilash (DollarSign icon)

- **Active State**: Blue gradient background with shadow
- **Hover State**: Slate-800/50 background
- **Mobile**: Slides in from left with overlay backdrop

---

## Page Descriptions

### 1. Dashboard (`/`)

**Purpose**: Main analytics dashboard showing inventory health and performance metrics.

**Visual Layout**:
```
+------------------------------------------------------------------+
|  HEADER: "Inventar boshqaruvi" + Time Range Selector + Buttons   |
+------------------------------------------------------------------+
|                                                                  |
|  +------------------------------------------------------------+  |
|  |  INVENTORY HEALTH SCORE CARD                               |  |
|  |  Score: XX/100 with progress bar (Yomon -> A'lo)          |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  +------------------------------------------------------------+  |
|  |  ABC-XYZ ANALYSIS SECTION (Full width)                     |  |
|  |  3x3 Matrix Grid with product classifications              |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  +------------+  +------------+  +------------+  +------------+  |
|  | Jami SKU   |  | Umumiy     |  | Inventar   |  | Tugangan   |  |
|  | Card       |  | qiymat     |  | aylanmasi  |  | mahsulotlar|  |
|  +------------+  +------------+  +------------+  +------------+  |
|                                                                  |
|  TAB NAVIGATION: [Umumiy ko'rinish] [ABC/XYZ Tahlili] [Inventar]|
|                                                                  |
|  TAB CONTENT (varies by selected tab)                           |
+------------------------------------------------------------------+
```

**Key Components**:
- **Inventory Health Score**: 0-100 score with color-coded progress bar
  - 80-100: Green (A'lo)
  - 60-79: Blue (Yaxshi)
  - 40-59: Yellow (O'rtacha)
  - 0-39: Red (Yomon)

- **4 Metric Cards**:
  1. Jami SKU (Total SKUs) - Blue icon
  2. Umumiy qiymat (Total Value) - Green icon
  3. Inventar aylanmasi (Inventory Turnover) - Purple icon
  4. Tugagan mahsulotlar (Stockouts) - Red icon

- **ABC-XYZ Analysis Section**: 3x3 grid showing product classification by value and demand stability

- **Tab: Overview (Umumiy ko'rinish)**:
  - Inventory Value Trend (Area Chart)
  - Inventory Health (Pie Chart - Normal/Low Stock/Out/Excess)
  - Category Value Distribution (Horizontal Bar Chart)
  - Inventory Aging (Bar Chart - by days)
  - Inventory Issues Cards (3 colored boxes):
    - Red: Tugagan mahsulotlar (Out of stock)
    - Yellow: Kam qolgan mahsulotlar (Low stock)
    - Blue: Ortiqcha mahsulotlar (Excess stock)

- **Tab: ABC/XYZ Analysis**:
  - ABC Analysis Pie Chart (A: 70%, B: 20%, C: 10%)
  - ABC-XYZ 3x3 Grid Matrix
  - Forecast Accuracy Line Chart (with MAPE calculation)
  - ABC Analysis Table

- **Tab: Inventory Analysis**:
  - Inventory Turnover Line Chart
  - Days of Supply Gauge
  - Inventory Metrics Progress Bars

---

### 2. Kirim hujjatlari - Incoming Documents (`/yetib-kelgan`)

**Purpose**: Manage purchase documents from suppliers.

**Visual Layout**:
```
+------------------------------------------------------------------+
|  HEADER: "Kirim hujjatlari" + Document count + [Yangi hujjat]    |
+------------------------------------------------------------------+
|  SEARCH BAR + [Filtrlar] Button                                  |
+------------------------------------------------------------------+
|  FILTERS (expandable):                                           |
|  [Status ▼] [Ta'minotchi ▼] [Sanadan] [Sanagacha]              |
+------------------------------------------------------------------+
|                                                                  |
|  TABLE:                                                          |
|  +--------------------------------------------------------------+|
|  | Hujjat | Sana | Ta'minotchi | Ombor | To'lov | Summa | ... | ||
|  |--------|------|-------------|-------|--------|-------|-----|--||
|  | DOC-01 | 2025 | Coca-Cola   | Asosiy| Naqd   | 15M   | ... | ||
|  | DOC-02 | 2025 | Elma        | ...   | Bank   | 1.2M  | ... | ||
|  +--------------------------------------------------------------+|
|                                                                  |
|  PAGINATION                                                      |
+------------------------------------------------------------------+
```

**Table Columns**:
1. Hujjat raqami (Document number)
2. Sana (Date)
3. Ta'minotchi (Supplier)
4. Ombor (Warehouse)
5. To'lov (Payment type)
6. Summa (Amount) - right-aligned with "UZS"
7. Soni (Items count) - badge style
8. Status - clickable badge to change status
9. Amallar (Actions):
   - View (Eye icon)
   - Edit (Edit icon) - only for non-confirmed
   - Return (RotateCcw icon) - red button

**Status Colors**:
- Tasdiqlangan (Confirmed): Green
- Qoralama (Draft): Amber/Yellow
- Bekor qilingan (Cancelled): Red
- Kutilmoqda (Pending): Blue

**Dialogs**:
1. **Status Change Dialog**: Change document status
2. **Partial Return Dialog**: Select products to return with quantities and reason

---

### 3. Add Document (`/yetib-kelgan/add`)

**Purpose**: Create new purchase document.

**Visual Layout**:
```
+------------------------------------------------------------------+
|  HEADER: [← Back] "Yangi kirim hujjati"                          |
+------------------------------------------------------------------+
|                                                                  |
|  FORM FIELDS (2 columns):                                        |
|  +---------------------------+  +---------------------------+    |
|  | Ta'minotchi [dropdown ▼]  |  | Ombor [dropdown ▼]        |    |
|  +---------------------------+  +---------------------------+    |
|  | Sana [date picker]        |  | To'lov turi [dropdown]    |    |
|  +---------------------------+  +---------------------------+    |
|  | Qabul qiluvchi            |  | Hujjat raqami             |    |
|  +---------------------------+  +---------------------------+    |
|                                                                  |
|  PRODUCT TABLE:                                                  |
|  +--------------------------------------------------------------+|
|  | Shtrix-kod | Nomi | Qoldiq | Miqdor | Birlik | Narx | ... |  ||
|  |------------|------|--------|--------|--------|------|-----|  ||
|  | [input]    | [in] | 0      | [input]| dona   | [in] | ... |  ||
|  +--------------------------------------------------------------+|
|  [+ Qator qo'shish]                                             |
|                                                                  |
|  TOTALS SECTION:                                                 |
|  Jami: XX mahsulot | Xarid: XXX so'm | Sotish: XXX so'm         |
|                                                                  |
|  [Qoralama] [Tasdiqlash]                                        |
+------------------------------------------------------------------+
```

**Features**:
- Barcode scanning/search
- Auto-calculation of selling price from markup
- VAT calculation
- Expiry date field
- Add new vendor dialog
- Add new product dialog

---

### 4. Ombor qoldiqlari - Warehouse Inventory (`/ombor`)

**Purpose**: View current inventory stock levels.

**Visual Layout**:
```
+------------------------------------------------------------------+
|  HEADER: "Ombor qoldiqlari"                                      |
|  [Warehouse ▼] [Category ▼] [Chart icon]                        |
+------------------------------------------------------------------+
|                                                                  |
|  STATS CARDS (3 columns):                                        |
|  +----------------+  +----------------+  +----------------+      |
|  | Jami           |  | Umumiy qiymat  |  | Kam qolgan    |      |
|  | mahsulotlar    |  | XX,XXX so'm    |  | mahsulotlar   |      |
|  | 12             |  | +8.2%          |  | 3             |      |
|  +----------------+  +----------------+  +----------------+      |
|                                                                  |
|  TABLE with search and sort:                                     |
|  +--------------------------------------------------------------+|
|  | Mahsulot | Kategoriya | Shtrix-kod | Miqdori | Narx | Status||
|  |----------|------------|------------|---------|------|--------||
|  | [icon]   | Ichimliklar| 123456789  | 36 dona | 18K  | Yetarli||
|  | Arizona  |            |            | [====]  |      | [green]||
|  +--------------------------------------------------------------+|
|                                                                  |
|  PAGINATION                                                      |
+------------------------------------------------------------------+
```

**Table Features**:
- Product icon placeholder
- Stock level progress bar
- Color-coded status badges:
  - Yetarli (Sufficient): Green
  - O'rtacha (Medium): Amber
  - Kam (Low): Red

---

### 5. Tovarlarni hisobdan chiqarish - Write-offs (`/chiqim`)

**Purpose**: Record inventory write-offs for expired, damaged, or unsuitable items.

**Visual Layout**:
```
+------------------------------------------------------------------+
|  CARD with gradient header:                                      |
|  "Tovarlarni hisobdan chiqarish" + [Yangi hisobdan chiqarish]   |
+------------------------------------------------------------------+
|                                                                  |
|  DATE FILTERS + SEARCH:                                          |
|  [Boshlang'ich sana] [Tugash sanasi] [Qidirish...]             |
|                                                                  |
|  TABLE:                                                          |
|  +--------------------------------------------------------------+|
|  | ID | Ombor | Mahsulot | Miqdori | Sabab | Sana |             ||
|  |----|-------|----------|---------|-------|------|             ||
|  | 1  | Asosiy| Coca-Cola| 50      | Muddat| 2025 |             ||
|  +--------------------------------------------------------------+|
|  | FOOTER: Jami: 80                                             ||
|  +--------------------------------------------------------------+|
|                                                                  |
|  PAGINATION: [Oldingi] Sahifa X/Y [Keyingi]                     |
+------------------------------------------------------------------+
```

**Dialog Fields**:
- Mahsulot (Product)
- Ombor (Warehouse) - dropdown
- Miqdori (Quantity)
- Sabab (Reason) - dropdown:
  - Yaroqlilik muddati o'tgan
  - Shikastlangan qadoq
  - Sifat standartlariga mos kelmaydi
  - Boshqa
- Sana (Date)

---

### 6. Kassa - Cash Register (`/kassa`)

**Purpose**: Track cash flow and transactions.

**Visual Layout**:
```
+------------------------------------------------------------------+
|  HEADER: "Kassa"                                                 |
|  TABS: [Bugun] [Hafta] [Oy] [Boshqa] + [Download]               |
+------------------------------------------------------------------+
|                                                                  |
|  (If "Boshqa" selected: Date range pickers)                      |
|                                                                  |
|  STATS CARDS (3 columns):                                        |
|  +----------------+  +----------------+  +----------------+      |
|  | Jami kirim     |  | Jami chiqim    |  | Balans        |      |
|  | [green $]      |  | [red $]        |  | [blue card]   |      |
|  | 24,560,000     |  | 18,230,000     |  | 6,330,000     |      |
|  | +12.5%         |  | +8.2%          |  | +4.3%         |      |
|  +----------------+  +----------------+  +----------------+      |
|                                                                  |
|  TRANSACTIONS LIST:                                              |
|  +--------------------------------------------------------------+|
|  | "Tranzaksiyalar" + [Filter ▼] [Saralash] [Search]           ||
|  |--------------------------------------------------------------|
|  | [green/red circle] | Description        | +/-Amount | Badge ||
|  |                    | Date               |           | Method||
|  +--------------------------------------------------------------+|
|                                                                  |
|  PAGINATION                                                      |
+------------------------------------------------------------------+
```

**Transaction Types**:
- Income (green circle, + amount)
- Expense (red circle, - amount)

**Payment Method Badges**:
- Naqd (Cash): Blue
- Bank: Purple

---

### 7. Harajatlar - Expenses (`/harajatlar`)

**Purpose**: Track general business expenses.

**Visual Layout**:
```
+------------------------------------------------------------------+
|  HEADER: "Harajatlar" + [Yangi harajat]                          |
+------------------------------------------------------------------+
|                                                                  |
|  DATE FILTERS:                                                   |
|  [Boshlang'ich sana] [Tugash sanasi]                            |
|                                                                  |
|  EXPENSES LIST:                                                  |
|  +--------------------------------------------------------------+|
|  | "Harajatlar ro'yxati" + [Saralash] [Search]                  ||
|  |--------------------------------------------------------------|
|  | Description                    | Amount      | Category     ||
|  | Date                           |             | [Badge]      ||
|  +--------------------------------------------------------------+|
|                                                                  |
|  PAGINATION                                                      |
+------------------------------------------------------------------+
```

**Expense Categories**:
- Kommunal (Utilities)
- Ish haqi (Salary)
- Ijara (Rent)
- Boshqa (Other)

---

### 8. To'lovlar - Supplier Payments (`/tolovlar`)

**Purpose**: Track payments to suppliers.

**Visual Layout**:
```
+------------------------------------------------------------------+
|  HEADER: "Yetkazib beruvchilarga to'lovlar" + [Yangi to'lov]    |
+------------------------------------------------------------------+
|                                                                  |
|  DATE FILTERS:                                                   |
|  [Boshlang'ich sana] [Tugash sanasi]                            |
|                                                                  |
|  PAYMENTS LIST:                                                  |
|  +--------------------------------------------------------------+|
|  | "To'lovlar ro'yxati" + [Saralash] [Search]                   ||
|  |--------------------------------------------------------------|
|  | Supplier Name                  | Amount      | Method       ||
|  | Date                           |             | [Badge]      ||
|  +--------------------------------------------------------------+|
|                                                                  |
|  PAGINATION                                                      |
+------------------------------------------------------------------+
```

**Payment Method Badges**:
- Naqd (Cash): Green
- Bank: Purple

---

### 9. Narxlarni yangilash - Price Updates (`/narxlarni-yangilash`)

**Purpose**: Update product prices and markups.

**Visual Layout**:
```
+------------------------------------------------------------------+
|  HEADER: "Narxlarni yangilash"                                   |
+------------------------------------------------------------------+
|                                                                  |
|  SEARCH & FILTER:                                                |
|  [Search products...] [Price List ▼]                            |
|                                                                  |
|  PRODUCT TABLE:                                                  |
|  +--------------------------------------------------------------+|
|  | Name | Purchase | Sale Price | New Price | Price List | Date ||
|  |------|----------|------------|-----------|------------|------||
|  | Prod | 5,500    | 6,908      | [input]   | List 01    | 2024 ||
|  +--------------------------------------------------------------+|
|                                                                  |
+------------------------------------------------------------------+
```

**Features**:
- Inline editing of new sale prices
- Filter by price list
- Search by product name

---

### 10. Qaytarilgan mahsulotlar - Returned Products (`/qaytarilgan`)

**Purpose**: View history of returned products.

**Visual Layout**:
```
+------------------------------------------------------------------+
|  CARD: "Qaytarilgan mahsulotlar"                                 |
+------------------------------------------------------------------+
|                                                                  |
|  DATE FILTERS + NAVIGATION:                                      |
|  [Boshlang'ich sana] [Tugash sanasi] [Oldingi] [Keyingi]        |
|                                                                  |
|  TABLE:                                                          |
|  +--------------------------------------------------------------+|
|  | Xarid raqami | Taminotchi | Telefon | Sana | Summa | Actions||
|  |--------------|------------|---------|------|-------|--------||
|  | 1            | Coca-Cola  | +998... | 2025 | 15M   | Batafsil|
|  +--------------------------------------------------------------+|
|  | TOTAL ROW: Jami: XX,XXX,XXX so'm                             ||
|  +--------------------------------------------------------------+|
|                                                                  |
+------------------------------------------------------------------+
```

**Detail Dialog**:
- Supplier info
- Return date and reason
- Blue info banner about return status
- Detailed product table with totals

---

### 11. Login Page (`/login`)

**Purpose**: User authentication.

**Visual Layout**:
```
+------------------------------------------------------------------+
|                                                                  |
|  DARK GRADIENT BACKGROUND (slate-900 to slate-800)               |
|                                                                  |
|              +---------------------------+                       |
|              |      [BIS Logo]           |                       |
|              +---------------------------+                       |
|                                                                  |
|              +---------------------------+                       |
|              | Business Intelligence     |                       |
|              | System                    |                       |
|              |---------------------------|                       |
|              | [Login input]             |                       |
|              | [Password input] [eye]    |                       |
|              |                           |                       |
|              | [Tizimga kirish button]   |                       |
|              |---------------------------|                       |
|              | Login: bobs | Parol: bobs |                       |
|              +---------------------------+                       |
|                                                                  |
|              (c) 2025 Business Intelligence System               |
|                                                                  |
+------------------------------------------------------------------+
```

**Features**:
- Password visibility toggle
- Loading state with spinner
- Error message display
- Test credentials hint

---

## Database Schema

### Document (Purchase Document)
```prisma
model Document {
  id              Int       @id @default(autoincrement())
  docNumber       String    @unique
  date            String
  supplier        String
  warehouse       String
  paymentType     String
  totalAmount     String
  status          String
  itemsCount      Int
  products        Product[]
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}
```

### Product (Items in documents)
```prisma
model Product {
  id              Int       @id @default(autoincrement())
  barcode         String
  name            String
  quantity        Int
  markup          Float
  purchasePrice   String
  sellingPrice    String
  totalPurchase   String
  totalSelling    String
  productGroup    String
  documentId      Int
  document        Document  @relation(fields: [documentId], references: [id])
  createdAt       DateTime  @default(now())
}
```

### ItemMaster (Product catalog)
```prisma
model ItemMaster {
  id              Int       @id @default(autoincrement())
  barcode         String    @unique
  name            String
  productGroup    String
  unit            String
  description     String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}
```

---

## API Endpoints

| Endpoint | Methods | Purpose |
|----------|---------|---------|
| `/api/documents` | GET, POST | List/Create purchase documents |
| `/api/documents/[id]` | GET, PUT, PATCH, DELETE | Single document operations |
| `/api/item-master` | GET, POST | Product catalog |
| `/api/products/barcode/[code]` | GET | Barcode lookup |
| `/api/purchase-history/supplier/[name]` | GET | Supplier history |
| `/api/returns` | GET, POST | Return documents |

---

## Folder Structure

```
product-management/
├── app/                           # Next.js App Router directory
│   ├── api/                       # API Routes (backend)
│   │   ├── documents/            # Purchase documents CRUD
│   │   ├── item-master/          # Product master data
│   │   ├── products/             # Product routes
│   │   ├── purchase-history/     # Purchase history analysis
│   │   └── returns/              # Return documents
│   ├── yetib-kelgan/            # Incoming documents pages
│   │   ├── page.tsx             # List view
│   │   ├── add/page.tsx         # Add new document
│   │   ├── [id]/page.tsx        # View document
│   │   └── edit/[id]/page.tsx   # Edit document
│   ├── ombor/                   # Warehouse pages
│   ├── chiqim/                  # Write-offs pages
│   ├── kassa/                   # Cash register pages
│   ├── tolovlar/                # Payments pages
│   ├── harajatlar/              # Expenses pages
│   ├── narxlarni-yangilash/     # Price updates pages
│   ├── qaytarilgan/             # Returns pages
│   ├── login/                   # Authentication pages
│   ├── layout.tsx               # Root layout with sidebar & header
│   ├── page.tsx                 # Dashboard page
│   └── globals.css              # Global styles
│
├── components/                   # Reusable React components
│   ├── ui/                       # Shadcn UI components
│   ├── purchase/                 # Purchase-specific components
│   ├── sidebar.tsx               # Main navigation sidebar
│   ├── abc-analysis-table.tsx
│   ├── abc-xyz-analysis-section.tsx
│   └── product-table.tsx
│
├── hooks/                        # Custom React hooks
│   ├── use-pagination.ts
│   └── use-toast.ts
│
├── lib/                          # Utility functions
│   ├── prisma.ts
│   ├── pagination.ts
│   └── utils.ts
│
├── types/                        # TypeScript definitions
├── prisma/                       # Database schema
└── public/                       # Static assets
```

---

## Design System

### Colors
- **Primary**: Blue-600 (#2563eb), Blue-500 (#3b82f6)
- **Background**: Slate-50, White
- **Sidebar**: Slate-900 gradient
- **Success**: Green-500, Green-600
- **Warning**: Amber-500, Yellow-500
- **Danger**: Red-500, Red-600
- **Info**: Cyan-500, Blue-500

### Status Badges
- **Tasdiqlangan** (Confirmed): Green background
- **Qoralama** (Draft): Amber background
- **Bekor qilingan** (Cancelled): Red background
- **Kutilmoqda** (Pending): Blue background

### Component Patterns
- Cards with subtle shadows and rounded corners
- Tables with hover states and striped rows
- Progress bars for stock levels
- Gradient buttons for primary actions
- Icon buttons for secondary actions

---

## Key Features to Implement

1. **Responsive sidebar navigation** with collapsible menus and localStorage persistence
2. **Smart pagination** (client & server-side)
3. **Barcode scanning** with product lookup
4. **Excel import/export** functionality
5. **Real-time calculations** (totals, markups, VAT)
6. **ABC/XYZ analysis** with interactive visualizations
7. **Multi-warehouse support**
8. **Dark mode** support (via next-themes)
9. **Toast notifications**
10. **Form validation** with Zod
11. **Partial returns** with product selection
12. **Status change workflows**
13. **Date range filtering**
14. **Search and sort** functionality
15. **Inventory health scoring**

---

## Getting Started

```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push

# Run development server
npm run dev

# Open browser
http://localhost:3000

# Login credentials
Username: bobs
Password: bobs2025
```

---

## Language Reference (Uzbek Terms)

| Uzbek | English |
|-------|---------|
| Kirim hujjatlari | Incoming documents |
| Ombor qoldiqlari | Warehouse inventory |
| Tovarlarni hisobdan chiqarish | Write-off products |
| Harajatlar | Expenses |
| To'lovlar | Payments |
| Narxlarni yangilash | Update prices |
| Qaytarilgan mahsulotlar | Returned products |
| Yetkazib beruvchilar | Suppliers |
| Ta'minotchi | Supplier |
| Mahsulot | Product |
| Miqdori | Quantity |
| Narxi | Price |
| Summa | Amount |
| Sana | Date |
| Tasdiqlangan | Confirmed |
| Qoralama | Draft |
| Bekor qilingan | Cancelled |
| Jami | Total |
| Qidirish | Search |
| Saqlash | Save |
| Bekor qilish | Cancel |

---

This documentation provides a complete blueprint for recreating the Business Intelligence System from scratch.
