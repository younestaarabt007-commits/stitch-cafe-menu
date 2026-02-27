# 🎨 UI/UX DESIGN PROMPT
## Restaurant Light POS - Complete Interface Design System

---

## 🎯 MISSION OBJECTIVE

Design a **complete, production-ready UI/UX system** for a multi-tenant Restaurant Light POS with:

- **Intuitive interfaces** for 3 user roles (Manager, Staff, Cashier)
- **Modern design system** (colors, typography, components)
- **Responsive layouts** (desktop, tablet, mobile)
- **Accessibility compliance** (WCAG 2.1 AA)
- **Fast interaction patterns** optimized for restaurant workflows
- **Real-time updates** with smooth animations

---

## 🏗️ DESIGN PRINCIPLES

### 1. Speed First
- **One-click actions** for frequent operations
- **Keyboard shortcuts** for power users
- **Touch-optimized** for tablet use
- **Minimal clicks** to complete tasks

### 2. Clarity & Simplicity
- **Clear visual hierarchy**
- **Consistent patterns** across all screens
- **Minimal cognitive load**
- **Status always visible**

### 3. Error Prevention
- **Confirmation dialogs** for destructive actions
- **Visual feedback** for all interactions
- **Disabled states** for invalid actions
- **Inline validation** for forms

### 4. Moroccan Context
- **RTL support ready** (Arabic)
- **French + Arabic** language support
- **Local currency** (MAD) formatting
- **Cultural color preferences**

---

## 🎨 DESIGN SYSTEM

### Color Palette

**Primary Colors:**
```
Primary:     #2563EB (Blue - Trust, Professional)
Secondary:   #10B981 (Green - Success, Money)
Accent:      #F59E0B (Amber - Attention, Warmth)
```

**Semantic Colors:**
```
Success:     #10B981
Warning:     #F59E0B
Error:       #EF4444
Info:        #3B82F6
```

**Neutral Colors:**
```
Gray 900:    #111827 (Text Primary)
Gray 700:    #374151 (Text Secondary)
Gray 500:    #6B7280 (Text Disabled)
Gray 300:    #D1D5DB (Borders)
Gray 100:    #F3F4F6 (Backgrounds)
White:       #FFFFFF
```

**Order Status Colors:**
```
Draft:       #9CA3AF (Gray)
Confirmed:   #3B82F6 (Blue)
Preparing:   #F59E0B (Amber)
Ready:       #10B981 (Green)
Completed:   #6366F1 (Indigo)
Paid:        #059669 (Dark Green)
Voided:      #EF4444 (Red)
```

### Typography

**Font Family:**
```
Primary:     'Inter', sans-serif
Monospace:   'Roboto Mono', monospace (for numbers)
Arabic:      'Cairo', sans-serif
```

**Font Sizes:**
```
xs:   12px / 0.75rem
sm:   14px / 0.875rem
base: 16px / 1rem
lg:   18px / 1.125rem
xl:   20px / 1.25rem
2xl:  24px / 1.5rem
3xl:  30px / 1.875rem
4xl:  36px / 2.25rem
```

**Font Weights:**
```
Regular:     400
Medium:      500
Semibold:    600
Bold:        700
```

### Spacing Scale

```
xs:   4px
sm:   8px
md:   16px
lg:   24px
xl:   32px
2xl:  48px
3xl:  64px
```

### Border Radius

```
sm:   4px  (Buttons, inputs)
md:   8px  (Cards)
lg:   12px (Modals)
full: 9999px (Pills, badges)
```

### Shadows

```
sm:   0 1px 2px rgba(0, 0, 0, 0.05)
md:   0 4px 6px rgba(0, 0, 0, 0.1)
lg:   0 10px 15px rgba(0, 0, 0, 0.1)
xl:   0 20px 25px rgba(0, 0, 0, 0.15)
```

---

## 📱 SCREEN DESIGNS REQUIRED

### 1️⃣ MANAGER DASHBOARD

