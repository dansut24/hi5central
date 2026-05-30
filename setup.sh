#!/usr/bin/env bash
set -e

mkdir -p apps/web apps/api packages/db packages/shared docs infra

cat > pnpm-workspace.yaml <<'EOF'
packages:
  - "apps/*"
  - "packages/*"
EOF

cat > package.json <<'EOF'
{
  "name": "hi5central",
  "private": true,
  "packageManager": "pnpm@10.28.2",
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "build": "pnpm -r build",
    "db:generate": "pnpm --filter @hi5central/db db:generate",
    "db:migrate": "pnpm --filter @hi5central/db db:migrate"
  },
  "devDependencies": {
    "typescript": "^5.8.3"
  }
}
EOF

cat > .env.example <<'EOF'
NODE_ENV=development
DATABASE_URL=postgres://hi5central:hi5central_dev_password@localhost:5432/hi5central
REDIS_URL=redis://localhost:6379
API_PORT=4000
WEB_PORT=4321
APP_NAME=Hi5Central
APP_URL=http://localhost:4321
API_URL=http://localhost:4000
EOF

cat > docker-compose.yml <<'EOF'
services:
  postgres:
    image: postgres:17
    container_name: hi5central-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: hi5central
      POSTGRES_PASSWORD: hi5central_dev_password
      POSTGRES_DB: hi5central
    ports:
      - "5432:5432"
    volumes:
      - hi5central_postgres:/var/lib/postgresql/data

  redis:
    image: redis:8
    container_name: hi5central-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - hi5central_redis:/data

volumes:
  hi5central_postgres:
  hi5central_redis:
EOF

cat > docs/00-project-overview.md <<'EOF'
# Hi5Central Project Overview

Hi5Central is a secure RMM, remote access, software patching, and backup management platform.

## Core Stack

- Frontend: Astro 6 + React 19
- API: Hono 4 + TypeScript on Node.js 22
- Database: PostgreSQL 17
- ORM: Drizzle
- Queue/cache: Redis 8 + BullMQ 5
- Agent: Go
- Remote access: WebRTC
- TURN relay: Coturn
EOF

cat > docs/01-architecture.md <<'EOF'
# Hi5Central Architecture

## Remote Access Principle

Remote access must use separate paths for video and input.

Video path:

```txt
Streamer -> WebRTC video track -> Viewer
