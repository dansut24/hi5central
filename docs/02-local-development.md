# Local Development

## Purpose

This document describes how to set up a local Hi5Central development environment.

---

# Requirements

## Software

Install the following:

- Node.js 22 LTS
- pnpm
- Docker Desktop
- Git

Recommended:

- Visual Studio Code
- GitHub Codespaces

---

# Repository Structure

```txt
hi5central/
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── db/
│   └── shared/
│
├── docs/
├── infra/
│
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
└── .env.example
```

---

# Environment Variables

Copy:

```txt
.env.example
```

to:

```txt
.env
```

Update values as required.

---

# Install Dependencies

From the repository root:

```bash
pnpm install
```

---

# Start Infrastructure

Start PostgreSQL and Redis:

```bash
docker compose up -d
```

Verify containers:

```bash
docker ps
```

Expected services:

```txt
postgres
redis
```

---

# Database

PostgreSQL connection:

```txt
Host: localhost
Port: 5432
Database: hi5central
User: hi5central
Password: hi5central_dev_password
```

---

# Redis

Redis connection:

```txt
Host: localhost
Port: 6379
```

---

# Development Commands

Install dependencies:

```bash
pnpm install
```

Run development environment:

```bash
pnpm dev
```

Build all projects:

```bash
pnpm build
```

Generate database migrations:

```bash
pnpm db:generate
```

Apply database migrations:

```bash
pnpm db:migrate
```

---

# Local Services

Default local ports:

| Service | Port |
|----------|------|
| Web App | 4321 |
| API | 4000 |
| PostgreSQL | 5432 |
| Redis | 6379 |

---

# Development Principles

- Documentation first
- Security first
- No hardcoded secrets
- No plaintext passwords
- Use Argon2id for password hashing
- Use HTTPS in production
- Use feature flags for licensing and plan management
- Keep stream and input paths separate for remote access

---

# Troubleshooting

## Docker Not Running

Ensure Docker Desktop is started.

Verify:

```bash
docker ps
```

---

## PostgreSQL Connection Issues

Verify:

```bash
docker compose ps
```

Check logs:

```bash
docker compose logs postgres
```

---

## Redis Connection Issues

Check logs:

```bash
docker compose logs redis
```

---

# Next Steps

After local infrastructure is running:

1. Configure Drizzle ORM
2. Create initial database schema
3. Build Hono API foundation
4. Build Astro dashboard shell
5. Implement authentication and tenancy
