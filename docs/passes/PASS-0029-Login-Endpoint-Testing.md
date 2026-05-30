# PASS-0029 Login Endpoint Testing

## Overview

This pass validates the complete authentication flow.

The goal is to verify that a user can:

```txt
Login
Create Session
Receive Cookie
Write Audit Event
```

using the Hi5Central API.

---

# Objective

Test:

```txt
Database Connection
Seed Data
Login Endpoint
Session Creation
Audit Logging
```

---

# Prerequisites

Completed:

```txt
PASS-0024
PASS-0025
PASS-0026
PASS-0027
PASS-0028
```

---

# Test Flow

## Start PostgreSQL

```bash
docker compose up -d
```

---

## Run Migrations

```bash
pnpm --filter @hi5central/db migrate
```

Expected:

```txt
All migrations applied
```

---

## Run Seeder

```bash
pnpm --filter @hi5central/db seed
```

Expected:

```txt
Development tenant created
Development user created
Feature flags created
```

---

## Start API

```bash
pnpm --filter @hi5central/api dev
```

Expected:

```txt
Hi5Central API listening
```

---

## Login Test

Request:

POST /auth/login

```json
{
  "email": "admin@hi5central.local",
  "password": "Password123!"
}
```

Expected:

```json
{
  "success": true
}
```

---

## Verify Session

Verify:

```txt
Session row created
Cookie returned
Expiry populated
Token hash stored
```

---

## Verify Audit Log

Verify:

```txt
auth.login_success
```

exists in:

```txt
audit_logs
```

---

# Success Criteria

```txt
Login succeeds
Session created
Cookie created
Audit log created
No plaintext tokens stored
```

---

# Future Work

```txt
Current User Endpoint
Logout Endpoint
Session Middleware
Role Middleware
```
