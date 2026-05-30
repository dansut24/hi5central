# PASS-0031 Full Login Flow Test

## Overview

This pass validates the complete authentication flow.

The goal is to verify that:

```txt
User Exists
Login Works
Session Created
Cookie Created
Session Middleware Works
Current User Endpoint Works
Audit Log Created
```

---

# Objective

Perform the first complete Hi5Central login test.

---

# Prerequisites

Completed:

```txt
PASS-0027
PASS-0028
PASS-0029
PASS-0030
```

---

# Test Steps

## Start Database

```bash
docker compose up -d
```

---

## Run Migrations

```bash
pnpm --filter @hi5central/db migrate
```

---

## Run Seeder

```bash
pnpm --filter @hi5central/db seed
```

---

## Start API

```bash
pnpm --filter @hi5central/api dev
```

---

## Login

Request:

```http
POST /auth/login
```

Body:

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
Session row exists
Session token hash stored
Expiry populated
```

---

## Verify Current User

Request:

```http
GET /auth/me
```

Expected:

```json
{
  "success": true
}
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
Current user endpoint works
Audit log created
No plaintext tokens stored
```

---

# Future Work

```txt
Logout endpoint
Logout everywhere
Role middleware
Feature flag middleware
Astro login page
```
