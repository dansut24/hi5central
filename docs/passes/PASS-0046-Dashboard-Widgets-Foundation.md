# PASS-0046 Dashboard Widgets Foundation

## Overview

This pass introduces the first dashboard widgets.

These widgets provide the foundation for future live monitoring, reporting, patching, backup, and remote access dashboards.

---

# Objective

Create reusable dashboard widget cards.

---

# Initial Widgets

## Devices

Displays:

```txt
Total Devices
Online Devices
Offline Devices
```

---

## Remote Access

Displays:

```txt
Active Sessions
Today's Sessions
```

---

## Patching

Displays:

```txt
Missing Updates
Critical Updates
Compliance %
```

---

## Backup

Displays:

```txt
Protected Devices
Failed Backups
Last Backup Status
```

---

## Alerts

Displays:

```txt
Open Alerts
Critical Alerts
Warning Alerts
```

---

# Current Data Source

Placeholder values.

Future source:

```txt
Dashboard API
Device API
Patch API
Backup API
Alert API
```

---

# Files Created

```txt
apps/web/src/components/dashboard/StatCard.astro
```

---

# Files Updated

```txt
apps/web/src/pages/dashboard/index.astro
```

---

# Design Goals

```txt
Responsive
Theme Aware
Reusable
Fast
Mobile Friendly
```

---

# Success Criteria

```txt
Widget component exists
Dashboard displays widgets
Web build passes
```

---

# Future Work

```txt
Live dashboard API
Charts
Realtime updates
Device summaries
Tenant analytics
```

---

# Status

```txt
READY FOR IMPLEMENTATION
```
