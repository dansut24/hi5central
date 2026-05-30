# PASS-0021 Authentication and Security Database Migration

## Overview

This pass adds the next database tables required for authentication, sessions, audit logging, subscriptions, feature flags, and tenant branding.

These tables extend the core multi-tenant foundation created in the initial database migration.

---

# Objective

Create database tables for:

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

## Sessions

```txt
sessions
```

Stores active and revoked user sessions.

Raw session tokens are never stored.

Only the SHA-256 hash of the token is stored.

---

## Email Verification Tokens

```txt
email_verification_tokens
```

Stores email verification token hashes.

---

## Password Reset Tokens

```txt
password_reset_tokens
```

Stores password reset token hashes.

---

## Audit Logs

```txt
audit_logs
```

Stores append-only audit events.

---

## Subscriptions

```txt
subscriptions
```

Stores tenant plan and subscription status.

---

## Feature Flags

```txt
feature_flags
```

Stores tenant-level feature access.

---

## Tenant Branding

```txt
tenant_branding
```

Stores white-label branding configuration.

---

# Security Rules

```txt
No plaintext tokens
No plaintext passwords
Token hashes only
Append-only audit logs
Tenant-scoped security tables
```

---

# Files Created

```txt
packages/db/migrations/002_auth_sessions_audit_tenant_security.sql
```

---

# Success Criteria

```txt
Migration runs successfully
All security tables are created
Foreign keys are valid
Indexes are created
API build still succeeds
DB build still succeeds
Web build still succeeds
```

---

# Future Work

```txt
Auth utility functions
Argon2id password hashing
Session token generation
Cookie helpers
Login endpoint
Logout endpoint
Current user endpoint
Audit logging helper
```
