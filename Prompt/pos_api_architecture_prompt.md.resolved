# 🌐 REST API ARCHITECTURE DESIGN PROMPT
## Restaurant Light POS - Enterprise-Grade API Specification

---

## 🎯 MISSION OBJECTIVE

Design a **production-ready REST API architecture** for a multi-tenant, cloud-based Restaurant Light POS system with:

- **RESTful principles** adherence
- **Enterprise-grade security** (JWT, RBAC, rate limiting)
- **Idempotent operations** for critical transactions
- **Real-time capabilities** via WebSocket
- **Comprehensive error handling**
- **API versioning** strategy
- **Performance optimization** (<100ms response time for 95% of requests)

---

## 🏗️ API ARCHITECTURE PRINCIPLES

### 1. Design Philosophy

```
Style: RESTful with pragmatic extensions
Protocol: HTTPS only (TLS 1.3+)
Format: JSON (application/json)
Versioning: URI-based (/api/v1/)
Authentication: JWT (access + refresh tokens)
Authorization: Role-Based Access Control (RBAC)
```

### 2. Base URL Structure

```
Production:  https://api.yourpos.com/api/v1
Staging:     https://api-staging.yourpos.com/api/v1
Development: http://localhost:3000/api/v1
```

### 3. Request/Response Standards

**Request Headers (Required):**
```http
Authorization: Bearer {access_token}
Content-Type: application/json
X-Tenant-ID: {tenant_uuid}  # Validated against JWT
```

**Response Format:**
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2026-02-13T23:45:29Z",
    "request_id": "req_abc123"
  }
}
```

**Error Response Format:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_STATE",
    "message": "Order is already paid and cannot be modified",
    "details": {
      "order_id": "uuid",
      "current_status": "PAID"
    }
  },
  "meta": {
    "timestamp": "2026-02-13T23:45:29Z",
    "request_id": "req_abc123"
  }
}
```

---

## 🔐 AUTHENTICATION & AUTHORIZATION

### Authentication Flow

#### **POST /api/v1/auth/login**

**Purpose:** Authenticate user via PIN and obtain JWT tokens

**Request:**
```json
{
  "pin": "1234",
  "tenant_slug": "casa-cafe123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "user": {
      "id": "uuid",
      "name": "Ahmed",
      "role": "STAFF",
      "tenant_id": "uuid"
    }
  }
}
```

**JWT Payload:**
```json
{
  "sub": "user_uuid",
  "tenant_id": "tenant_uuid",
  "role": "STAFF",
  "iat": 1708123456,
  "exp": 1708127056
}
```

**Security Rules:**
- Access token lifetime: **1 hour**
- Refresh token lifetime: **7 days**
- PIN attempts: **5 max, then 15-min lockout**
- Tokens stored: **httpOnly cookies** (web) or secure storage (mobile)

---

#### **POST /api/v1/auth/refresh**

