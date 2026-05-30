# PASS-0049 Device API Foundation

## Overview

This pass creates the first device API endpoints.

These endpoints provide access to tenant-scoped device inventory data.

---

# Objective

Create device inventory API endpoints.

---

# Endpoints

## List Devices

```txt
GET /devices
```

Returns:

```txt
All devices for current tenant
```

---

## Get Device

```txt
GET /devices/:id
```

Returns:

```txt
Single device
```

---

# Security

Requirements:

```txt
Authentication required
Tenant scoped
Membership validated
No cross-tenant access
```

---

# Files Created

```txt
apps/api/src/routes/devices.ts
```

---

# Files Updated

```txt
apps/api/src/index.ts
```

---

# Success Criteria

```txt
Devices route exists
Device details route exists
API builds
Authenticated requests succeed
```

---

# Future Work

```txt
Pagination
Filtering
Search
Sorting
Realtime updates
Agent enrollment
```
