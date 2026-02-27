# 🚀 DEPLOYMENT ARCHITECTURE PROMPT
## Restaurant Light POS - Production Infrastructure & DevOps

---

## 🎯 MISSION OBJECTIVE

Design a **production-ready deployment architecture** for a multi-tenant Restaurant Light POS with:

- **Containerized microservices** (Docker)
- **Orchestration** (Kubernetes)
- **CI/CD automation** (GitHub Actions)
- **Monitoring & logging** (Prometheus, Grafana, ELK)
- **High availability** (99.9% uptime)
- **Auto-scaling** based on load
- **Disaster recovery** plan
- **Security hardening**

---

## 🏗️ INFRASTRUCTURE ARCHITECTURE

### System Components

```
┌─────────────────────────────────────────────────────┐
│                   LOAD BALANCER                     │
│              (NGINX / AWS ALB)                      │
└─────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼──────┐
│   API Server │ │  API Server │ │ API Server │
│   (Node.js)  │ │  (Node.js)  │ │ (Node.js)  │
└───────┬──────┘ └──────┬──────┘ └─────┬──────┘
        │               │               │
        └───────────────┼───────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼──────┐
│  PostgreSQL  │ │    Redis    │ │ WebSocket  │
│   Primary    │ │   Cache     │ │   Server   │
└───────┬──────┘ └─────────────┘ └────────────┘
        │
┌───────▼──────┐
│  PostgreSQL  │
│   Replica    │
└──────────────┘
```

---

## 🐳 DOCKER CONTAINERIZATION

### Dockerfile - API Server

```dockerfile
# Multi-stage build for optimization
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript (if applicable)
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built app from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node healthcheck.js || exit 1

CMD ["node", "dist/server.js"]
```

### Dockerfile - WebSocket Server

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 8080

CMD ["node", "websocket-server.js"]
```

### docker-compose.yml (Development)

```yaml
version: '3.8'

services:
  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@db:5432/pos_dev
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db
      - redis
    volumes:
      - ./api:/app
      - /app/node_modules

  websocket:
    build:
      context: ./websocket
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=pos_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - api
      - websocket

volumes:
  postgres_data:
  redis_data:
```

---

## ☸️ KUBERNETES DEPLOYMENT

### Namespace

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: restaurant-pos
```

### ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: pos-config
  namespace: restaurant-pos
data:
  NODE_ENV: "production"
  LOG_LEVEL: "info"
  PORT: "3000"
```

### Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: pos-secrets
  namespace: restaurant-pos
type: Opaque
data:
  DATABASE_URL: <base64-encoded>
  JWT_SECRET: <base64-encoded>
  REDIS_URL: <base64-encoded>
```

### Deployment - API Server

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pos-api
  namespace: restaurant-pos
spec:
  replicas: 3
  selector:
    matchLabels:
      app: pos-api
  template:
    metadata:
      labels:
        app: pos-api
    spec:
      containers:
      - name: api
        image: yourregistry/pos-api:latest
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: pos-config
        - secretRef:
            name: pos-secrets
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

### Service - API

```yaml
apiVersion: v1
kind: Service
metadata:
  name: pos-api-service
  namespace: restaurant-pos
spec:
  selector:
    app: pos-api
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP
```

### Horizontal Pod Autoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: pos-api-hpa
  namespace: restaurant-pos
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: pos-api
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### Ingress (NGINX)

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: pos-ingress
  namespace: restaurant-pos
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - api.yourpos.com
    secretName: pos-tls-secret
  rules:
  - host: api.yourpos.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: pos-api-service
            port:
              number: 80
      - path: /ws
        pathType: Prefix
        backend:
          service:
            name: pos-websocket-service
            port:
              number: 8080
```

---

## 🗄️ DATABASE DEPLOYMENT

### PostgreSQL StatefulSet

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: restaurant-pos
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:16-alpine
        ports:
        - containerPort: 5432
        env:
        - name: POSTGRES_DB
          value: pos_production
        - name: POSTGRES_USER
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: username
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: password
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
  volumeClaimTemplates:
  - metadata:
      name: postgres-storage
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 50Gi
```

### Redis Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  namespace: restaurant-pos
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

---

## 🔄 CI/CD PIPELINE