**Purpose:** Obtain new access token using refresh token

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "access_token": "new_token...",
    "expires_in": 3600
  }
}
```

---

#### **POST /api/v1/auth/logout**

**Purpose:** Invalidate current session

**Request:** (No body, token in header)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

**Implementation:** Add token to blacklist (Redis) until expiry

---

## 👥 USER MANAGEMENT

### **GET /api/v1/users**

**Permissions:** MANAGER only

**Query Parameters:**
```
?role=STAFF
&is_active=true
&page=1
&limit=20
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "uuid",
        "name": "Ahmed",
        "role": "STAFF",
        "is_active": true,
        "last_login_at": "2026-02-13T10:30:00Z",
        "created_at": "2026-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "total_pages": 3
    }
  }
}
```

---

### **POST /api/v1/users**

**Permissions:** MANAGER only

**Request:**
```json
{
  "name": "Fatima",
  "role": "STAFF",
  "pin": "5678"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Fatima",
    "role": "STAFF",
    "is_active": true,
    "created_at": "2026-02-13T23:45:29Z"
  }
}
```

**Validation Rules:**
- PIN must be 4-6 digits
- PIN must be unique within tenant
- Name required (2-255 chars)

---

### **PATCH /api/v1/users/:id**

**Permissions:** MANAGER only

**Request:**
```json
{
  "name": "Fatima El Amrani",
  "is_active": false
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Fatima El Amrani",
    "is_active": false,
    "updated_at": "2026-02-13T23:45:29Z"
  }
}
```

---

## 🍽️ MENU MANAGEMENT

### **GET /api/v1/menu/categories**

**Permissions:** ALL authenticated users

**Query Parameters:**
```
?is_active=true
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "uuid",
        "name": "Breakfast",
        "description": "Morning delights",
        "display_order": 1,
        "is_active": true,
        "items_count": 12
      }
    ]
  }
}
```

---

### **POST /api/v1/menu/categories**

**Permissions:** MANAGER only

**Request:**
```json
{
  "name": "Desserts",
  "description": "Sweet treats",
  "display_order": 5
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Desserts",
    "display_order": 5,
    "is_active": true,
    "created_at": "2026-02-13T23:45:29Z"
  }
}
```

---

### **GET /api/v1/menu/items**

**Permissions:** ALL authenticated users

**Query Parameters:**
```
?category_id=uuid
&is_available=true
&search=coffee
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "Cappuccino",
        "description": "Classic Italian coffee",
        "base_price": 25.00,
        "category": {
          "id": "uuid",
          "name": "Hot Drinks"
        },
        "modifiers": [
          {
            "id": "uuid",
            "name": "Size",
            "is_required": true,
            "options": [
              {
                "id": "uuid",
                "name": "Small",
                "price_adjustment": 0.00
              },
              {
                "id": "uuid",
                "name": "Large",
                "price_adjustment": 5.00
              }
            ]
          }
        ],
        "is_available": true
      }
    ]
  }
}
```

---

### **PATCH /api/v1/menu/items/:id/availability**

**Permissions:** MANAGER, STAFF

**Request:**
```json
{
  "is_available": false
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "is_available": false,
    "updated_at": "2026-02-13T23:45:29Z"
  }
}
```

**Real-time Event:** Broadcast `menu_item_availability_changed` via WebSocket

---

## 🪑 TABLE MANAGEMENT

### **GET /api/v1/tables**

**Permissions:** ALL authenticated users

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "tables": [
      {
        "id": "uuid",
        "name": "T1",
        "capacity": 4,
        "is_active": true,
        "current_orders": [
          {
            "id": "uuid",
            "order_number": "CASA-CAFE123-20260213-001",
            "status": "PREPARING",
            "total_amount": 150.00
          }
        ]
      }
    ]
  }
}
```

---

## 🧾 ORDER MANAGEMENT

### **POST /api/v1/orders**

**Permissions:** MANAGER, STAFF

**Request:**
```json
{
  "order_type": "DINE_IN",
  "table_id": "uuid",
  "items": [
    {
      "menu_item_id": "uuid",
      "quantity": 2,
      "modifiers": [
        {
          "modifier_option_id": "uuid"
        }
      ],
      "notes": "No sugar"
    }
  ],
  "notes": "Customer allergic to nuts"
}
```

**Headers:**
```http
Idempotency-Key: unique_client_generated_key
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "order_number": "CASA-CAFE123-20260213-042",
    "order_type": "DINE_IN",
    "status": "DRAFT",
    "table": {
      "id": "uuid",
      "name": "T5"
    },
    "items": [
      {
        "id": "uuid",
        "menu_item": {
          "id": "uuid",
          "name": "Cappuccino"
        },
        "quantity": 2,
        "unit_price": 25.00,
        "modifiers": [
          {
            "name": "Large",
            "price_adjustment": 5.00
          }
        ],
        "total_price": 60.00,
        "notes": "No sugar"
      }
    ],
    "subtotal": 60.00,
    "total_amount": 60.00,
    "created_at": "2026-02-13T23:45:29Z"
  }
}
```

**Transaction Boundary:**
```
BEGIN TRANSACTION
  1. Insert into orders
  2. Insert into order_items
  3. Insert into order_item_modifiers
  4. Update order.total_amount
COMMIT
```

**Idempotency:** If `Idempotency-Key` matches existing order, return existing order (200 OK)

---

### **GET /api/v1/orders**

**Permissions:** ALL authenticated users

**Query Parameters:**
```
?status=PREPARING
&table_id=uuid
&date_from=2026-02-13
&date_to=2026-02-13
&page=1
&limit=50
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "orders": [ /* array of order objects */ ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 120,
      "total_pages": 3
    }
  }
}
```

