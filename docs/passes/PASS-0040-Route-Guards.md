# PASS-0040 Route Guards

## Overview

This pass adds frontend route guard helpers for Hi5Central.

Route guards will be used to protect authenticated pages and redirect unauthenticated users to the login page.

---

# Objective

Create reusable route guard helpers for Astro pages.

---

# Guard Behaviour

If user is authenticated:

```txt
Allow access
```

If user is not authenticated:

```txt
Redirect to /login
```

---

# Created Files

```txt
apps/web/src/lib/routeGuards.ts
```

---

# Updated Files

```txt
apps/web/src/pages/dashboard/index.astro
```

---

# Security Note

This frontend route guard improves user experience.

Final security is still enforced by the Hono API.

Protected API routes must continue to use:

```txt
requireAuth
requireRole
requireFeature
```

---

# Success Criteria

```txt
Route guard helper exists
Dashboard can call route guard
Web build passes
```

---

# Future Work

```txt
Connect route guard to live /auth/me
Redirect after login
Protect all dashboard pages
Add role-aware page guards
Add feature-aware page guards
```
