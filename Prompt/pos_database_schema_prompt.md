# 🗄️ DATABASE SCHEMA DESIGN PROMPT
## Restaurant Light POS - Multi-Tenant Cloud System

---

## 🎯 MISSION OBJECTIVE

Design a **production-grade PostgreSQL database schema** for a multi-tenant, cloud-based Restaurant Light POS system with enterprise-level data integrity, security, and performance optimization.

### Core Requirements
- **Multi-tenant SaaS** architecture with strict tenant isolation
- **ACID-compliant** transaction handling
- **Audit-ready** with complete traceability
- **High-performance** indexing strategy
- **Scalable** to handle 100+ concurrent orders
- **Zero data loss** tolerance for financial records

---

## 🏗️ ARCHITECTURAL PRINCIPLES

### 1. Multi-Tenancy Strategy
```
Strategy: Shared Database with Tenant Isolation
Method: tenant_id column on all business tables
Enforcement: Row-Level Security (RLS) + Application-level validation
```

### 2. Mandatory Column Standards

**Every business table MUST include:**
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
tenant_id       UUID NOT NULL REFERENCES tenants(id)
created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
```

**For soft-deletable tables, add:**
```sql
deleted_at      TIMESTAMP WITH TIME ZONE
```

### 3. Data Integrity Rules

| Rule | Implementation |
|------|----------------|
| **No Hard Deletes** | Financial records use soft delete only |
| **Immutable Records** | Closed sessions & paid orders cannot be modified |
| **Audit Trail** | All state changes logged to `audit_logs` |
| **Referential Integrity** | All FK constraints with `ON DELETE RESTRICT` |
| **Idempotency** | Unique constraints on critical operations |

### 4. Performance Standards

- **Index Coverage**: All FK columns indexed
- **Composite Indexes**: On high-frequency query patterns
- **Partitioning Ready**: Design for future date-based partitioning
- **Query Optimization**: Target <50ms for 95% of queries

---

## 📊 COMPLETE TABLE SPECIFICATIONS

### 🏢 TENANT MANAGEMENT

#### **Table: `tenants`**
```sql
CREATE TABLE tenants (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name                VARCHAR(255) NOT NULL,
    slug                VARCHAR(100) UNIQUE NOT NULL,
    city                VARCHAR(100) NOT NULL,
    address             TEXT,
    phone               VARCHAR(20),
    
    -- Subscription
    subscription_plan   VARCHAR(50) DEFAULT 'basic',
    plan_limits         JSONB DEFAULT '{}',
    
    -- Status
    is_active           BOOLEAN DEFAULT true,
    activated_at        TIMESTAMP WITH TIME ZONE,
    deactivated_at      TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_tenants_active ON tenants(is_active) WHERE is_active = true;
```

**Design Decisions:**
- `slug` for URL-friendly tenant identification
- `plan_limits` JSONB for flexible subscription constraints
- Partial index on `is_active` for faster active tenant queries

---

### 👥 USER & ACCESS MANAGEMENT

#### **Table: `users`**
```sql
CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'MANAGER', 'STAFF');

CREATE TABLE users (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID REFERENCES tenants(id) ON DELETE RESTRICT,
    
    -- Identity
    name                VARCHAR(255) NOT NULL,
    role                user_role NOT NULL,
    
    -- Authentication
    pin_hash            VARCHAR(255) NOT NULL,
    last_login_at       TIMESTAMP WITH TIME ZONE,
    
    -- Status
    is_active           BOOLEAN DEFAULT true,
    
    -- Metadata
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT unique_pin_per_tenant UNIQUE (tenant_id, pin_hash)
);

CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(tenant_id, is_active) WHERE is_active = true;
```

**Security Notes:**
- PIN stored as bcrypt hash (cost factor 12)
- Unique PIN per tenant enforced at DB level
- `SUPER_ADMIN` has NULL `tenant_id`

---

### 🍽️ MENU SYSTEM

#### **Table: `menu_categories`**
```sql
CREATE TABLE menu_categories (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    
    name                VARCHAR(255) NOT NULL,
    description         TEXT,
    display_order       INTEGER DEFAULT 0,
    
    is_active           BOOLEAN DEFAULT true,
    
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_menu_categories_tenant ON menu_categories(tenant_id);
CREATE INDEX idx_menu_categories_display ON menu_categories(tenant_id, display_order) 
    WHERE is_active = true;
```

#### **Table: `menu_items`**
```sql
CREATE TABLE menu_items (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    category_id         UUID NOT NULL REFERENCES menu_categories(id) ON DELETE RESTRICT,
    
    name                VARCHAR(255) NOT NULL,
    description         TEXT,
    base_price          NUMERIC(12, 2) NOT NULL CHECK (base_price >= 0),
    
    image_url           TEXT,
    
    is_available        BOOLEAN DEFAULT true,
    
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_menu_items_tenant ON menu_items(tenant_id);
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_available ON menu_items(tenant_id, is_available) 
    WHERE is_available = true;
```

#### **Table: `menu_modifiers`**
```sql
CREATE TABLE menu_modifiers (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    
    name                VARCHAR(255) NOT NULL,
    is_required         BOOLEAN DEFAULT false,
    
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_menu_modifiers_tenant ON menu_modifiers(tenant_id);
```

#### **Table: `menu_modifier_options`**
```sql
CREATE TABLE menu_modifier_options (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    modifier_id         UUID NOT NULL REFERENCES menu_modifiers(id) ON DELETE CASCADE,
    
    name                VARCHAR(255) NOT NULL,
    price_adjustment    NUMERIC(12, 2) DEFAULT 0.00,
    
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_modifier_options_modifier ON menu_modifier_options(modifier_id);
```

#### **Table: `menu_item_modifiers`** (Many-to-Many)
```sql
CREATE TABLE menu_item_modifiers (
    menu_item_id        UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
    modifier_id         UUID NOT NULL REFERENCES menu_modifiers(id) ON DELETE CASCADE,
    
    PRIMARY KEY (menu_item_id, modifier_id)
);

CREATE INDEX idx_item_modifiers_item ON menu_item_modifiers(menu_item_id);
CREATE INDEX idx_item_modifiers_modifier ON menu_item_modifiers(modifier_id);
```

---

### 🪑 TABLE MANAGEMENT

#### **Table: `tables`**
```sql
CREATE TABLE tables (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    
    name                VARCHAR(50) NOT NULL,
    capacity            INTEGER DEFAULT 4,
    
    is_active           BOOLEAN DEFAULT true,
    
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_table_name_per_tenant UNIQUE (tenant_id, name)
);

CREATE INDEX idx_tables_tenant ON tables(tenant_id);
CREATE INDEX idx_tables_active ON tables(tenant_id, is_active) WHERE is_active = true;
```

---

### 🧾 ORDER SYSTEM

#### **Table: `orders`**
```sql
CREATE TYPE order_type AS ENUM ('DINE_IN', 'TAKEAWAY', 'DELIVERY');
CREATE TYPE order_status AS ENUM (
    'DRAFT', 
    'CONFIRMED', 
    'PREPARING', 
    'READY', 
    'COMPLETED', 
    'PAID', 
    'VOIDED'
);

CREATE TABLE orders (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id               UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    
    -- Order Identity
    order_number            VARCHAR(50) NOT NULL,
    order_type              order_type NOT NULL DEFAULT 'DINE_IN',
    
    -- Relationships
    table_id                UUID REFERENCES tables(id) ON DELETE RESTRICT,
    staff_id                UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    cash_session_id         UUID REFERENCES cash_sessions(id) ON DELETE RESTRICT,
    
    -- Status
    status                  order_status NOT NULL DEFAULT 'DRAFT',
    
    -- Financial
    subtotal                NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total_amount            NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    
    -- Delivery Info (for DELIVERY type)
    customer_name           VARCHAR(255),
    customer_phone          VARCHAR(20),
    delivery_address        TEXT,
    
    -- Notes
    notes                   TEXT,
    
    -- Timestamps
    created_at              TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at              TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    confirmed_at            TIMESTAMP WITH TIME ZONE,
    paid_at                 TIMESTAMP WITH TIME ZONE,
    voided_at               TIMESTAMP WITH TIME ZONE,
    voided_by               UUID REFERENCES users(id),
    void_reason             TEXT,
    
    -- Constraints
    CONSTRAINT unique_order_number UNIQUE (tenant_id, order_number),
    CONSTRAINT check_delivery_info CHECK (
        order_type != 'DELIVERY' OR 
        (customer_name IS NOT NULL AND customer_phone IS NOT NULL)
    )
);

CREATE INDEX idx_orders_tenant ON orders(tenant_id);
CREATE INDEX idx_orders_status ON orders(tenant_id, status);
CREATE INDEX idx_orders_created ON orders(tenant_id, created_at DESC);
CREATE INDEX idx_orders_session ON orders(cash_session_id);
CREATE INDEX idx_orders_staff ON orders(staff_id);
CREATE INDEX idx_orders_table ON orders(table_id) WHERE table_id IS NOT NULL;

-- Composite index for dashboard queries
CREATE INDEX idx_orders_tenant_date_status ON orders(tenant_id, created_at DESC, status);
```

**Critical Design Decisions:**
- `order_number` format: `{CITY}-{RESTAURANT}-{YYYYMMDD}-{XXX}`
- Immutability enforced via application triggers after `PAID` status
- Void tracking with mandatory reason and user ID

#### **Table: `order_items`**
```sql
CREATE TABLE order_items (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id            UUID NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
    menu_item_id        UUID NOT NULL REFERENCES menu_items(id) ON DELETE RESTRICT,
    
    quantity            INTEGER NOT NULL CHECK (quantity > 0),
    unit_price          NUMERIC(12, 2) NOT NULL,
    total_price         NUMERIC(12, 2) NOT NULL,
    
    notes               TEXT,
    
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_menu_item ON order_items(menu_item_id);
```

#### **Table: `order_item_modifiers`**
```sql
CREATE TABLE order_item_modifiers (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_item_id           UUID NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
    modifier_option_id      UUID NOT NULL REFERENCES menu_modifier_options(id) ON DELETE RESTRICT,
    
    price_adjustment        NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    
    created_at              TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_order_item_mods_item ON order_item_modifiers(order_item_id);
```

---

### 💵 PAYMENT SYSTEM

#### **Table: `payments`**
```sql
CREATE TYPE payment_type AS ENUM ('CASH', 'CARD');

CREATE TABLE payments (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    order_id            UUID NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
    
    payment_type        payment_type NOT NULL,
    amount              NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    
    validated_by        UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT one_payment_per_order UNIQUE (order_id)
);

CREATE INDEX idx_payments_tenant ON payments(tenant_id);
CREATE INDEX idx_payments_type ON payments(tenant_id, payment_type);
CREATE INDEX idx_payments_created ON payments(tenant_id, created_at DESC);
CREATE INDEX idx_payments_order ON payments(order_id);
```

---

### 🏦 CASH MANAGEMENT SYSTEM

#### **Table: `cash_sessions`**
```sql
CREATE TYPE session_status AS ENUM ('OPEN', 'CLOSED');

CREATE TABLE cash_sessions (
    id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id                   UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    
    opened_by                   UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    closed_by                   UUID REFERENCES users(id) ON DELETE RESTRICT,
    
    opening_balance             NUMERIC(12, 2) NOT NULL CHECK (opening_balance >= 0),
    expected_closing_balance    NUMERIC(12, 2),
    actual_closing_balance      NUMERIC(12, 2),
    difference                  NUMERIC(12, 2),
    
    status                      session_status NOT NULL DEFAULT 'OPEN',
    
    opened_at                   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    closed_at                   TIMESTAMP WITH TIME ZONE,
    
    closing_notes               TEXT,
    
    created_at                  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at                  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT check_closing_data CHECK (
        status = 'OPEN' OR 
        (actual_closing_balance IS NOT NULL AND closed_at IS NOT NULL)
    )
);

CREATE INDEX idx_cash_sessions_tenant ON cash_sessions(tenant_id);
CREATE INDEX idx_cash_sessions_status ON cash_sessions(tenant_id, status);
CREATE UNIQUE INDEX idx_one_open_session_per_tenant ON cash_sessions(tenant_id) 
    WHERE status = 'OPEN';
```

**Critical Constraint:**
- `idx_one_open_session_per_tenant` ensures only ONE active session per tenant

#### **Table: `cash_movements`**
```sql
CREATE TYPE movement_type AS ENUM ('CASH_IN', 'CASH_OUT', 'ADJUSTMENT');

CREATE TABLE cash_movements (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    cash_session_id     UUID NOT NULL REFERENCES cash_sessions(id) ON DELETE RESTRICT,
    
    movement_type       movement_type NOT NULL,
    amount              NUMERIC(12, 2) NOT NULL CHECK (amount != 0),
    
    reason              VARCHAR(500) NOT NULL,
    notes               TEXT,
    
    performed_by        UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_cash_movements_tenant ON cash_movements(tenant_id);
CREATE INDEX idx_cash_movements_session ON cash_movements(cash_session_id);
CREATE INDEX idx_cash_movements_type ON cash_movements(tenant_id, movement_type);
CREATE INDEX idx_cash_movements_created ON cash_movements(created_at DESC);
```

---

### 🖨️ PRINTING SYSTEM

#### **Table: `print_jobs`**
```sql
CREATE TYPE print_type AS ENUM ('RECEIPT', 'KITCHEN_TICKET');

CREATE TABLE print_jobs (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    order_id            UUID NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
    
    print_type          print_type NOT NULL,
    
    printed_by          UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    is_reprint          BOOLEAN DEFAULT false,
    
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_print_jobs_tenant ON print_jobs(tenant_id);
CREATE INDEX idx_print_jobs_order ON print_jobs(order_id);
CREATE INDEX idx_print_jobs_created ON print_jobs(tenant_id, created_at DESC);
```

---

### 📊 AUDIT & LOGGING

#### **Table: `audit_logs`**
```sql
CREATE TYPE audit_action AS ENUM (
    'CREATE',
    'UPDATE',
    'DELETE',
    'VOID',
    'REOPEN',
    'CASH_ADJUSTMENT',
    'SESSION_CLOSE',
    'PRINT'
);

CREATE TABLE audit_logs (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID REFERENCES tenants(id) ON DELETE RESTRICT,
    user_id             UUID REFERENCES users(id) ON DELETE SET NULL,
    
    entity_type         VARCHAR(100) NOT NULL,
    entity_id           UUID NOT NULL,
    
    action_type         audit_action NOT NULL,
    
    old_value           JSONB,
    new_value           JSONB,
    
    ip_address          INET,
    user_agent          TEXT,
    
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_tenant ON audit_logs(tenant_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_action ON audit_logs(tenant_id, action_type);
```

---

## ⚡ PERFORMANCE OPTIMIZATION

### Composite Indexes for Common Queries

```sql
-- Dashboard: Today's revenue
CREATE INDEX idx_orders_daily_revenue ON orders(tenant_id, created_at, status, total_amount)
    WHERE status = 'PAID';

-- Reports: Revenue by payment type
CREATE INDEX idx_payments_revenue_analysis ON payments(tenant_id, payment_type, created_at, amount);

-- Staff performance
CREATE INDEX idx_orders_staff_performance ON orders(tenant_id, staff_id, created_at, total_amount)
    WHERE status = 'PAID';

-- Menu item popularity
CREATE INDEX idx_order_items_popularity ON order_items(menu_item_id, created_at);
```

### Database Functions

```sql
-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- (Repeat for all tables)
```

---

## 🔒 SECURITY IMPLEMENTATION

### Row-Level Security (RLS)

```sql
-- Enable RLS on all business tables
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_sessions ENABLE ROW LEVEL SECURITY;
-- (Continue for all tables)

-- Policy: Users can only access their tenant's data
CREATE POLICY tenant_isolation_policy ON orders
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

### Application-Level Enforcement

```
Every query MUST include:
WHERE tenant_id = :authenticated_tenant_id
```

---

## 🎯 TRANSACTION BOUNDARIES

### Critical Operations Requiring ACID Transactions

| Operation | Tables Involved | Isolation Level |
|-----------|----------------|-----------------|
| **Order Creation** | `orders`, `order_items`, `order_item_modifiers` | READ COMMITTED |
| **Payment Processing** | `orders`, `payments`, `cash_movements` | SERIALIZABLE |
| **Session Closing** | `cash_sessions`, `cash_movements` | SERIALIZABLE |
| **Order Void** | `orders`, `audit_logs` | READ COMMITTED |

---

## 📈 SCALABILITY CONSIDERATIONS

### Future Enhancements

1. **Partitioning Strategy**
   - Partition `orders` by `created_at` (monthly)
   - Partition `audit_logs` by `created_at` (quarterly)

2. **Archival Strategy**
   - Move closed sessions older than 1 year to archive tables
   - Maintain audit logs for 7 years (compliance)

3. **Read Replicas**
   - Route reporting queries to read replicas
   - Keep transactional writes on primary

4. **Caching Layer**
   - Cache menu items (Redis)
   - Cache active session per tenant

---

## ✅ VALIDATION CHECKLIST

Before finalizing the schema, verify:

- [ ] All FK constraints have `ON DELETE RESTRICT` (except cascading deletes)
- [ ] All money columns use `NUMERIC(12, 2)`
- [ ] All timestamps use `TIMESTAMP WITH TIME ZONE`
- [ ] All business tables have `tenant_id` indexed
- [ ] Unique constraints prevent duplicate critical records
- [ ] Partial indexes optimize active record queries
- [ ] Composite indexes cover high-frequency query patterns
- [ ] Audit logging captures all financial state changes
- [ ] Soft delete implemented for financial records
- [ ] Check constraints enforce business rules at DB level

---

## 🎯 DELIVERABLES REQUIRED

1. **Complete SQL DDL Script**
   - All table definitions
   - All indexes
   - All constraints
   - All ENUM types
   - All functions and triggers

2. **ER Diagram**
   - Visual representation of all relationships
   - Highlight critical FK relationships

3. **Index Strategy Document**
   - Justification for each index
   - Expected query patterns
   - Performance benchmarks

4. **Migration Plan**
   - Initial schema creation
   - Seed data for development
   - Rollback strategy

5. **Performance Testing Plan**
   - Load testing scenarios
   - Expected response times
   - Scalability limits

---

## 🚨 CRITICAL SUCCESS CRITERIA

The schema MUST:

✅ Prevent any possibility of cross-tenant data leakage  
✅ Ensure zero financial data loss  
✅ Support 100+ concurrent orders without degradation  
✅ Maintain complete audit trail for all money movements  
✅ Enforce business rules at database level  
✅ Enable sub-50ms query performance for 95% of operations  
✅ Support horizontal scaling via partitioning  
✅ Comply with ACID properties for all financial transactions  

---

**END OF DATABASE SCHEMA PROMPT**
