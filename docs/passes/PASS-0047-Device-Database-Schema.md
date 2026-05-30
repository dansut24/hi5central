# PASS-0047 Device Database Schema

## Overview

This pass creates the first device database schema for Hi5Central.

Devices are the core managed endpoint records used by the RMM platform.

---

# Objective

Create database support for managed devices.

---

# Tables Created

```txt
devices
device_groups
```

---

# Devices Table

Stores enrolled and discovered devices.

Fields:

```txt
id
tenant_id
device_group_id
device_name
hostname
operating_system
os_version
agent_version
status
last_seen_at
public_ip
local_ip
created_at
updated_at
```

---

# Device Groups Table

Stores logical device groupings.

Fields:

```txt
id
tenant_id
name
description
created_at
updated_at
```

---

# Device Status Values

```txt
online
offline
warning
unknown
```

---

# Security Requirements

```txt
All devices must be tenant-scoped
All device groups must be tenant-scoped
Foreign keys must be indexed
Device access must be controlled by tenant membership
```

---

# Files Created

```txt
packages/db/migrations/004_device_schema.sql
```

---

# Files Updated

```txt
packages/db/src/types.ts
```

---

# Success Criteria

```txt
Migration created
Device tables defined
Kysely types updated
Database package builds
API package builds
```

---

# Future Work

```txt
Device seed data
Device API foundation
Device list page
Device detail page
Agent enrollment integration
Live device status
```
