# 🧪 TESTING STRATEGY PROMPT
## Restaurant Light POS - Comprehensive Quality Assurance

---

## 🎯 MISSION OBJECTIVE

Design a **complete testing strategy** for a multi-tenant Restaurant Light POS with:

- **Unit tests** (90% code coverage)
- **Integration tests** (all critical paths)
- **End-to-end tests** (user workflows)
- **Load/Performance tests** (100+ concurrent users)
- **Security tests** (penetration testing)
- **Test automation** (CI/CD integration)
- **Quality gates** (automated checks)

---

## 🏗️ TESTING PYRAMID

```
                    ┌─────────────┐
                    │   E2E Tests │  (10%)
                    │   ~50 tests │
                    └─────────────┘
                ┌───────────────────┐
                │ Integration Tests │  (30%)
                │    ~200 tests     │
                └───────────────────┘
        ┌─────────────────────────────┐
        │       Unit Tests            │  (60%)
        │       ~600 tests            │
        └─────────────────────────────┘
```

---

## 🔬 UNIT TESTING

### Framework & Tools

**Backend (Node.js):**
- **Test Framework:** Jest
- **Assertion Library:** Jest (built-in)
- **Mocking:** Jest mocks
- **Coverage:** Istanbul (built into Jest)

**Frontend (React/Vue):**
- **Test Framework:** Vitest
- **Component Testing:** React Testing Library / Vue Test Utils
- **DOM Testing:** @testing-library/dom

### Coverage Requirements

**Minimum Coverage Targets:**
- **Overall:** 90%
- **Critical modules:** 95%
  - Payment processing
  - Cash session management
  - Order creation
  - Authentication
- **Utility functions:** 100%

### Unit Test Examples

#### Test: Order Total Calculation

```javascript
// order.service.test.js
describe('OrderService', () => {
  describe('calculateOrderTotal', () => {
    it('should calculate total with base prices only', () => {
      const items = [
        { quantity: 2, unit_price: 25.00, modifiers: [] },
        { quantity: 1, unit_price: 15.00, modifiers: [] }
      ];
      
      const total = OrderService.calculateOrderTotal(items);
      
      expect(total).toBe(65.00);
    });

    it('should include modifier price adjustments', () => {
      const items = [
        { 
          quantity: 2, 
          unit_price: 25.00, 
          modifiers: [
            { price_adjustment: 5.00 }
          ]
        }
      ];
      
      const total = OrderService.calculateOrderTotal(items);
      
      expect(total).toBe(60.00); // (25 + 5) * 2
    });

    it('should handle empty order', () => {
      const total = OrderService.calculateOrderTotal([]);
      expect(total).toBe(0.00);
    });

    it('should throw error for negative prices', () => {
      const items = [
        { quantity: 1, unit_price: -10.00, modifiers: [] }
      ];
      
      expect(() => {
        OrderService.calculateOrderTotal(items);
      }).toThrow('Invalid price');
    });
  });
});
```

#### Test: Cash Session Validation

```javascript
// cash-session.service.test.js
describe('CashSessionService', () => {
  describe('openSession', () => {
    it('should create new session with valid opening balance', async () => {
      const mockRepo = {
        findActiveSession: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 'uuid', status: 'OPEN' })
      };
      
      const service = new CashSessionService(mockRepo);
      const session = await service.openSession('tenant_id', 500.00, 'user_id');
      
      expect(session.status).toBe('OPEN');
      expect(mockRepo.create).toHaveBeenCalledWith({
        tenant_id: 'tenant_id',
        opening_balance: 500.00,
        opened_by: 'user_id'
      });
    });

    it('should throw error if session already open', async () => {
      const mockRepo = {
        findActiveSession: jest.fn().mockResolvedValue({ id: 'existing' })
      };
      
      const service = new CashSessionService(mockRepo);
      
      await expect(
        service.openSession('tenant_id', 500.00, 'user_id')
      ).rejects.toThrow('Active session already exists');
    });

    it('should throw error for negative opening balance', async () => {
      const service = new CashSessionService({});
      
      await expect(
        service.openSession('tenant_id', -100.00, 'user_id')
      ).rejects.toThrow('Opening balance must be non-negative');
    });
  });
});
```

