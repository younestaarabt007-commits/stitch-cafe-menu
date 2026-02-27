# 🏆 RESTAURANT LIGHT POS - COMPLETE SYSTEM SPECIFICATION
## Master Prompt Collection - Production-Grade Multi-Tenant SaaS

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#system-overview)
2. [Database Schema Design](#database-schema-design)
3. [REST API Architecture](#rest-api-architecture)
4. [UI/UX Design System](#uiux-design-system)
5. [Deployment Architecture](#deployment-architecture)
6. [Testing Strategy](#testing-strategy)

---

## 🎯 SYSTEM OVERVIEW

### Project Description

Build a **multi-tenant cloud-based Restaurant Light POS system** optimized for mid-sized restaurants in Morocco with:

- **Order management** (dine-in, takeaway, delivery)
- **Cash register control** (money in/out tracking)
- **Manual payment tracking** (cash + card)
- **Session-based daily closing**
- **Thermal printing** (receipt + kitchen ticket)
- **Real-time dashboard**
- **Strong audit logging**
- **Role-based access control**
- **Super admin control panel**

### Target Market

**Mid-sized restaurants in Morocco** requiring:
- Simple, fast order management
- Strict cash control
- No fiscal/tax automation
- No inventory management
- Stable internet connection

### Core Roles

| Role | Permissions | Key Actions |
|------|-------------|-------------|
| **Super Admin** | Platform-wide view | Activate tenants, view usage stats |
| **Manager** | Full restaurant access | Void orders, close sessions, manage staff |
| **Staff** | Order creation only | Create orders, update status, send to cashier |

### Non-Negotiable Rules

🚨 **Critical Constraints:**
- No hard delete of financial records
- All money movements logged
- All state transitions validated
- No modification of closed session data
- No modification of paid orders (except manager override)
- One active cash session per tenant
- ACID transactions for all financial operations

---

## 📊 HOW TO USE THESE PROMPTS

### Option 1: Sequential Implementation

Give prompts to your AI assistant in this order:

1. **Database Schema** → Get complete SQL DDL
2. **API Architecture** → Get endpoint specifications
3. **UI/UX Design** → Get design system + mockups
4. **Testing Strategy** → Get test suite structure
5. **Deployment** → Get infrastructure setup

### Option 2: Parallel Teams

Assign different prompts to different team members/AI sessions:

- **Backend Team:** Database + API prompts
- **Frontend Team:** UI/UX prompt
- **DevOps Team:** Deployment prompt
- **QA Team:** Testing prompt

### Option 3: Full System Request

Give all prompts together to a capable AI assistant with large context window.

---

## 🗄️ DATABASE SCHEMA DESIGN

**Full prompt available in:** `pos_database_schema_prompt.md`

### Key Highlights

**14 Production Tables:**
- `tenants` - Multi-tenant isolation
- `users` - PIN-based authentication
- `menu_categories`, `menu_items`, `menu_modifiers` - Menu system
- `tables` - Table management
- `orders`, `order_items`, `order_item_modifiers` - Order system
- `payments` - Payment tracking
- `cash_sessions`, `cash_movements` - Cash management
- `print_jobs` - Print history
- `audit_logs` - Complete audit trail

**Critical Features:**
- Row-Level Security (RLS)
- Composite indexes for performance
- ENUM types for all statuses
- Soft delete for financial records
- Unique constraints preventing duplicates
- Check constraints enforcing business rules

**Performance Targets:**
- <50ms for 95% of queries
- Support 100+ concurrent orders
- Optimized for date-range reports

---

## 🌐 REST API ARCHITECTURE

**Full prompt available in:** `pos_api_architecture_prompt.md`

### Key Highlights

**40+ RESTful Endpoints:**

**Authentication:**
- `POST /auth/login` - PIN-based login
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - Session invalidation

**Order Management:**
- `POST /orders` - Create order (idempotent)
- `GET /orders` - List orders (filtered)
- `PATCH /orders/:id/status` - Update status
- `POST /orders/:id/void` - Void order (manager)
- `POST /orders/:id/reopen` - Reopen paid order (manager)

**Payment Processing:**
- `POST /orders/:id/pay` - Process payment (SERIALIZABLE transaction)

**Cash Session:**
- `POST /cash-session/open` - Open session
- `GET /cash-session/current` - Current session status
- `POST /cash-session/close` - Close with reconciliation

**Reporting:**
- `GET /reports/daily` - Daily revenue
- `GET /reports/revenue-by-staff` - Staff performance
- `GET /reports/cash-summary` - Session summary

**Real-time Events (WebSocket):**
- `order_created`
- `order_status_updated`
- `order_paid`
- `cash_session_closed`

**Security Features:**
- JWT authentication (1-hour access, 7-day refresh)
- Rate limiting (100 req/min global)
- RBAC middleware
- Tenant isolation validation
- Idempotency headers

---

## 🎨 UI/UX DESIGN SYSTEM

**Full prompt available in:** `pos_uiux_design_prompt.md`

### Key Highlights

**6 Main Screens:**

1. **Manager Dashboard** (Desktop)
   - Real-time stats cards
   - Live orders table
   - Revenue charts
   - Quick actions

2. **Staff Order Screen** (Tablet)
   - Menu grid (3 columns)
   - Modifier modal
   - Current order panel
   - Touch-optimized (44x44px targets)

3. **Cashier Payment Interface** (Desktop)
   - Orders queue
   - Payment method selection
   - Large confirm button
   - Auto-print receipt

4. **Kitchen Display System** (Large screen)
   - Order cards grid
   - Color-coded by status
   - Timer with alerts
   - Auto-refresh

5. **Cash Session Management**
   - Open session modal
   - Close with reconciliation
   - Difference highlighting

6. **Reports Screen**
   - Date range picker
   - Interactive charts
   - Export to PDF/Excel

**Design System:**
- **Colors:** Blue primary, Green success, Amber warning
- **Typography:** Inter (UI), Roboto Mono (numbers), Cairo (Arabic)
- **Components:** Buttons, inputs, cards, badges, modals, tables
- **Accessibility:** WCAG 2.1 AA compliant

**Performance:**
- 60fps animations
- <30s order creation
- <15s payment processing

---

## 🚀 DEPLOYMENT ARCHITECTURE

**Full prompt available in:** `pos_deployment_prompt.md`

### Key Highlights

**Infrastructure:**
- **Containerization:** Docker multi-stage builds
- **Orchestration:** Kubernetes (3-10 pod auto-scaling)
- **Load Balancer:** NGINX Ingress
- **Database:** PostgreSQL 16 (primary + replica)
- **Cache:** Redis 7
- **WebSocket:** Separate service

**CI/CD Pipeline:**
- **GitHub Actions** workflow
- Automated testing (unit + integration)
- Docker image build & push
- Kubernetes rolling deployment
- Database migrations
- Zero-downtime deployments

**Monitoring:**
- **Prometheus** - Metrics collection
- **Grafana** - Dashboards
- **ELK Stack** - Centralized logging
- **Alerts** - Slack/Email notifications

**Key Metrics:**
- Request rate, response time, error rate
- CPU, memory, disk usage
- Database query performance
- Business metrics (orders/min, revenue)

**Backup Strategy:**
- Daily automated backups (2 AM)
- Retention: 7 days / 4 weeks / 12 months
- S3 storage
- Tested restore procedures

**Security:**
- Network policies
- Pod security policies
- Secrets management (External Secrets Operator)
- TLS 1.3 encryption
- Rate limiting

**SLA Targets:**
- 99.9% uptime
- <100ms API response time
- 1-hour RTO (Recovery Time Objective)
- 24-hour RPO (Recovery Point Objective)

---

## 🧪 TESTING STRATEGY

**Full prompt available in:** `pos_testing_strategy_prompt.md`

### Key Highlights

**Test Pyramid:**
- **Unit Tests:** 600+ tests (60% of total)
- **Integration Tests:** 200+ tests (30%)
- **E2E Tests:** 50+ tests (10%)

**Coverage Requirements:**
- Overall: 90%
- Critical modules: 95% (payment, cash, auth)
- Utility functions: 100%

**Testing Frameworks:**
- **Unit:** Jest
- **Integration:** Jest + Supertest + Testcontainers
- **E2E:** Playwright
- **Load:** k6
- **Security:** OWASP ZAP, Snyk

**Critical Test Scenarios:**

1. **Idempotency**
   - Duplicate order creation
   - Expected: Return existing order

2. **Concurrency**
   - Simultaneous payments on same order
   - Expected: One succeeds, others fail

3. **Transaction Rollback**
   - Payment fails mid-transaction
   - Expected: No partial state

4. **Load Testing**
   - 100 concurrent users
   - Target: <200ms p95 response time

**CI/CD Integration:**
- Pre-commit: Linting + changed unit tests
- Pre-push: Full unit + integration tests
- PR merge: All tests + coverage check + E2E

**Quality Gates:**
- ✅ All tests passing
- ✅ Coverage > 90%
- ✅ No critical vulnerabilities
- ✅ Code review approved

---

## 📦 COMPLETE DELIVERABLES CHECKLIST

### Database
- [ ] Complete SQL DDL script
- [ ] ER diagram
- [ ] Index strategy document
- [ ] Migration plan
- [ ] Seed data for development

### API
- [ ] OpenAPI 3.0 specification (Swagger)
- [ ] Endpoint documentation
- [ ] Middleware architecture diagram
- [ ] Role permission matrix
- [ ] WebSocket event schema
- [ ] Error code reference
- [ ] Postman collection

### UI/UX
- [ ] High-fidelity mockups (Figma)
- [ ] Component library
- [ ] Design system documentation
- [ ] Interactive prototype
- [ ] Responsive layouts
- [ ] Accessibility audit report

### Deployment
- [ ] Terraform/Helm charts
- [ ] Docker Compose (dev)
- [ ] Kubernetes manifests (prod)
- [ ] CI/CD workflows
- [ ] Monitoring dashboards (JSON)
- [ ] Alert rules
- [ ] Deployment runbook
- [ ] Disaster recovery procedures

### Testing
- [ ] Test suite (850+ tests)
- [ ] Test plan document
- [ ] Coverage reports
- [ ] Load test scripts
- [ ] Security scan results
- [ ] Testing guidelines

### Documentation
- [ ] System architecture document
- [ ] API documentation
- [ ] User manuals (Manager, Staff)
- [ ] Admin guide
- [ ] Troubleshooting guide
- [ ] FAQ

---

## 🎯 IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Weeks 1-2)
- Database schema implementation
- Core API endpoints (auth, users, menu)
- Basic UI components
- Development environment setup

### Phase 2: Core Features (Weeks 3-5)
- Order management system
- Payment processing
- Cash session management
- Staff order screen
- Manager dashboard

### Phase 3: Advanced Features (Weeks 6-7)
- Reporting module
- Printing system
- WebSocket real-time updates
- Kitchen display system

### Phase 4: Testing & QA (Week 8)
- Complete test suite
- Load testing
- Security testing
- Bug fixes

### Phase 5: Deployment (Week 9)
- Staging environment setup
- Production deployment
- Monitoring configuration
- User training

### Phase 6: Launch & Support (Week 10+)
- Production launch
- User feedback collection
- Performance optimization
- Feature enhancements

---

## 💡 BEST PRACTICES

### Development
- Follow clean architecture principles
- Write tests before code (TDD)
- Use TypeScript for type safety
- Implement proper error handling
- Log all critical operations

### Security
- Never trust client input
- Validate tenant_id on every request
- Use parameterized queries (prevent SQL injection)
- Rotate secrets regularly
- Implement rate limiting

### Performance
- Use database indexes wisely
- Implement caching (Redis)
- Optimize database queries
- Use connection pooling
- Compress API responses

### Monitoring
- Track business metrics
- Set up alerts for anomalies
- Monitor error rates
- Review logs regularly
- Conduct performance reviews

---

## 🚨 CRITICAL SUCCESS FACTORS

The system MUST achieve:

✅ **Reliability:** 99.9% uptime  
✅ **Performance:** <100ms API response time  
✅ **Security:** Zero data breaches, strict tenant isolation  
✅ **Accuracy:** 100% financial data integrity  
✅ **Usability:** <30s order creation, <15s payment  
✅ **Scalability:** Support 200+ tenants  
✅ **Maintainability:** 90%+ test coverage  
✅ **Auditability:** Complete transaction history  
✅ **Compliance:** GDPR/data protection ready  
✅ **Support:** <1 hour critical issue response  

---

## 📞 NEXT STEPS

### To Get Started:

1. **Choose your implementation approach:**
   - Full system build
   - Phased implementation
   - Specific module focus

2. **Select your AI assistant:**
   - Claude (Anthropic)
   - ChatGPT (OpenAI)
   - Gemini (Google)
   - Trae AI
   - Any capable coding assistant

3. **Provide the relevant prompt(s):**
   - Copy from individual prompt files
   - Or reference this master document

4. **Review and iterate:**
   - Validate generated code
   - Request modifications
   - Test thoroughly

### Individual Prompt Files:

All detailed prompts are available in separate files:

1. `pos_database_schema_prompt.md` - Complete database design
2. `pos_api_architecture_prompt.md` - Full API specification
3. `pos_uiux_design_prompt.md` - Design system & screens
4. `pos_deployment_prompt.md` - Infrastructure & DevOps
5. `pos_testing_strategy_prompt.md` - QA & testing

---

## 🏁 CONCLUSION

This comprehensive specification provides everything needed to build a **production-grade Restaurant Light POS system**.

Each prompt is:
- ✅ **Detailed** - No ambiguity
- ✅ **Actionable** - Ready for implementation
- ✅ **Complete** - All aspects covered
- ✅ **Professional** - Industry best practices
- ✅ **Tested** - Based on proven patterns

**You now have a serious blueprint for a serious product.**

Good luck with your implementation! 🚀

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-14  
**Total Pages:** 6 comprehensive prompts  
**Estimated Implementation Time:** 10-12 weeks  
**Recommended Team Size:** 4-6 developers  

---

**END OF MASTER SPECIFICATION**