---

### **GET /api/v1/orders/:id**

**Permissions:** ALL authenticated users

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    /* Full order object with items, modifiers, payment info */
  }
}
```

---

### **PATCH /api/v1/orders/:id/status**

**Permissions:** MANAGER, STAFF

**Request:**
```json
{
  "status": "PREPARING"
}
```

**Allowed Transitions:**
```
DRAFT → CONFIRMED
CONFIRMED → PREPARING
PREPARING → READY
READY → COMPLETED
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "PREPARING",
    "updated_at": "2026-02-13T23:45:29Z"
  }
}
```

**Real-time Event:** Broadcast `order_status_updated` via WebSocket

---

### **POST /api/v1/orders/:id/void**

**Permissions:** MANAGER only

**Request:**
```json
{
  "reason": "Customer cancelled order"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "VOIDED",
    "voided_at": "2026-02-13T23:45:29Z",
    "voided_by": {
      "id": "uuid",
      "name": "Manager Ahmed"
    },
    "void_reason": "Customer cancelled order"
  }
}
```

**Validation:**
- Cannot void PAID orders (must reopen first)
- Reason is mandatory

**Audit:** Log to `audit_logs` table

---

### **POST /api/v1/orders/:id/reopen**

**Permissions:** MANAGER only

**Request:**
```json
{
  "reason": "Customer requested modification"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "CONFIRMED",
    "reopened_at": "2026-02-13T23:45:29Z"
  }
}
```

**Validation:**
- Only PAID orders can be reopened
- Mandatory reason

**Audit:** Critical action - full logging required

---

## 💵 PAYMENT PROCESSING

### **POST /api/v1/orders/:id/pay**

**Permissions:** MANAGER only

**Request:**
```json
{
  "payment_type": "CASH",
  "amount": 150.00
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "payment": {
      "id": "uuid",
      "order_id": "uuid",
      "payment_type": "CASH",
      "amount": 150.00,
      "validated_by": {
        "id": "uuid",
        "name": "Manager Ahmed"
      },
      "created_at": "2026-02-13T23:45:29Z"
    },
    "order": {
      "id": "uuid",
      "status": "PAID",
      "paid_at": "2026-02-13T23:45:29Z"
    }
  }
}
```

**Transaction Boundary (SERIALIZABLE):**
```
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE
  1. Validate order not already paid
  2. Validate cash session is OPEN
  3. Validate amount matches order total
  4. Insert into payments
  5. Update order.status = 'PAID'
  6. Update order.paid_at
  7. IF payment_type = 'CASH':
       Insert into cash_movements (CASH_IN)
  8. Insert into audit_logs
COMMIT
```

**Validation Rules:**
- Amount must equal order.total_amount
- Order must not be VOIDED
- Order must not already be PAID
- Cash session must be OPEN

**Error Responses:**
```json
// 409 Conflict - Already paid
{
  "success": false,
  "error": {
    "code": "ORDER_ALREADY_PAID",
    "message": "This order has already been paid"
  }
}

// 400 Bad Request - No active session
{
  "success": false,
  "error": {
    "code": "NO_ACTIVE_CASH_SESSION",
    "message": "Cannot process payment without an active cash session"
  }
}
```

---

## 🏦 CASH SESSION MANAGEMENT

### **POST /api/v1/cash-session/open**

**Permissions:** MANAGER only

**Request:**
```json
{
  "opening_balance": 500.00
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "opening_balance": 500.00,
    "status": "OPEN",
    "opened_by": {
      "id": "uuid",
      "name": "Manager Ahmed"
    },
    "opened_at": "2026-02-13T08:00:00Z"
  }
}
```

**Validation:**
- Only ONE open session allowed per tenant
- Opening balance must be >= 0

---

### **GET /api/v1/cash-session/current**

**Permissions:** MANAGER, STAFF

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "opening_balance": 500.00,
    "current_balance": 2350.00,
    "status": "OPEN",
    "opened_at": "2026-02-13T08:00:00Z",
    "movements_summary": {
      "cash_in": 2100.00,
      "cash_out": 250.00,
      "adjustments": 0.00
    },
    "orders_count": 42,
    "cash_orders_count": 35,
    "card_orders_count": 7
  }
}
```

---

### **POST /api/v1/cash-session/close**