#### Test: JWT Authentication

```javascript
// auth.service.test.js
describe('AuthService', () => {
  describe('verifyToken', () => {
    it('should verify valid JWT token', () => {
      const token = AuthService.generateToken({
        user_id: 'uuid',
        tenant_id: 'tenant_uuid',
        role: 'STAFF'
      });
      
      const payload = AuthService.verifyToken(token);
      
      expect(payload.user_id).toBe('uuid');
      expect(payload.role).toBe('STAFF');
    });

    it('should throw error for expired token', () => {
      const expiredToken = jwt.sign(
        { user_id: 'uuid' },
        process.env.JWT_SECRET,
        { expiresIn: '-1h' }
      );
      
      expect(() => {
        AuthService.verifyToken(expiredToken);
      }).toThrow('Token expired');
    });

    it('should throw error for invalid signature', () => {
      const token = jwt.sign(
        { user_id: 'uuid' },
        'wrong_secret'
      );
      
      expect(() => {
        AuthService.verifyToken(token);
      }).toThrow('Invalid token');
    });
  });
});
```

---

## 🔗 INTEGRATION TESTING

### Framework & Tools

- **Test Framework:** Jest
- **HTTP Testing:** Supertest
- **Database:** Test database (separate from dev)
- **Test Containers:** Testcontainers (for PostgreSQL, Redis)

### Integration Test Scope

**Test database interactions:**
- Repository layer
- Transaction handling
- Constraint validation

**Test API endpoints:**
- Request/response flow
- Middleware execution
- Error handling

### Integration Test Examples

#### Test: Order Creation API

```javascript
// order.integration.test.js
describe('POST /api/v1/orders', () => {
  let app;
  let db;
  let authToken;
  
  beforeAll(async () => {
    db = await setupTestDatabase();
    app = createApp(db);
    authToken = await createTestUser(db, 'STAFF');
  });
  
  afterAll(async () => {
    await db.close();
  });
  
  beforeEach(async () => {
    await db.query('TRUNCATE orders, order_items CASCADE');
  });

  it('should create order with items and modifiers', async () => {
    const response = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        order_type: 'DINE_IN',
        table_id: 'table_uuid',
        items: [
          {
            menu_item_id: 'item_uuid',
            quantity: 2,
            modifiers: [
              { modifier_option_id: 'mod_uuid' }
            ]
          }
        ]
      });
    
    expect(response.status).toBe(201);
    expect(response.body.data.order_number).toMatch(/CASA-CAFE-\d{8}-\d{3}/);
    expect(response.body.data.items).toHaveLength(1);
    
    // Verify database state
    const order = await db.query(
      'SELECT * FROM orders WHERE id = $1',
      [response.body.data.id]
    );
    expect(order.rows[0].status).toBe('DRAFT');
  });

  it('should enforce idempotency with same key', async () => {
    const idempotencyKey = 'unique_key_123';
    
    const response1 = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Idempotency-Key', idempotencyKey)
      .send({ /* order data */ });
    
    const response2 = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Idempotency-Key', idempotencyKey)
      .send({ /* same order data */ });
    
    expect(response1.status).toBe(201);
    expect(response2.status).toBe(200);
    expect(response1.body.data.id).toBe(response2.body.data.id);
  });

  it('should reject order without active cash session', async () => {
    // Close all sessions
    await db.query('UPDATE cash_sessions SET status = $1', ['CLOSED']);
    
    const response = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ /* order data */ });
    
    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('NO_ACTIVE_CASH_SESSION');
  });
});
```

#### Test: Payment Transaction

