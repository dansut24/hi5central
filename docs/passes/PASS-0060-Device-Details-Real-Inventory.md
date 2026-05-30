# PASS-0060 Device Details Real Inventory

## Overview

This pass displays real inventory fields on the device details page.

The data comes from the agent inventory endpoint.

---

# Objective

Show inventory submitted by the Go agent.

---

# Fields Displayed

```txt
CPU
RAM
Disk
GPU
Logged In User
BitLocker
TPM
```

---

# Data Source

```txt
GET /devices/:id
```

---

# Files Updated

```txt
apps/web/src/pages/devices/[id].astro
```

---

# Success Criteria

```txt
Device details page displays inventory fields
Web build passes
Codespaces test works
```
