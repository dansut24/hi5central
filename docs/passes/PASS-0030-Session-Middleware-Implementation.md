# PASS-0030 Session Middleware Implementation

## Overview

This pass implements session validation middleware for Hi5Central.

The middleware is responsible for validating authenticated requests and attaching user context to protected routes.

This creates the foundation for all authenticated API endpoints.

---

# Objective

Implement middleware supporting:

```txt
Session Validation
Current User Lookup
Membership Lookup
Tenant Context
Role Context
Protected Routes
```

---

# Authentication Flow

```txt
Browser
  ↓
Session Cookie
  ↓
Session Middleware
  ↓
Token Hash Lookup
  ↓
Session Validation
  ↓
User Lookup
  ↓
Membership Lookup
  ↓
Authenticated Request
```

---

# Session Validation

The middleware must:

```txt
Read Session Cookie
Hash Session Token
Lookup Session
Verify Session Exists
Verify Session Not Expired
Verify Session Not Revoked
```

---

# Session Expiry Rules

Sessions are invalid when:

```txt
Current Time > expires_at
```

Expired sessions should be rejected.

---

# Session Revocation Rules

Sessions are invalid when:

```txt
revoked_at IS NOT NULL
```

Revoked sessions should be rejected.

---

# User Validation

After session validation:

```txt
Load User
Verify User Exists
Verify User Status = active
```

Supported user states:

```txt
active
pending_verification
locked
disabled
```

Only:

```txt
active
```

may access protected routes.

---

# Membership Validation

The middleware must load:

```txt
Tenant Memberships
Roles
Tenant Context
```

from:

```txt
memberships
```

---

# Context Injection

Middleware should attach:

```txt
session
user
memberships
tenantIds
roles
```

to the request context.

---

# Protected Routes

Examples:

```txt
/tenants
/devices
/policies
/patching
/backup
/remote-access
/settings
```

These routes require:

```txt
requireAuth
```

middleware.

---

# Unauthorized Response

If no valid session exists:

HTTP Status:

```txt
401 Unauthorized
```

Response:

```json
{
  "success": false,
  "error": "unauthorized"
}
```

---

# Forbidden Response

If user lacks permissions:

HTTP Status:

```txt
403 Forbidden
```

Response:

```json
{
  "success": false,
  "error": "forbidden"
}
```

---

# Security Requirements

```txt
No plaintext session lookup
Hash comparison only
Expiry enforcement
Revocation enforcement
Active user enforcement
Tenant isolation
Role awareness
Audit compatibility
```

---

# Created Files

```txt
apps/api/src/middleware/session.ts
```

---

# Updated Files

```txt
apps/api/src/index.ts
```

---

# Test Plan

## Build API

```bash
pnpm --filter @hi5central/api build
```

Expected:

```txt
PASS
```

---

## Login

```http
POST /auth/login
```

Expected:

```txt
Session Created
Cookie Returned
```

---

## Protected Route

Request:

```http
GET /devices
```

Without Cookie:

Expected:

```txt
401 Unauthorized
```

With Valid Cookie:

Expected:

```txt
200 OK
```

---

# Success Criteria

```txt
Session validation works
Expired sessions rejected
Revoked sessions rejected
User loaded
Memberships loaded
Tenant context available
Protected routes secured
```

---

# Future Work

```txt
Current User Endpoint
Logout Endpoint
Logout Everywhere
Role Middleware
Feature Flag Middleware
API Key Middleware
MFA Middleware
```