```javascript
// payment.integration.test.js
describe('POST /api/v1/orders/:id/pay', () => {
  it('should process payment atomically', async () => {
    // Create order
    const order = await createTestOrder(db, { total: 100.00 });
    
    // Open cash session
    const session = await createTestCashSession(db);
    
    const response = await request(app)
      .post(`/api/v1/orders/${order.id}/pay`)
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        payment_type: 'CASH',
        amount: 100.00
      });
    
    expect(response.status).toBe(200);
    
    // Verify order updated
    const updatedOrder = await db.query(
      'SELECT status, paid_at FROM orders WHERE id = $1',
      [order.id]
    );
    expect(updatedOrder.rows[0].status).toBe('PAID');
    expect(updatedOrder.rows[0].paid_at).not.toBeNull();
    
    // Verify payment created
    const payment = await db.query(
      'SELECT * FROM payments WHERE order_id = $1',
      [order.id]
    );
    expect(payment.rows).toHaveLength(1);
    expect(payment.rows[0].amount).toBe('100.00');
    
    // Verify cash movement created
    const movement = await db.query(
      'SELECT * FROM cash_movements WHERE cash_session_id = $1 AND movement_type = $2',
      [session.id, 'CASH_IN']
    );
    expect(movement.rows).toHaveLength(1);
    expect(movement.rows[0].amount).toBe('100.00');
  });

  it('should rollback on payment failure', async () => {
    const order = await createTestOrder(db);
    
    // Simulate database error during payment
    jest.spyOn(db, 'query').mockRejectedValueOnce(new Error('DB Error'));
    
    const response = await request(app)
      .post(`/api/v1/orders/${order.id}/pay`)
      .set('Authorization', `Bearer ${managerToken}`)
      .send({ payment_type: 'CASH', amount: 100.00 });
    
    expect(response.status).toBe(500);
    
    // Verify order NOT updated
    const orderCheck = await db.query(
      'SELECT status FROM orders WHERE id = $1',
      [order.id]
    );
    expect(orderCheck.rows[0].status).not.toBe('PAID');
    
    // Verify NO payment created
    const paymentCheck = await db.query(
      'SELECT * FROM payments WHERE order_id = $1',
      [order.id]
    );
    expect(paymentCheck.rows).toHaveLength(0);
  });
});
```

---

## 🎭 END-TO-END TESTING

### Framework & Tools

- **E2E Framework:** Playwright
- **Browser:** Chromium, Firefox, WebKit
- **Test Environment:** Staging environment

### E2E Test Scenarios

#### Test: Complete Order Flow

```javascript
// order-flow.e2e.test.js
import { test, expect } from '@playwright/test';

test.describe('Complete Order Flow', () => {
  test('staff creates order and manager processes payment', async ({ page, context }) => {
    // Login as staff
    await page.goto('http://localhost:3000/login');
    await page.fill('[data-testid="pin-input"]', '1234');
    await page.click('[data-testid="login-button"]');
    
    // Wait for dashboard
    await expect(page).toHaveURL('/staff/orders');
    
    // Select table
    await page.selectOption('[data-testid="table-selector"]', 'T5');
    
    // Add item to order
    await page.click('[data-testid="menu-item-cappuccino"]');
    
    // Select modifiers
    await page.click('[data-testid="modifier-size-large"]');
    await page.click('[data-testid="add-to-order"]');
    
    // Verify order panel
    await expect(page.locator('[data-testid="order-total"]')).toHaveText('30.00 MAD');
    
    // Send to cashier
    await page.click('[data-testid="send-to-cashier"]');
    
    // Verify success notification
    await expect(page.locator('[data-testid="toast-success"]')).toBeVisible();
    
    // Open new page as manager
    const managerPage = await context.newPage();
    await managerPage.goto('http://localhost:3000/login');
    await managerPage.fill('[data-testid="pin-input"]', '9999');
    await managerPage.click('[data-testid="login-button"]');
    
    // Navigate to cashier
    await managerPage.click('[data-testid="nav-cashier"]');
    
    // Find order in queue
    const orderCard = managerPage.locator('[data-testid^="order-card-"]').first();
    await orderCard.click('[data-testid="process-payment"]');
    
    // Select payment method
    await managerPage.click('[data-testid="payment-method-cash"]');
    
    // Confirm payment
    await managerPage.click('[data-testid="confirm-payment"]');
    
    // Verify success
    await expect(managerPage.locator('[data-testid="toast-success"]')).toContainText('Payment processed');
    
    // Verify order removed from queue
    await expect(orderCard).not.toBeVisible();
  });
});
```