**Permissions:** MANAGER only

**Request:**
```json
{
  "actual_closing_balance": 2340.00,
  "notes": "10 MAD difference - small change shortage"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "opening_balance": 500.00,
    "expected_closing_balance": 2350.00,
    "actual_closing_balance": 2340.00,
    "difference": -10.00,
    "status": "CLOSED",
    "closed_at": "2026-02-13T23:45:29Z",
    "summary": {
      "total_cash_orders": 35,
      "total_card_orders": 7,
      "total_revenue": 4200.00,
      "cash_revenue": 2100.00,
      "card_revenue": 2100.00
    }
  }
}
```

**Transaction Boundary:**
```
BEGIN TRANSACTION
  1. Calculate expected_closing_balance
  2. Calculate difference
  3. Update cash_session (status, closing data)
  4. Insert into audit_logs
COMMIT
```

**Validation:**
- Session must be OPEN
- Actual balance required

---

## 💰 CASH MOVEMENTS

### **POST /api/v1/cash-movements**

**Permissions:** MANAGER only

**Request:**
```json
{
  "movement_type": "CASH_OUT",
  "amount": 100.00,
  "reason": "Petty cash for supplies",
  "notes": "Purchased coffee beans"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "movement_type": "CASH_OUT",
    "amount": -100.00,
    "reason": "Petty cash for supplies",
    "performed_by": {
      "id": "uuid",
      "name": "Manager Ahmed"
    },
    "created_at": "2026-02-13T23:45:29Z"
  }
}
```

**Validation:**
- Cash session must be OPEN
- Reason is mandatory (3-500 chars)
- Amount must be > 0

**Movement Types:**
- `CASH_IN`: Manual cash addition (positive amount)
- `CASH_OUT`: Cash removal (negative amount)
- `ADJUSTMENT`: Manager correction (can be +/-)

---

## 🖨️ PRINTING

### **POST /api/v1/print/receipt**

**Permissions:** MANAGER, STAFF

**Request:**
```json
{
  "order_id": "uuid"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "print_job_id": "uuid",
    "order_id": "uuid",
    "print_type": "RECEIPT",
    "is_reprint": false,
    "created_at": "2026-02-13T23:45:29Z"
  }
}
```

**Audit:** Log all print jobs (including reprints)

---

### **POST /api/v1/print/kitchen-ticket**

**Permissions:** MANAGER, STAFF

**Request:**
```json
{
  "order_id": "uuid"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "print_job_id": "uuid",
    "print_type": "KITCHEN_TICKET"
  }
}
```

---

### **GET /api/v1/print/history**

**Permissions:** MANAGER only

**Query Parameters:**
```
?date=2026-02-13
&print_type=RECEIPT
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "print_jobs": [
      {
        "id": "uuid",
        "order_number": "CASA-CAFE123-20260213-042",
        "print_type": "RECEIPT",
        "is_reprint": true,
        "printed_by": {
          "name": "Staff Fatima"
        },
        "created_at": "2026-02-13T23:45:29Z"
      }
    ]
  }
}
```

---

## 📊 REPORTING & ANALYTICS

### **GET /api/v1/reports/daily**

**Permissions:** MANAGER only

**Query Parameters:**
```
?date=2026-02-13
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "date": "2026-02-13",
    "summary": {
      "total_orders": 87,
      "total_revenue": 8450.00,
      "cash_revenue": 5200.00,
      "card_revenue": 3250.00,
      "average_order_value": 97.13,
      "voided_orders": 2
    },
    "revenue_by_hour": [
      {
        "hour": "08:00",
        "orders": 12,
        "revenue": 980.00
      }
    ],
    "top_items": [
      {
        "menu_item": "Cappuccino",
        "quantity_sold": 45,
        "revenue": 1350.00
      }
    ]
  }
}
```

---

### **GET /api/v1/reports/revenue-by-staff**

**Permissions:** MANAGER only

**Query Parameters:**
```
?date_from=2026-02-01
&date_to=2026-02-13
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "staff_performance": [
      {
        "staff": {
          "id": "uuid",
          "name": "Ahmed"
        },
        "orders_count": 156,
        "total_revenue": 15600.00,
        "average_order_value": 100.00
      }
    ]
  }
}
```

---

### **GET /api/v1/reports/cash-summary**

