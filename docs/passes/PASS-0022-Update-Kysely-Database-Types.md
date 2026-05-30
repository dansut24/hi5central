# PASS-0022 Update Kysely Database Types

## Overview

This pass updates the shared Kysely database types after adding the authentication, session, audit, subscription, feature flag, and tenant branding tables.

Kysely requires TypeScript interfaces that describe the database tables.

---

# Objective

Update the database type definitions for:

```txt
sessions
email_verification_tokens
password_reset_tokens
audit_logs
subscriptions
feature_flags
tenant_branding
```

---

# Updated File

```txt
packages/db/src/types.ts
```

---

# Purpose

The database types allow the API and worker services to query PostgreSQL with TypeScript safety.

---

# Tables Covered

```txt
tenants
users
memberships
sessions
email_verification_tokens
password_reset_tokens
audit_logs
subscriptions
feature_flags
tenant_branding
```

---

# Success Criteria

```txt
Database package builds successfully
API package builds successfully
Kysely recognises new tables
No TypeScript errors
```

---

# Test Plan

Run:

```bash
pnpm --filter @hi5central/db build
pnpm --filter @hi5central/api build
```

Expected:

```txt
Both builds pass
```

---

# Future Work

```txt
Auth utilities
Session helpers
Audit logging helper
Tenant middleware
Feature flag helper
```