#### Test: Cash Session Lifecycle

```javascript
// cash-session.e2e.test.js
test('manager opens and closes cash session', async ({ page }) => {
  await loginAsManager(page);
  
  // Open session
  await page.click('[data-testid="open-session-button"]');
  await page.fill('[data-testid="opening-balance"]', '500');
  await page.click('[data-testid="confirm-open-session"]');
  
  // Verify session indicator
  await expect(page.locator('[data-testid="active-session-badge"]')).toBeVisible();
  
  // Simulate some orders (create and pay)
  // ... (order creation steps)
  
  // Close session
  await page.click('[data-testid="close-session-button"]');
  
  // Enter counted amount
  await page.fill('[data-testid="actual-balance"]', '2340');
  
  // Verify difference calculation
  await expect(page.locator('[data-testid="session-difference"]')).toHaveText('-10.00 MAD');
  
  // Add notes
  await page.fill('[data-testid="closing-notes"]', 'Small change shortage');
  
  // Confirm close
  await page.click('[data-testid="confirm-close-session"]');
  
  // Verify session closed
  await expect(page.locator('[data-testid="active-session-badge"]')).not.toBeVisible();
});
```

---

## ⚡ LOAD & PERFORMANCE TESTING

### Framework & Tools

- **Load Testing:** k6
- **Metrics Collection:** InfluxDB
- **Visualization:** Grafana

### Load Test Scenarios

#### Test: Peak Hour Simulation

```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 50 },   // Ramp up to 50 users
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<200', 'p(99)<500'], // 95% < 200ms, 99% < 500ms
    http_req_failed: ['rate<0.01'],                 // Error rate < 1%
  },
};

export default function () {
  const BASE_URL = 'https://api.yourpos.com/api/v1';
  
  // Login
  const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    pin: '1234',
    tenant_slug: 'test-tenant'
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
  
  check(loginRes, {
    'login successful': (r) => r.status === 200,
    'token received': (r) => r.json('data.access_token') !== '',
  });
  
  const token = loginRes.json('data.access_token');
  
  sleep(1);
  
  // Create order
  const orderRes = http.post(`${BASE_URL}/orders`, JSON.stringify({
    order_type: 'DINE_IN',
    table_id: 'table_uuid',
    items: [
      { menu_item_id: 'item_uuid', quantity: 2 }
    ]
  }), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  check(orderRes, {
    'order created': (r) => r.status === 201,
    'response time OK': (r) => r.timings.duration < 200,
  });
  
  sleep(2);
}
```

#### Test: Concurrent Payment Processing

```javascript
// concurrent-payments.js
export const options = {
  scenarios: {
    concurrent_payments: {
      executor: 'constant-vus',
      vus: 50,
      duration: '1m',
    },
  },
};

export default function () {
  // Create order
  const order = createOrder();
  
  // Attempt payment
  const paymentRes = http.post(
    `${BASE_URL}/orders/${order.id}/pay`,
    JSON.stringify({ payment_type: 'CASH', amount: 100.00 }),
    { headers: authHeaders }
  );
  
  check(paymentRes, {
    'payment processed': (r) => r.status === 200,
    'no race condition': (r) => !r.body.includes('already paid'),
  });
}
```

---

## 🔒 SECURITY TESTING

### Framework & Tools

- **SAST:** SonarQube
- **DAST:** OWASP ZAP
- **Dependency Scanning:** Snyk
- **Penetration Testing:** Manual + Burp Suite

### Security Test Cases

#### Test: SQL Injection Prevention

