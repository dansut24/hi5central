# PASS-0039 Current User Provider

## Overview

This pass defines the frontend current-user provider pattern for Hi5Central.

The current-user provider will allow the web portal to understand who is logged in, which tenants they belong to, and what roles/features they have.

---

# Objective

Prepare the web portal for authenticated user context.

---

# Current User Source

The portal will use:

```txt
GET /auth/me
```

from the Hono API.

---

# Current User Data

The current user response includes:

```txt
user
memberships
tenantIds
roles
```

---

# Purpose

The current user provider will support:

```txt
Dashboard personalisation
Authenticated layouts
Route protection
Role-aware UI
Feature-aware UI
Tenant-aware UI
```

---

# Authentication Flow

```txt
User logs in
  ↓
Session cookie is created
  ↓
Frontend calls /auth/me
  ↓
Current user context is loaded
  ↓
Dashboard renders authenticated state
```

---

# Created Files

```txt
apps/web/src/lib/api.ts
apps/web/src/lib/currentUser.ts
```

---

# Updated Files

```txt
apps/web/src/pages/dashboard/index.astro
```

---

# Success Criteria

```txt
Current user API helper exists
Current user loader exists
Dashboard can use placeholder authenticated state
Web build passes
```

---

# Future Work

```txt
Route guards
Login API connection
Dashboard redirect
Tenant switcher
User menu
```
