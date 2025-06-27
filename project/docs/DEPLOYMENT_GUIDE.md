# Deployment Guide

## 🚀 Production Deployment

### Prerequisites

#### System Requirements
- **CPU**: 4+ cores (8+ recommended)
- **RAM**: 8GB minimum (16GB recommended)
- **Storage**: 100GB SSD (500GB recommended)
- **Network**: 1Gbps connection
- **OS**: Ubuntu 20.04 LTS or CentOS 8+

#### Software Dependencies
- **Docker**: 20.10+
- **Docker Compose**: 2.0+
- **Node.js**: 18.0+
- **Python**: 3.9+
- **PostgreSQL**: 13+
- **Redis**: 6.0+
- **Nginx**: 1.20+

### Environment Setup

#### 1. Clone Repository
```bash
git clone https://github.com/your-org/railway-complaint-system.git
cd railway-complaint-system
```

#### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

#### Environment Variables
```bash
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/railway_complaints
REDIS_URL=redis://localhost:6379/0

# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-domain.com,www.your-domain.com

# AI/ML Configuration
ML_MODEL_PATH=/app/models/
SENTIMENT_MODEL_VERSION=v1.2.0
CATEGORY_MODEL_VERSION=v1.1.0

# File Storage
MEDIA_ROOT=/app/media/
STATIC_ROOT=/app/static/
AWS_S3_BUCKET=railway-complaints-storage

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=noreply@railway.gov.in
EMAIL_HOST_PASSWORD=your-email-password

# Security Settings
CORS_ALLOWED_ORIGINS=https://your-domain.com
CSRF_TRUSTED_ORIGINS=https://your-domain.com

# Monitoring
SENTRY_DSN=your-sentry-dsn
LOG_LEVEL=INFO
```

### Docker Deployment

#### 1. Docker Compose Configuration
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - backend

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "8000:8000"
    environment:
      - DJANGO_SETTINGS_MODULE=railway_complaints.settings.production
    depends_on:
      - database
      - redis
    volumes:
      - ./media:/app/media
      - ./static:/app/static

  database:
    image: postgres:13
    environment:
      - POSTGRES_DB=railway_complaints
      - POSTGRES_USER=railway_user
      - POSTGRES_PASSWORD=secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups

  redis:
    image: redis:6-alpine
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
      - ./static:/var/www/static
    depends_on:
      - frontend
      - backend

  celery:
    build:
      context: .
      dockerfile: Dockerfile.backend
    command: celery -A railway_complaints worker -l info
    depends_on:
      - database
      - redis
    volumes:
      - ./media:/app/media

volumes:
  postgres_data:
  redis_data:
```

#### 2. Frontend Dockerfile
```dockerfile
# Dockerfile.frontend
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.frontend.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
```

#### 3. Backend Dockerfile
```dockerfile
# Dockerfile.backend
FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Create non-root user
RUN useradd --create-home --shell /bin/bash railway
RUN chown -R railway:railway /app
USER railway

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "railway_complaints.wsgi:application"]
```

#### 4. Deploy with Docker Compose
```bash
# Build and start services
docker-compose -f docker-compose.prod.yml up -d

# Run database migrations
docker-compose exec backend python manage.py migrate

# Create superuser
docker-compose exec backend python manage.py createsuperuser

# Load initial data
docker-compose exec backend python manage.py loaddata initial_data.json
```

### Kubernetes Deployment

#### 1. Namespace Configuration
```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: railway-complaints
```

#### 2. ConfigMap and Secrets
```yaml
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: railway-complaints
data:
  DATABASE_HOST: "postgres-service"
  REDIS_HOST: "redis-service"
  DEBUG: "False"

---
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: railway-complaints
type: Opaque
data:
  SECRET_KEY: <base64-encoded-secret>
  DATABASE_PASSWORD: <base64-encoded-password>
```

#### 3. Database Deployment
```yaml
# k8s/postgres.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
  namespace: railway-complaints
spec:
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
        image: postgres:13
        env:
        - name: POSTGRES_DB
          value: railway_complaints
        - name: POSTGRES_USER
          value: railway_user
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: DATABASE_PASSWORD
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
      volumes:
      - name: postgres-storage
        persistentVolumeClaim:
          claimName: postgres-pvc

---
apiVersion: v1
kind: Service
metadata:
  name: postgres-service
  namespace: railway-complaints
