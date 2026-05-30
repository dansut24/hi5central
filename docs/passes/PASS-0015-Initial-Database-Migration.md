# PASS-0015 Initial Database Migration

## Overview

This pass creates the first PostgreSQL database migration for Hi5Central.

The migration creates the core multi-tenant foundation tables.

---

# Objective

Create the first database migration for:

```txt
tenants
users
memberships
```

---

# Database Layer

Uses:

```txt
PostgreSQL 17
Kysely
node-pg-migrate
pg
```

---

# Created Tables

## Tenants

```txt
tenants
```

Stores customer organisations.

---

## Users

```txt
users
```

Stores platform users.

Passwords are stored as:

```txt
password_hash
```

No plaintext passwords are allowed.

---

## Memberships

```txt
memberships
```

Links users to tenants.

---

# Security Notes

Passwords must use:

```txt
Argon2id
```

Future authentication work must never store plaintext passwords.

---

# Files Created

```txt
packages/db/migrations/001_initial_core_tables.sql
```

---

# Files Updated

```txt
packages/db/package.json
```

---

# Test Plan

## Install Dependencies

```bash
pnpm install
```

Expected:

```txt
Dependencies install successfully
```

---

## Run Database

```bash
docker compose up -d
```

Expected:

```txt
PostgreSQL and Redis start successfully
```

---

## Run Migration

```bash
pnpm --filter @hi5central/db migrate
```

Expected:

```txt
tenants table created
users table created
memberships table created
```

---

## API Readiness

```bash
pnpm --filter @hi5central/api dev
```

Then open:

```txt
/ready
```

Expected:

```json
{
  "status": "ready",
  "database": true
}
```

---

# Success Criteria

```txt
Migration runs successfully
Core tables exist
API readiness check passes
Web build still succeeds
API build still succeeds
```

---

# Future Work

```txt
Authentication foundation
Password hashing
Login endpoint
Session cookies
Tenant creation
Seed development tenant
```
