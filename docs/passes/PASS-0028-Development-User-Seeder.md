# PASS-0028 Development User Seeder

## Overview

This pass creates a development seed script for Hi5Central.

The seed script creates a test tenant, test user, membership, subscription, and default feature flags.

This allows the login endpoint to be tested with real database data.

---

# Objective

Create a development user for local and Codespaces testing.

---

# Seed Data

## Tenant

```txt
Hi5Central Demo
```

Slug:

```txt
hi5central-demo
```

---

## User

```txt
admin@hi5central.local
```

Password:

```txt
Password123!
```

---

## Membership

Role:

```txt
owner
```

---

## Subscription

Plan:

```txt
msp
```

Status:

```txt
active
```

---

# Feature Flags

Enable:

```txt
remote_access
background_mode
attended_support
patching
advanced_patching
backup
branding
api_access
session_recording
```

---

# Security Notes

The development password must never be used in production.

The password is hashed using:

```txt
Argon2id
```

No plaintext password is stored.

---

# Files Created

```txt
packages/db/src/seed.ts
```

---

# Files Updated

```txt
packages/db/package.json
```

---

# Test Plan

Run:

```bash
pnpm --filter @hi5central/db seed
```

Expected:

```txt
Development tenant created
Development user created
Membership created
Subscription created
Feature flags created
```

---

# Success Criteria

```txt
Seed script runs successfully
Password hash is stored
No plaintext password stored
Login endpoint can use seeded user
```

---

# Future Work

```txt
Login endpoint test
Logout endpoint
Current user endpoint
Session middleware
```
