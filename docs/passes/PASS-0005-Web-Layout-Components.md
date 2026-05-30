# PASS-0005 Web Layout Components

## Overview

This pass will refactor the first Hi5Central dashboard shell into reusable layout and UI components.

The current dashboard is contained inside a single Astro page.

This pass prepares the web app for long-term growth by splitting repeated UI sections into dedicated components.

---

# Objective

Create reusable components for:

```txt
Sidebar
Top Header
Metric Cards
Device Table
Remote Access Panel
Backup Status Panel
```

---

# Current State

The dashboard currently exists in:

```txt
apps/web/src/pages/index.astro
```

The page contains:

```txt
Navigation
Header
Metrics
Device table
Remote access panel
Backup panel
Mock data
```

---

# Target Structure

Create:

```txt
apps/web/src/components/
```

with:

```txt
AppShell.astro
Sidebar.astro
TopHeader.astro
MetricCard.astro
DeviceTable.astro
RemoteAccessPanel.astro
BackupStatusPanel.astro
```

---

# Page Structure

After refactor:

```txt
apps/web/src/pages/index.astro
```

should be responsible only for:

```txt
Importing layout components
Providing mock data
Rendering the dashboard
```

---

# Components

## AppShell

```txt
AppShell.astro
```

Responsibilities:

```txt
Page background
Main layout wrapper
Sidebar placement
Main content area
```

---

## Sidebar

```txt
Sidebar.astro
```

Responsibilities:

```txt
Hi5Central logo
Primary navigation
Secure tenant mode card
```

Navigation items:

```txt
Dashboard
Devices
Remote Access
Patching
Backup
Policies
Reports
Settings
```

---

## Top Header

```txt
TopHeader.astro
```

Responsibilities:

```txt
Tenant label
Page title
View Docs button
New Session button
```

---

## Metric Card

```txt
MetricCard.astro
```

Responsibilities:

```txt
Display metric label
Display metric value
Display metric detail
```

Used for:

```txt
Total Devices
Online Devices
Patch Exposure
Active Sessions
```

---

## Device Table

```txt
DeviceTable.astro
```

Responsibilities:

```txt
Render device list
Show online/offline status
Show health
Show patch count
```

---

## Remote Access Panel

```txt
RemoteAccessPanel.astro
```

Responsibilities:

```txt
Show remote access status
Show Connect button
Show Background button
Document stream/input separation principle
```

---

## Backup Status Panel

```txt
BackupStatusPanel.astro
```

Responsibilities:

```txt
Show backup protection status
Show managed backup storage message
Show protected device count
```

---

# Design Rules

All components should follow the same visual style:

```txt
Rounded corners
Soft borders
White translucent cards
Slate text
Indigo primary actions
Responsive layout
```

---

# Technical Rules

Use:

```txt
Astro components
Tailwind CSS classes
Static mock data for now
No API calls yet
No authentication yet
No database yet
```

---

# Deliverables

Create:

```txt
apps/web/src/components/AppShell.astro
apps/web/src/components/Sidebar.astro
apps/web/src/components/TopHeader.astro
apps/web/src/components/MetricCard.astro
apps/web/src/components/DeviceTable.astro
apps/web/src/components/RemoteAccessPanel.astro
apps/web/src/components/BackupStatusPanel.astro
```

Update:

```txt
apps/web/src/pages/index.astro
```

---

# Success Criteria

```txt
Dashboard still builds on Vercel
Visual layout remains the same
index.astro becomes much smaller
Components are reusable
No functionality is lost
```

---

# Future Work

```txt
Create dashboard data model
Create reusable page layout
Add mobile navigation
Add dark mode support
Add live API data
Add authentication pages
```
