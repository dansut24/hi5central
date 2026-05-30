# PASS-0045 Tenant Switcher

## Overview

This pass introduces the tenant switcher component.

The tenant switcher allows users who belong to multiple organizations to switch between tenants without signing out.

---

# Objective

Create a reusable tenant switcher component.

---

# Current Data Source

Temporary placeholder tenants.

Future source:

```txt
GET /auth/me
```

Memberships:

```txt
memberships[]
tenantIds[]
roles[]
```

---

# Features

Display:

```txt
Current Tenant
Available Tenants
Current Role
```

---

# Placement

Desktop:

```txt
Sidebar Header
```

Mobile:

```txt
Mobile Navigation
```

---

# Files Created

```txt
apps/web/src/components/TenantSwitcher.astro
```

---

# Files Updated

```txt
apps/web/src/layouts/DashboardLayout.astro
apps/web/src/components/UserMenu.astro
```

---

# Security

Tenant switching must never:

```txt
Change permissions
Elevate roles
Expose hidden tenants
Bypass API authorization
```

---

# Future Enhancements

```txt
Live memberships integration
Tenant logo support
White-label branding
Recently used tenants
Tenant search
```

---

# Success Criteria

```txt
Tenant switcher component created
Dashboard layout updated
Web build passes
```

---

# Dependencies

```txt
PASS-0044 User Menu
```

---

# Status

```txt
READY FOR IMPLEMENTATION
```
