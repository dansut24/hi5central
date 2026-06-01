# PASS-0078 Platform Admin Separation

## Objective

Separate Hi5Central platform administration from customer tenant administration.

## Architecture

### Marketing

https://hi5central.com

### Platform Administration

https://app.hi5central.com

### Customer Tenants

https://tenant-slug.hi5central.com

---

## Implemented

### Platform Admin Middleware

Created:

apps/api/src/middleware/platformAdmin.ts

Role validation now queries the database directly on every request.

Benefits:

- Immediate role changes
- No stale permissions
- No session re-login required
- More secure than session-cached roles

---

### Platform Admin APIs

Protected routes:

/api/platform-admin/users

/api/platform-admin/tenants

Authentication required.

Platform admin role required.

---

### Session Authentication

Fixed session cookie issue.

Verified:

- Login succeeds
- Session cookie stored
- /api/auth/me returns authenticated user
- Platform admin pages authenticated correctly

---

### Platform Dashboard

Created:

/admin/platform

Purpose:

- Hi5Central internal administration
- Tenant management
- User management
- Platform operations

---

## Domain Separation

### Internal

app.hi5central.com

Used by:

- Hi5Central staff
- Platform administrators

### External

tenant.hi5central.com

Used by:

- Customer admins
- Technicians
- End users

---

## Security Model

User Login
    ↓
Session Cookie
    ↓
requireAuth
    ↓
Database Role Lookup
    ↓
requirePlatformAdmin
    ↓
Protected Route

