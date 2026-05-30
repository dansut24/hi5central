# PASS-0033 Role Middleware

## Overview

This pass adds role-based access control middleware to Hi5Central.

Role middleware allows API routes to require specific tenant roles before allowing access.

---

# Objective

Create reusable role middleware for protected API routes.

---

# Supported Roles

```txt
owner
admin
technician
readonly
```

---

# Role Hierarchy

```txt
owner
  ↓
admin
  ↓
technician
  ↓
readonly
```

---

# Role Rules

## Owner

```txt
Full tenant access
Billing
Security
User management
All platform areas
```

---

## Admin

```txt
User management
Policies
Devices
Reports
Settings
```

---

## Technician

```txt
Devices
Remote access
Patching
Backup operations
Scripts
```

---

## Readonly

```txt
View-only access
No write actions
```

---

# Middleware Behaviour

The middleware should:

```txt
Read user memberships
Check required role
Allow access if role is sufficient
Reject if role is insufficient
```

---

# Unauthorized Response

If no authenticated user exists:

```txt
401 Unauthorized
```

---

# Forbidden Response

If the user lacks the required role:

```txt
403 Forbidden
```

---

# Created Files

```txt
apps/api/src/middleware/roles.ts
```

---

# Success Criteria

```txt
Role middleware compiles
API build succeeds
Routes can require roles
Forbidden response works
```

---

# Future Work

```txt
Tenant-specific role checks
Feature flag middleware
Permission matrix
Platform admin roles
```