**Permissions:** MANAGER only

**Query Parameters:**
```
?session_id=uuid
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "session": {
      "id": "uuid",
      "opened_at": "2026-02-13T08:00:00Z",
      "closed_at": "2026-02-13T23:45:29Z"
    },
    "opening_balance": 500.00,
    "closing_balance": 2340.00,
    "movements": {
      "cash_in": 2100.00,
      "cash_out": 250.00,
      "adjustments": 0.00
    },
    "detailed_movements": [
      {
        "type": "CASH_OUT",
        "amount": -100.00,
        "reason": "Petty cash",
        "performed_by": "Manager Ahmed",
        "created_at": "2026-02-13T14:30:00Z"
      }
    ]
  }
}
```

---

### **POST /api/v1/reports/export**

**Permissions:** MANAGER only

**Request:**
```json
{
  "report_type": "daily_revenue",
  "format": "PDF",
  "date_from": "2026-02-01",
  "date_to": "2026-02-13"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "download_url": "https://cdn.yourpos.com/reports/abc123.pdf",
    "expires_at": "2026-02-14T23:45:29Z"
  }
}
```

**Supported Formats:** PDF, EXCEL

---

## 📡 REAL-TIME WEBSOCKET EVENTS

### Connection

```javascript
const ws = new WebSocket('wss://api.yourpos.com/ws');

// Authentication
ws.send(JSON.stringify({
  type: 'auth',
  token: 'jwt_access_token'
}));
```

### Event: `order_created`

```json
{
  "event": "order_created",
  "data": {
    "order": {
      "id": "uuid",
      "order_number": "CASA-CAFE123-20260213-042",
      "table": { "name": "T5" },
      "status": "CONFIRMED",
      "total_amount": 150.00
    }
  },
  "timestamp": "2026-02-13T23:45:29Z"
}
```

### Event: `order_status_updated`

```json
{
  "event": "order_status_updated",
  "data": {
    "order_id": "uuid",
    "old_status": "CONFIRMED",
    "new_status": "PREPARING"
  },
  "timestamp": "2026-02-13T23:45:29Z"
}
```

### Event: `order_paid`

```json
{
  "event": "order_paid",
  "data": {
    "order_id": "uuid",
    "payment_type": "CASH",
    "amount": 150.00
  },
  "timestamp": "2026-02-13T23:45:29Z"
}
```

### Event: `cash_session_closed`

```json
{
  "event": "cash_session_closed",
  "data": {
    "session_id": "uuid",
    "difference": -10.00
  },
  "timestamp": "2026-02-13T23:45:29Z"
}
```

### Event: `menu_item_availability_changed`

```json
{
  "event": "menu_item_availability_changed",
  "data": {
    "menu_item_id": "uuid",
    "is_available": false
  },
  "timestamp": "2026-02-13T23:45:29Z"
}
```

---

## 🔒 SECURITY ARCHITECTURE

### Middleware Stack

```
Request
  ↓
1. Rate Limiter (100 req/min per IP)
  ↓
2. CORS Validator
  ↓
3. JWT Authenticator
  ↓
4. Tenant Extractor (from JWT)
  ↓
5. Tenant Validator (X-Tenant-ID matches JWT)
  ↓
6. Role-Based Access Control (RBAC)
  ↓
7. Request Logger
  ↓
Controller
```

### Role Permission Matrix

