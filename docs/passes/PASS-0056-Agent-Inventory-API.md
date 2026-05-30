# PASS-0056 Agent Inventory API

## Overview

This pass allows agents to submit inventory information.

The inventory endpoint will update device information and store hardware/software details.

---

# Endpoint

POST /agent/inventory

---

# Purpose

Collect:

- CPU
- RAM
- Disk
- Operating System
- Logged In User
- GPU
- BitLocker Status
- TPM Status

---

# Request Example

{
  "deviceId": "...",
  "cpu": "Intel Core i7-12700",
  "ramGb": 16,
  "diskGb": 512,
  "gpu": "Intel Iris Xe",
  "loggedInUser": "dan.sutton",
  "bitlockerEnabled": true,
  "tpmVersion": "2.0"
}

---

# Behaviour

Update device inventory information.

---

# Success Criteria

Inventory endpoint exists.
Inventory data persists.
API build passes.
```