```javascript
// security.test.js
describe('SQL Injection Prevention', () => {
  it('should sanitize user input in search queries', async () => {
    const maliciousInput = "'; DROP TABLE orders; --";
    
    const response = await request(app)
      .get('/api/v1/menu/items')
      .query({ search: maliciousInput })
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    
    // Verify table still exists
    const tableCheck = await db.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'orders')"
    );
    expect(tableCheck.rows[0].exists).toBe(true);
  });
});
```

#### Test: Authentication Bypass

```javascript
describe('Authentication Security', () => {
  it('should reject requests without token', async () => {
    const response = await request(app)
      .get('/api/v1/orders');
    
    expect(response.status).toBe(401);
  });

  it('should reject expired tokens', async () => {
    const expiredToken = generateExpiredToken();
    
    const response = await request(app)
      .get('/api/v1/orders')
      .set('Authorization', `Bearer ${expiredToken}`);
    
    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('TOKEN_EXPIRED');
  });

  it('should prevent tenant isolation bypass', async () => {
    const tenant1Token = await createUserToken('tenant_1');
    const tenant2Order = await createOrder('tenant_2');
    
    const response = await request(app)
      .get(`/api/v1/orders/${tenant2Order.id}`)
      .set('Authorization', `Bearer ${tenant1Token}`);
    
    expect(response.status).toBe(404); // Not found (not 403 to avoid info leak)
  });
});
```

#### Test: Rate Limiting

```javascript
describe('Rate Limiting', () => {
  it('should enforce rate limits on login endpoint', async () => {
    const requests = [];
    
    // Make 15 requests (limit is 10/min)
    for (let i = 0; i < 15; i++) {
      requests.push(
        request(app)
          .post('/api/v1/auth/login')
          .send({ pin: '1234', tenant_slug: 'test' })
      );
    }
    
    const responses = await Promise.all(requests);
    const rateLimited = responses.filter(r => r.status === 429);
    
    expect(rateLimited.length).toBeGreaterThan(0);
  });
});
```

---

## 🤖 TEST AUTOMATION

### CI/CD Integration

**GitHub Actions Workflow:**

```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  integration-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
      redis:
        image: redis:7
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      
      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/test

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

---

## 📊 TEST REPORTING

### Coverage Report

**Generate HTML coverage report:**

```bash
npm run test:coverage
```

**Coverage thresholds (jest.config.js):**

```javascript
module.exports = {
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90
    },
    './src/services/payment.service.js': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  }
};
```

### Test Execution Dashboard

**Metrics to track:**
- Total tests: 850
- Pass rate: 99.5%
- Average execution time: 2m 30s
- Flaky tests: < 1%
- Coverage: 92%

---

## ✅ QUALITY GATES

### Pre-Commit Checks

```bash
# .husky/pre-commit
npm run lint
npm run test:unit:changed
```

### Pre-Push Checks

```bash
# .husky/pre-push
npm run test:unit
npm run test:integration
```

### PR Merge Requirements

- [ ] All tests passing
- [ ] Coverage > 90%
- [ ] No critical security vulnerabilities
- [ ] Code review approved
- [ ] E2E tests passing on staging

---

## 🎯 DELIVERABLES REQUIRED

1. **Test Suite**
   - 600+ unit tests
   - 200+ integration tests
   - 50+ E2E tests
   - Load test scripts

2. **Test Documentation**
   - Test plan document
   - Test case specifications
   - Testing guidelines

3. **CI/CD Configuration**
   - GitHub Actions workflows
   - Quality gate definitions

4. **Test Reports**
   - Coverage reports
   - Performance benchmarks
   - Security scan results

---

## 🚨 CRITICAL SUCCESS CRITERIA

The testing strategy MUST:

✅ Achieve 90%+ code coverage  
✅ Execute full test suite in < 5 minutes  
✅ Catch 95%+ of bugs before production  
✅ Support parallel test execution  
✅ Provide clear failure diagnostics  
✅ Integrate seamlessly with CI/CD  
✅ Test all critical user workflows  
✅ Validate security vulnerabilities  
✅ Simulate production load conditions  
✅ Maintain < 1% flaky test rate  

---

**END OF TESTING STRATEGY PROMPT**