| Endpoint | SUPER_ADMIN | MANAGER | STAFF |
|----------|-------------|---------|-------|
| **Auth** |
| POST /auth/login | ✅ | ✅ | ✅ |
| **Users** |
| GET /users | ✅ | ✅ | ❌ |
| POST /users | ❌ | ✅ | ❌ |
| PATCH /users/:id | ❌ | ✅ | ❌ |
| **Menu** |
| GET /menu/* | ✅ | ✅ | ✅ |
| POST /menu/* | ❌ | ✅ | ❌ |
| PATCH /menu/*/availability | ❌ | ✅ | ✅ |
| **Orders** |
| POST /orders | ❌ | ✅ | ✅ |
| GET /orders | ❌ | ✅ | ✅ |
| PATCH /orders/:id/status | ❌ | ✅ | ✅ |
| POST /orders/:id/void | ❌ | ✅ | ❌ |
| POST /orders/:id/reopen | ❌ | ✅ | ❌ |
| **Payments** |
| POST /orders/:id/pay | ❌ | ✅ | ❌ |
| **Cash Session** |
| POST /cash-session/open | ❌ | ✅ | ❌ |
| GET /cash-session/current | ❌ | ✅ | ✅ |
| POST /cash-session/close | ❌ | ✅ | ❌ |
| **Cash Movements** |
| POST /cash-movements | ❌ | ✅ | ❌ |
| **Reports** |
| GET /reports/* | ✅ | ✅ | ❌ |
| **Printing** |
| POST /print/* | ❌ | ✅ | ✅ |

### Rate Limiting Strategy

```
Global: 1000 req/min per IP
Auth endpoints: 10 req/min per IP
Payment endpoints: 20 req/min per tenant
```

### Security Headers

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

---

## ⚡ PERFORMANCE REQUIREMENTS

### Response Time Targets

| Endpoint Type | Target | Max |
|---------------|--------|-----|
| GET (single resource) | <50ms | 100ms |
| GET (list) | <100ms | 200ms |
| POST/PATCH | <150ms | 300ms |
| Reports | <500ms | 1000ms |

### Optimization Strategies

1. **Database Query Optimization**
   - Use prepared statements
   - Implement connection pooling
   - Index all FK columns

2. **Caching Strategy**
   - Redis for menu items (TTL: 5 min)
   - Redis for active cash session (TTL: 1 hour)
   - Cache invalidation on updates

3. **Pagination**
   - Default limit: 20
   - Max limit: 100
   - Cursor-based for large datasets

4. **Response Compression**
   - Gzip for responses >1KB

---

## 🧪 API TESTING REQUIREMENTS

### Test Coverage Targets

- **Unit Tests:** 90% coverage
- **Integration Tests:** All critical paths
- **Load Tests:** 100 concurrent users

### Critical Test Scenarios

1. **Idempotency**
   - Duplicate order creation with same Idempotency-Key
   - Expected: Return existing order (200 OK)

2. **Concurrency**
   - Simultaneous payment attempts on same order
   - Expected: One succeeds, others fail with 409 Conflict

3. **Transaction Rollback**
   - Payment fails mid-transaction
   - Expected: No partial state (order not marked paid, no cash movement)

4. **Rate Limiting**
   - Exceed 100 req/min
   - Expected: 429 Too Many Requests

---

## 📋 ERROR CODE REFERENCE

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_CREDENTIALS` | 401 | PIN or tenant incorrect |
| `UNAUTHORIZED` | 401 | Missing or invalid token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `ORDER_ALREADY_PAID` | 409 | Order already paid |
| `NO_ACTIVE_CASH_SESSION` | 400 | No open cash session |
| `DUPLICATE_ORDER` | 409 | Order number already exists |
| `INVALID_STATE_TRANSITION` | 400 | Invalid status change |
| `TENANT_INACTIVE` | 403 | Tenant account deactivated |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_SERVER_ERROR` | 500 | Unexpected server error |

---

## 🎯 DELIVERABLES REQUIRED

1. **Complete API Specification Document**
   - All endpoints with request/response examples
   - OpenAPI 3.0 specification (Swagger)

2. **Middleware Architecture Diagram**
   - Visual flow of request processing

3. **Role Permission Matrix**
   - Detailed access control table

4. **WebSocket Event Schema**
   - All real-time events documented

5. **Error Handling Guide**
   - All error codes with examples

6. **Performance Benchmarks**
   - Load testing results
   - Response time analysis

7. **Security Audit Report**
   - OWASP compliance checklist
   - Penetration testing results

---

## ✅ CRITICAL SUCCESS CRITERIA

The API MUST:

✅ Enforce strict tenant isolation at every endpoint  
✅ Validate JWT and tenant_id on all protected routes  
✅ Implement idempotency for all financial operations  
✅ Use SERIALIZABLE isolation for payment transactions  
✅ Provide real-time updates via WebSocket  
✅ Achieve <100ms response time for 95% of requests  
✅ Handle 100+ concurrent orders without degradation  
✅ Log all financial state changes to audit trail  
✅ Return consistent error format across all endpoints  
✅ Support API versioning for backward compatibility  

---

**END OF REST API ARCHITECTURE PROMPT**
