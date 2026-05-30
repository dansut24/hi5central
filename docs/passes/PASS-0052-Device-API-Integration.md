# PASS-0052 Device API Integration

## Overview

This pass connects the device inventory UI to the Hono Device API.

The devices page will begin loading device data from:

```txt
GET /devices
```

---

# Objective

Replace static device list data with API-loaded device data.

---

# API Endpoint

```txt
GET /devices
```

---

# Files Created

```txt
apps/web/src/components/devices/DeviceInventoryClient.jsx
```

---

# Files Updated

```txt
apps/web/src/pages/devices/index.astro
```

---

# Current Behaviour

The page loads devices from the API in the browser.

---

# Future Behaviour

Later passes will add:

```txt
Authentication-aware API requests
Search
Filtering
Pagination
Realtime updates
Device actions
```

---

# Success Criteria

```txt
Device inventory client created
Devices page uses API-backed component
Web build passes
```

---

# Future Work

```txt
Device filtering
Device search
Device status badges
Device details API integration
Dashboard real data
```
