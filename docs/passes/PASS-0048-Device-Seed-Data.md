# PASS-0048 Device Seed Data

## Overview

This pass adds development seed data for devices.

The purpose is to allow the platform UI and APIs to be developed before live agent enrollment is connected.

---

# Objective

Create realistic demo devices.

---

# Device Types

## Windows Workstations

```txt
Windows 11 Pro
Windows 10 Pro
```

---

## Windows Servers

```txt
Windows Server 2025
Windows Server 2022
```

---

## macOS

```txt
macOS Sonoma
```

---

## Linux

```txt
Ubuntu 24.04 LTS
```

---

# Status Distribution

```txt
online
offline
warning
```

---

# Device Groups

```txt
Workstations
Servers
Executives
Testing
```

---

# Files Updated

```txt
packages/db/src/seed.ts
```

---

# Success Criteria

```txt
Device groups created
Devices created
Seed executes successfully
Database build passes
```

---

# Future Work

```txt
Device API
Device list page
Agent enrollment
Live status updates
```