### GitHub Actions Workflow

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm test
      
      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Login to Container Registry
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Build and push API image
        uses: docker/build-push-action@v4
        with:
          context: ./api
          push: true
          tags: |
            ghcr.io/${{ github.repository }}/api:latest
            ghcr.io/${{ github.repository }}/api:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup kubectl
        uses: azure/setup-kubectl@v3
      
      - name: Configure kubectl
        run: |
          echo "${{ secrets.KUBE_CONFIG }}" | base64 -d > kubeconfig
          export KUBECONFIG=kubeconfig
      
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/pos-api \
            api=ghcr.io/${{ github.repository }}/api:${{ github.sha }} \
            -n restaurant-pos
          
          kubectl rollout status deployment/pos-api -n restaurant-pos
      
      - name: Run database migrations
        run: |
          kubectl run migration-job \
            --image=ghcr.io/${{ github.repository }}/api:${{ github.sha }} \
            --restart=Never \
            --command -- npm run migrate:up
```

---

## 📊 MONITORING & LOGGING

### Prometheus Configuration

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: monitoring
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    
    scrape_configs:
      - job_name: 'pos-api'
        kubernetes_sd_configs:
          - role: pod
            namespaces:
              names:
                - restaurant-pos
        relabel_configs:
          - source_labels: [__meta_kubernetes_pod_label_app]
            action: keep
            regex: pos-api
```

### Grafana Dashboard Metrics

**Key Metrics to Monitor:**

1. **Application Metrics**
   - Request rate (req/sec)
   - Response time (p50, p95, p99)
   - Error rate (%)
   - Active connections

2. **Business Metrics**
   - Orders created per minute
   - Payments processed per minute
   - Active cash sessions
   - Failed payment attempts

3. **Infrastructure Metrics**
   - CPU usage (%)
   - Memory usage (%)
   - Disk I/O
   - Network throughput

4. **Database Metrics**
   - Query execution time
   - Connection pool usage
   - Slow queries (> 100ms)
   - Deadlocks

### ELK Stack (Logging)

**Filebeat Configuration:**

```yaml
filebeat.inputs:
- type: container
  paths:
    - '/var/lib/docker/containers/*/*.log'
  processors:
    - add_kubernetes_metadata:
        host: ${NODE_NAME}
        matchers:
        - logs_path:
            logs_path: "/var/lib/docker/containers/"

output.elasticsearch:
  hosts: ["elasticsearch:9200"]
  index: "pos-logs-%{+yyyy.MM.dd}"
```

**Log Structure (JSON):**

```json
{
  "timestamp": "2026-02-13T23:54:35Z",
  "level": "info",
  "service": "pos-api",
  "tenant_id": "uuid",
  "user_id": "uuid",
  "request_id": "req_abc123",
  "method": "POST",
  "path": "/api/v1/orders",
  "status": 201,
  "duration_ms": 45,
  "message": "Order created successfully"
}
```

---

## 🔒 SECURITY HARDENING

### Network Policies

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: pos-api-network-policy
  namespace: restaurant-pos
spec:
  podSelector:
    matchLabels:
      app: pos-api
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: nginx-ingress
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432
  - to:
    - podSelector:
        matchLabels:
          app: redis
    ports:
    - protocol: TCP
      port: 6379
```

### Pod Security Policy

```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted-psp
spec:
  privileged: false
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  runAsUser:
    rule: MustRunAsNonRoot
  seLinux:
    rule: RunAsAny
  fsGroup:
    rule: RunAsAny
  volumes:
    - 'configMap'
    - 'emptyDir'
    - 'secret'
```

### Secrets Management

**Use External Secrets Operator:**

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: pos-secrets
  namespace: restaurant-pos
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: SecretStore
  target:
    name: pos-secrets
  data:
  - secretKey: DATABASE_URL
    remoteRef:
      key: prod/pos/database-url
  - secretKey: JWT_SECRET
    remoteRef:
      key: prod/pos/jwt-secret
```

---

## 💾 BACKUP & DISASTER RECOVERY

### Database Backup Strategy

**Automated Daily Backups:**

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: postgres-backup
  namespace: restaurant-pos
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: postgres:16-alpine
            command:
            - /bin/sh
            - -c
            - |
              pg_dump $DATABASE_URL | gzip > /backup/pos-$(date +%Y%m%d).sql.gz
              aws s3 cp /backup/pos-$(date +%Y%m%d).sql.gz s3://pos-backups/
            env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: postgres-secret
                  key: url
            volumeMounts:
            - name: backup-storage
              mountPath: /backup
          restartPolicy: OnFailure
          volumes:
          - name: backup-storage
            emptyDir: {}
