**# PASS-0053 Dashboard Real Metrics

## Overview

This pass adds real dashboard metrics from the database.

The dashboard will begin using device counts from the Hono API instead of static placeholder values.

---

# Objective

Create:

```txt
GET /dashboard/metrics
```

---

# Metrics Returned

```txt
Total Devices
Online Devices
Offline Devices
Warning Devices
```

---

# Files Created

```txt
apps/api/src/routes/dashboard.ts
apps/web/src/components/dashboard/DashboardMetricsClient.jsx
```

---

# Files Updated

```txt
apps/api/src/index.ts
apps/web/src/pages/dashboard/index.astro
```

---

# Success Criteria

```txt
Dashboard metrics API exists
Dashboard client component exists
Web build passes
API build passes
Dashboard loads real metrics in Codespaces
```

---

# Future Work

```txt
Patch metrics
Backup metrics
Remote session metrics
Alert metrics
Tenant scoped metrics
```**