**Purpose:** Overview of restaurant operations

**Layout:** Desktop-first (1920x1080 optimal)

**Key Sections:**

**A. Top Bar**
- Restaurant name + logo
- Current date/time
- Active cash session indicator
- User profile dropdown
- Notifications bell

**B. Stats Cards (4 cards in row)**
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ Today's     │ Orders      │ Avg Order   │ Cash        │
│ Revenue     │ Count       │ Value       │ Balance     │
│ 8,450 MAD   │ 87          │ 97 MAD      │ 2,340 MAD   │
│ +12% ↑      │ +5 ↑        │ -3% ↓       │ Session #42 │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

**C. Main Content (2 columns)**

**Left Column (60%):**
- **Live Orders Table**
  - Columns: Order #, Table, Items, Status, Total, Time, Actions
  - Color-coded status badges
  - Quick actions: View, Print, Void

**Right Column (40%):**
- **Revenue Chart** (Today's hourly breakdown)
- **Top Items** (Best sellers)
- **Recent Activity** (Audit log)

**D. Quick Actions (Floating Action Button)**
- New Order
- Open Cash Session
- Close Session
- View Reports

**Color Scheme:**
- Background: #F9FAFB
- Cards: White with shadow-md
- Primary actions: Blue
- Danger actions: Red

---

### 2️⃣ STAFF ORDER SCREEN

**Purpose:** Fast order creation for waiters

**Layout:** Tablet-optimized (iPad 10.2" - 810x1080)

**Key Sections:**

**A. Header**
- Staff name + avatar
- Current table selector (dropdown)
- Active orders count badge
- Logout button

**B. Menu Categories (Horizontal scroll)**
```
[ All ] [ Breakfast ] [ Hot Drinks ] [ Bakery ] [ Desserts ]
```

**C. Menu Items Grid (3 columns)**
```
┌──────────────┬──────────────┬──────────────┐
│ Cappuccino   │ Croissant    │ Omelette     │
│ 25 MAD       │ 15 MAD       │ 35 MAD       │
│ [+]          │ [+]          │ [+]          │
└──────────────┴──────────────┴──────────────┘
```

**Item Card Design:**
- Image (if available)
- Name (bold, 16px)
- Price (semibold, 14px, green)
- Availability indicator (red dot if unavailable)
- Add button (large, touch-friendly 48x48px)

**D. Current Order Panel (Right sidebar - 30%)**
```
┌─────────────────────────────┐
│ Table T5                    │
│ Order #CASA-CAFE-20260213-042│
├─────────────────────────────┤
│ 2x Cappuccino         50 MAD│
│    + Large            10 MAD│
│    + No sugar              │
│                             │
│ 1x Croissant          15 MAD│
├─────────────────────────────┤
│ Subtotal              65 MAD│
│ Total                 65 MAD│
├─────────────────────────────┤
│ [  Send to Kitchen  ]       │
│ [  Send to Cashier  ]       │
└─────────────────────────────┘
```

**E. Modifier Modal (when item clicked)**
- Full-screen overlay
- Item name + image
- Required modifiers (radio buttons)
- Optional modifiers (checkboxes)
- Quantity stepper
- Notes textarea
- Add to Order button (sticky bottom)

**Interaction Patterns:**
- **Tap item** → Open modifier modal
- **Tap + button** → Add with default options
- **Long press item** → Quick view details
- **Swipe order item** → Remove

---

### 3️⃣ CASHIER PAYMENT INTERFACE

**Purpose:** Fast payment processing

**Layout:** Desktop (1920x1080)

**Key Sections:**

**A. Orders Queue (Left - 40%)**
```
┌─────────────────────────────────┐
│ READY FOR PAYMENT               │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ Order #042 - Table T5       │ │
│ │ 2 items - 65 MAD            │ │
│ │ Waiting 5 min               │ │
│ │ [Process Payment]           │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Order #043 - Takeaway       │ │
│ │ 5 items - 180 MAD           │ │
│ │ Waiting 2 min               │ │
│ │ [Process Payment]           │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

**B. Payment Panel (Right - 60%)**

**When order selected:**
```
┌─────────────────────────────────────────┐
│ Order #CASA-CAFE-20260213-042           │
│ Table T5 - Staff: Ahmed                 │
├─────────────────────────────────────────┤
│ 2x Cappuccino (Large)           60 MAD  │
│ 1x Croissant                    15 MAD  │
├─────────────────────────────────────────┤
│ TOTAL                           75 MAD  │
├─────────────────────────────────────────┤
│                                         │
│  PAYMENT METHOD                         │
│                                         │
│  ┌──────────────┐  ┌──────────────┐    │
│  │   💵 CASH    │  │   💳 CARD    │    │
│  │              │  │              │    │
│  └──────────────┘  └──────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │   CONFIRM PAYMENT - 75 MAD      │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [ Print Receipt ]  [ Cancel ]         │
└─────────────────────────────────────────┘
```

**Payment Method Buttons:**
- Large (200x150px)
- Icon + text
- Active state: Blue border + background
- Hover: Slight scale up

**Confirm Button:**
- Full width
- Large (56px height)
- Green background
- Shows amount
- Disabled until method selected

---

### 4️⃣ KITCHEN DISPLAY SYSTEM (KDS)

**Purpose:** Show orders to kitchen staff

**Layout:** Large screen (1920x1080)

**Design:**

**Grid of Order Cards (4 columns)**
```
┌──────────┬──────────┬──────────┬──────────┐
│ CONFIRMED│ PREPARING│ PREPARING│ READY    │
│ #042     │ #040     │ #041     │ #039     │
│ T5       │ T3       │ Takeaway │ T1       │
│ 2 min    │ 8 min    │ 12 min   │ 15 min   │
│          │          │          │          │
│ 2x Capp. │ 1x Omelet│ 3x Crois.│ 1x Salad │
│ 1x Crois.│ 1x Toast │ 2x Coffee│ 1x Juice │
│          │          │          │          │
│ [START]  │ [READY]  │ [READY]  │ [DONE]   │
└──────────┴──────────┴──────────┴──────────┘
```

**Order Card Design:**
- **Header:** Status badge + Order # + Table
- **Timer:** Elapsed time (color changes: green < 10min, amber < 20min, red > 20min)
- **Items:** Large text (18px), bold
- **Action Button:** Full width, status-dependent color
- **Card Color:** Border color matches status

**Auto-refresh:** Every 5 seconds

**Sound Alert:** When new order arrives

---

### 5️⃣ CASH SESSION MANAGEMENT

**A. Open Session Modal**
```
┌─────────────────────────────────────┐
│ OPEN CASH SESSION                   │
├─────────────────────────────────────┤
│                                     │
│ Opening Balance                     │
│ ┌─────────────────────────────────┐ │
│ │ 500.00                      MAD │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Notes (optional)                    │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [ Cancel ]      [ Open Session ]   │
└─────────────────────────────────────┘
```

**B. Close Session Modal**
```
┌─────────────────────────────────────┐
│ CLOSE CASH SESSION #42              │
├─────────────────────────────────────┤
│ Opening Balance:          500.00 MAD│
│ Cash In:                2,100.00 MAD│
│ Cash Out:                -250.00 MAD│
│ Expected Closing:       2,350.00 MAD│
├─────────────────────────────────────┤
│ Actual Counted Amount               │
│ ┌─────────────────────────────────┐ │
│ │ 2,340.00                    MAD │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ⚠️ Difference: -10.00 MAD           │
│                                     │
│ Notes                               │
│ ┌─────────────────────────────────┐ │
│ │ Small change shortage           │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [ Cancel ]      [ Close Session ]  │
└─────────────────────────────────────┘
```

**Difference Display:**
- **Exact match (0):** Green checkmark
- **Small difference (< 20 MAD):** Amber warning
- **Large difference (> 20 MAD):** Red alert

---

### 6️⃣ REPORTS SCREEN

**Layout:** Desktop (1920x1080)

**A. Report Selector (Top)**
```
┌────────────────────────────────────────────────┐
│ [ Daily Revenue ▼ ]  [ Date Range Picker ]    │
│                                                │
│ From: 2026-02-01  To: 2026-02-13              │
│                                                │
│ [ Generate Report ]  [ Export PDF ]  [ Excel ]│
└────────────────────────────────────────────────┘
```

**B. Report Display**

**Daily Revenue Report:**
- **Summary Cards** (Revenue, Orders, Avg Value)
- **Revenue Chart** (Line chart - hourly breakdown)
- **Payment Type Breakdown** (Pie chart)
- **Top Items Table** (Item, Qty, Revenue)
- **Staff Performance Table** (Staff, Orders, Revenue)

**Chart Library:** Chart.js or Recharts

**Export Formats:**
- PDF (formatted report with logo)
- Excel (raw data)

---

## 🧩 COMPONENT LIBRARY

### Buttons

**Primary Button:**
```css
background: #2563EB
color: white
padding: 12px 24px
border-radius: 8px
font-weight: 600
hover: background #1D4ED8
active: scale(0.98)
```

**Secondary Button:**
```css
background: white
color: #2563EB
border: 2px solid #2563EB
padding: 12px 24px
border-radius: 8px
```

**Danger Button:**
```css
background: #EF4444
color: white
```

**Icon Button:**
```css
width: 40px
height: 40px
border-radius: 8px
background: transparent
hover: background #F3F4F6
```

### Input Fields

**Text Input:**
```css
border: 1px solid #D1D5DB
border-radius: 8px
padding: 12px 16px
font-size: 16px
focus: border-color #2563EB, shadow-md
```

**Number Input (for money):**
```css
font-family: 'Roboto Mono'
text-align: right
font-size: 20px
font-weight: 600
```

### Cards

**Standard Card:**
```css
background: white
border-radius: 12px
padding: 24px
box-shadow: 0 1px 3px rgba(0,0,0,0.1)
```

**Stat Card:**
```css
background: white
border-radius: 12px
padding: 20px
border-left: 4px solid #2563EB
```

### Badges

**Status Badge:**
```css
padding: 4px 12px
border-radius: 9999px
font-size: 12px
font-weight: 600
text-transform: uppercase
```

**Colors by status:**
- Draft: Gray background
- Confirmed: Blue background
- Preparing: Amber background
- Ready: Green background
- Paid: Dark green background
- Voided: Red background

### Modals

**Standard Modal:**
```css
max-width: 600px
background: white
border-radius: 16px
box-shadow: 0 20px 25px rgba(0,0,0,0.15)
padding: 32px
```

**Overlay:**
```css
background: rgba(0, 0, 0, 0.5)
backdrop-filter: blur(4px)
```

### Tables

**Data Table:**
```css
width: 100%
border-collapse: separate
border-spacing: 0 8px
```

**Table Row:**
```css
background: white
border-radius: 8px
hover: background #F9FAFB
cursor: pointer
```

**Table Header:**
```css
background: #F3F4F6
font-weight: 600
color: #374151
text-transform: uppercase
font-size: 12px
```

---

## 📱 RESPONSIVE BREAKPOINTS

```
Mobile:   < 640px
Tablet:   640px - 1024px
Desktop:  > 1024px
Large:    > 1920px
```

**Responsive Strategy:**
- **Manager Dashboard:** Desktop-only (redirect mobile to simplified view)
- **Staff Order Screen:** Tablet-optimized (portrait + landscape)
- **Cashier Interface:** Desktop-only
- **KDS:** Large screen only

---

## ♿ ACCESSIBILITY REQUIREMENTS

### WCAG 2.1 AA Compliance

**Color Contrast:**
- Text on background: Minimum 4.5:1
- Large text (18px+): Minimum 3:1
- Interactive elements: Minimum 3:1

**Keyboard Navigation:**
- All interactive elements focusable
- Visible focus indicators
- Logical tab order
- Keyboard shortcuts for common actions

**Screen Reader Support:**
- Semantic HTML
- ARIA labels for icons
- ARIA live regions for real-time updates
- Alt text for images

**Touch Targets:**
- Minimum 44x44px
- Adequate spacing (8px minimum)

---

## 🎬 ANIMATION & TRANSITIONS

**Micro-interactions:**
```css
Button hover: transform scale(1.02) - 150ms
Button click: transform scale(0.98) - 100ms
Card hover: shadow transition - 200ms
Modal open: fade + scale - 300ms ease-out
Toast notification: slide-in from top - 250ms
```

**Real-time Updates:**
```css
New order: Pulse animation on notification badge
Status change: Color transition - 500ms
Live data update: Subtle highlight flash - 300ms
```

**Loading States:**
- Skeleton screens for data loading
- Spinner for actions
- Progress bar for exports

---

## 🔔 NOTIFICATION SYSTEM

**Toast Notifications:**

**Success:**
```
┌────────────────────────────────┐
│ ✅ Order #042 paid successfully│
└────────────────────────────────┘
```

**Error:**
```
┌────────────────────────────────┐
│ ❌ Cannot void paid order      │
└────────────────────────────────┘
```

**Warning:**
```
┌────────────────────────────────┐
│ ⚠️ Cash session closing soon   │
└────────────────────────────────┘
```

**Position:** Top-right
**Duration:** 3 seconds (auto-dismiss)
**Stacking:** Max 3 visible

---

## 🎯 USER FLOWS

### Flow 1: Create Order (Staff)
1. Select table from dropdown
2. Browse menu categories
3. Tap item → Modifier modal opens
4. Select modifiers
5. Add to order
6. Repeat for more items
7. Tap "Send to Kitchen"
8. Confirmation toast
9. Order appears in manager dashboard

### Flow 2: Process Payment (Cashier)
1. View orders ready for payment
2. Click "Process Payment"
3. Review order details
4. Select payment method (Cash/Card)
5. Click "Confirm Payment"
6. Print receipt automatically
7. Order marked as PAID
8. Real-time update to all screens

### Flow 3: Close Cash Session (Manager)
1. Click "Close Session" button
2. Modal shows summary
3. Enter actual counted amount
4. System calculates difference
5. Add notes if needed
6. Confirm closing
7. Session locked
8. Summary report generated

---

## 🎨 DESIGN DELIVERABLES REQUIRED

1. **High-Fidelity Mockups** (Figma/Adobe XD)
   - All 6 main screens
   - Desktop + Tablet + Mobile variants
   - Light mode (dark mode optional)

2. **Component Library**
   - All reusable components
   - States (default, hover, active, disabled)
   - Variants (sizes, colors)

3. **Design System Documentation**
   - Color palette with hex codes
   - Typography scale
   - Spacing system
   - Icon library

4. **Interactive Prototype**
   - Clickable prototype showing key flows
   - Transitions and animations
   - Real-time update simulations

5. **Responsive Layouts**
   - Breakpoint specifications
   - Layout grids
   - Adaptive components

6. **Accessibility Audit**
   - Color contrast report
   - Keyboard navigation map
   - Screen reader testing results

---

## ✅ CRITICAL SUCCESS CRITERIA

The UI/UX MUST:

✅ Enable order creation in < 30 seconds  
✅ Support payment processing in < 15 seconds  
✅ Provide clear visual feedback for all actions  
✅ Work flawlessly on tablets (iPad 10.2")  
✅ Meet WCAG 2.1 AA accessibility standards  
✅ Display real-time updates within 1 second  
✅ Support touch targets minimum 44x44px  
✅ Maintain 60fps animations  
✅ Work in bright restaurant lighting (high contrast)  
✅ Support bilingual interface (French/Arabic)  

---

**END OF UI/UX DESIGN PROMPT**