```

**Retention Policy:**
- Daily backups: 7 days
- Weekly backups: 4 weeks
- Monthly backups: 12 months

### Disaster Recovery Plan

**RTO (Recovery Time Objective):** 1 hour  
**RPO (Recovery Point Objective):** 24 hours

**Recovery Steps:**

1. **Database Restore**
   ```bash
   # Download latest backup
   aws s3 cp s3://pos-backups/pos-20260213.sql.gz .
   
   # Restore to new database
   gunzip -c pos-20260213.sql.gz | psql $DATABASE_URL
   ```

2. **Application Deployment**
   ```bash
   # Deploy from last known good image
   kubectl set image deployment/pos-api \
     api=ghcr.io/yourorg/pos-api:v1.2.3
   ```

3. **Verification**
   - Health checks pass
   - Database connectivity confirmed
   - Sample transactions successful

---

## 📈 SCALABILITY PLANNING

### Horizontal Scaling Triggers

**Auto-scale when:**
- CPU > 70% for 5 minutes
- Memory > 80% for 5 minutes
- Request queue > 100 for 2 minutes

### Vertical Scaling Recommendations

**Current Resources:**
- API Pod: 256Mi RAM, 250m CPU

**Scale to (per 100 tenants):**
- API Pod: 512Mi RAM, 500m CPU
- Database: +10Gi storage, +1 CPU core

### Database Scaling Strategy

**Phase 1 (0-50 tenants):**
- Single PostgreSQL instance
- 2 CPU cores, 4Gi RAM

**Phase 2 (50-200 tenants):**
- Primary + 1 Read Replica
- 4 CPU cores, 8Gi RAM

**Phase 3 (200+ tenants):**
- Primary + 2 Read Replicas
- Connection pooling (PgBouncer)
- 8 CPU cores, 16Gi RAM

---

## 🌍 MULTI-REGION DEPLOYMENT

### Architecture

```
┌─────────────────┐         ┌─────────────────┐
│   EU Region     │         │  Africa Region  │
│   (Frankfurt)   │◄───────►│   (Cape Town)   │
└─────────────────┘         └─────────────────┘
        │                           │
        ▼                           ▼
  PostgreSQL                  PostgreSQL
  Primary                     Replica
```

**Strategy:** Active-Passive with geo-routing

**DNS Routing:**
- EU users → Frankfurt cluster
- African users → Cape Town cluster
- Failover: 60 seconds

---

## ✅ PRODUCTION DEPLOYMENT CHECKLIST

### Pre-Deployment

- [ ] All tests passing (unit, integration, e2e)
- [ ] Security scan completed (no critical vulnerabilities)
- [ ] Database migrations tested
- [ ] Secrets rotated
- [ ] SSL certificates valid
- [ ] Monitoring dashboards configured
- [ ] Alerting rules tested
- [ ] Backup restoration verified
- [ ] Load testing completed (100 concurrent users)
- [ ] Disaster recovery plan documented

### Deployment

- [ ] Blue-green deployment strategy
- [ ] Database migrations run successfully
- [ ] Health checks passing
- [ ] Smoke tests passed
- [ ] Performance metrics within SLA
- [ ] No error spikes in logs

### Post-Deployment

- [ ] Monitor for 1 hour
- [ ] Verify real user transactions
- [ ] Check error rates
- [ ] Validate backup job runs
- [ ] Update documentation
- [ ] Notify stakeholders

---

## 🎯 DELIVERABLES REQUIRED

1. **Infrastructure as Code (IaC)**
   - Terraform scripts for cloud resources
   - Kubernetes manifests
   - Helm charts

2. **CI/CD Pipeline**
   - GitHub Actions workflows
   - Deployment scripts
   - Rollback procedures

3. **Monitoring Setup**
   - Prometheus configuration
   - Grafana dashboards (JSON)
   - Alert rules

4. **Documentation**
   - Deployment runbook
   - Disaster recovery procedures
   - Scaling guidelines
   - Troubleshooting guide

5. **Security Audit**
   - Penetration testing report
   - Vulnerability scan results
   - Compliance checklist

---

## 🚨 CRITICAL SUCCESS CRITERIA

The deployment MUST:

✅ Achieve 99.9% uptime SLA  
✅ Support auto-scaling from 3 to 10 pods  
✅ Complete deployments with zero downtime  
✅ Restore from backup within 1 hour  
✅ Handle 1000 concurrent requests  
✅ Maintain <100ms API response time  
✅ Encrypt all data in transit and at rest  
✅ Provide real-time monitoring and alerting  
✅ Support multi-region failover  
✅ Pass security compliance audit  

---

**END OF DEPLOYMENT ARCHITECTURE PROMPT**
