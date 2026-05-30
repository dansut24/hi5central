# PASS-0036 Platform Admin Roles

## Overview

This pass defines platform-level administration roles for Hi5Central.

Platform roles are separate from tenant roles.

Tenant roles control access inside a customer organisation.

Platform roles control access to the Hi5Central operator/admin layer.

---

# Objective

Add support for platform-level roles.

---

# Tenant Roles

Tenant roles remain:

```txt
owner
admin
technician
readonly
```

These apply inside a tenant.

---

# Platform Roles

Platform roles are:

```txt
platform_admin
platform_support
```

---

# Platform Admin

The platform admin role can manage:

```txt
All tenants
Subscriptions
Feature flags
White labelling
Licensing
Platform settings
Platform-wide audit logs
```

---

# Platform Support

The platform support role can view support-relevant information.

Allowed:

```txt
View tenants
View devices metadata
View subscription status
View support diagnostics
```

Not allowed:

```txt
Change billing
Change licensing
Delete tenants
Modify platform settings
Access customer remote sessions without authorisation
```

---

# Database Decision

Platform roles will be stored on the existing:

```txt
users
```

table.

Add field:

```txt
platform_role
```

Allowed values:

```txt
null
platform_admin
platform_support
```

---

# Security Rules

```txt
Platform roles are not tenant roles
Platform admins are not automatically tenant owners
Platform support must be limited
All platform admin actions must be audited
```

---

# Middleware

Create middleware:

```txt
requirePlatformRole()
```

---

# Created Files

```txt
apps/api/src/middleware/platformRoles.ts
```

---

# Updated Files

```txt
packages/db/migrations/003_platform_roles.sql
packages/db/src/types.ts
```

---

# Success Criteria

```txt
Migration created
Database types updated
Middleware created
API build succeeds
DB build succeeds
```

---

# Future Work

```txt
Platform Admin dashboard
Tenant management APIs
Subscription management APIs
Platform audit log viewer
```
