# PASS-0054 Agent Enrollment API

## Overview

This pass creates the first API endpoint used by Hi5Central agents.

The endpoint allows an agent to enroll or update a device record.

This is the first step toward real device check-ins replacing seeded demo data.

---

# Objective

Create agent enrollment support.

---

# Endpoint

```txt
POST /agent/enroll
```

---

# Request Body

```json
{
  "tenantSlug": "hi5central-demo",
  "deviceName": "DESKTOP-001",
  "hostname": "DESKTOP-001",
  "operatingSystem": "Windows 11 Pro",
  "osVersion": "24H2",
  "agentVersion": "1.0.0",
  "publicIp": "203.0.113.50",
  "localIp": "192.168.1.50"
}
```

---

# Behaviour

If the device does not exist:

```txt
Create device
```

If the device already exists:

```txt
Update device
Refresh last_seen_at
Set status online
```

---

# Files Created

```txt
apps/api/src/routes/agent.ts
```

---

# Files Updated

```txt
apps/api/src/index.ts
```

---

# Security Notes

This pass is development-only.

Future passes must add:

```txt
Enrollment tokens
Device keys
Tenant enrollment policies
Agent authentication
Rate limiting
Audit logging
```

---

# Success Criteria

```txt
Agent route exists
Enrollment creates a device
Enrollment updates an existing device
API build passes
```

---

# Future Work

```txt
Enrollment token security
Agent heartbeat endpoint
Agent inventory endpoint
Device key authentication
Real Go agent integration
```