spec:
  selector:
    app: postgres
  ports:
  - port: 5432
    targetPort: 5432
```

#### 4. Application Deployment
```yaml
# k8s/backend.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: railway-complaints
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: railway-complaints/backend:latest
        ports:
        - containerPort: 8000
        envFrom:
        - configMapRef:
            name: app-config
        - secretRef:
            name: app-secrets
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"

---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
  namespace: railway-complaints
spec:
  selector:
    app: backend
  ports:
  - port: 8000
    targetPort: 8000
  type: ClusterIP
```

#### 5. Ingress Configuration
```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: railway-complaints-ingress
  namespace: railway-complaints
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  tls:
  - hosts:
    - complaints.railway.gov.in
    secretName: railway-complaints-tls
  rules:
  - host: complaints.railway.gov.in
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 8000
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 3000
```

### Database Setup

#### 1. PostgreSQL Configuration
```sql
-- Create database and user
CREATE DATABASE railway_complaints;
CREATE USER railway_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE railway_complaints TO railway_user;

-- Enable required extensions
\c railway_complaints;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
```

#### 2. Database Migrations
```bash
# Run migrations
python manage.py migrate

# Create initial data
python manage.py loaddata fixtures/initial_data.json

# Create search indexes
python manage.py create_search_indexes
```

### SSL/TLS Configuration

#### 1. Nginx SSL Configuration
```nginx
# nginx.conf
server {
    listen 443 ssl http2;
    server_name complaints.railway.gov.in;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;

    location /api/ {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Monitoring and Logging

#### 1. Application Monitoring
```yaml
# k8s/monitoring.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
    - job_name: 'railway-complaints'
      static_configs:
      - targets: ['backend-service:8000']
```

#### 2. Log Aggregation
```yaml
# k8s/logging.yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
spec:
  selector:
    matchLabels:
      name: fluentd
  template:
    metadata:
      labels:
        name: fluentd
    spec:
      containers:
      - name: fluentd
        image: fluent/fluentd-kubernetes-daemonset:v1-debian-elasticsearch
        env:
        - name: FLUENT_ELASTICSEARCH_HOST
          value: "elasticsearch-service"
```

### Backup and Recovery

#### 1. Database Backup Script
```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="railway_complaints"

# Create backup
pg_dump -h localhost -U railway_user $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/backup_$DATE.sql

# Remove backups older than 30 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete

echo "Backup completed: backup_$DATE.sql.gz"
```

#### 2. Automated Backup Cron Job
```bash
# Add to crontab
0 2 * * * /opt/railway-complaints/backup.sh >> /var/log/backup.log 2>&1
```

### Performance Optimization

#### 1. Database Optimization
```sql
-- Create indexes for frequently queried fields
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_created_at ON complaints(created_at);
CREATE INDEX idx_complaints_category ON complaints(category);
CREATE INDEX idx_complaints_priority ON complaints(priority_score);

-- Full-text search index
CREATE INDEX idx_complaints_search ON complaints USING gin(to_tsvector('english', description));
```

#### 2. Caching Configuration
```python
# Django cache settings
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://redis:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# Cache timeout settings
CACHE_TTL = {
    'dashboard_stats': 300,  # 5 minutes
    'complaint_details': 600,  # 10 minutes
    'analytics_data': 1800,  # 30 minutes
}
```

### Health Checks and Monitoring

#### 1. Application Health Check
```python
# health_check.py
from django.http import JsonResponse
from django.db import connection

def health_check(request):
    try:
        # Check database connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        
        # Check Redis connection
        from django.core.cache import cache
        cache.set('health_check', 'ok', 10)
        
        return JsonResponse({
            'status': 'healthy',
            'database': 'connected',
            'cache': 'connected',
            'timestamp': timezone.now().isoformat()
        })
    except Exception as e:
        return JsonResponse({
            'status': 'unhealthy',
            'error': str(e)
        }, status=503)
```

#### 2. Kubernetes Health Probes
```yaml
livenessProbe:
  httpGet:
    path: /health/
    port: 8000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready/
    port: 8000
  initialDelaySeconds: 5
  periodSeconds: 5
```

This deployment guide provides comprehensive instructions for deploying the Railway Complaint Management System in production environments with high availability, security, and scalability considerations.