# PASS-0038 Protected Dashboard Layout

## Overview

This pass creates the authenticated dashboard layout used throughout Hi5Central.

The dashboard layout becomes the foundation for all authenticated pages.

---

# Objective

Create a reusable authenticated application shell.

---

# Dashboard Structure

```txt
AppShell
├── Header
├── Sidebar
├── Main Content Area
└── Mobile Navigation
```

---

# Initial Navigation

```txt
Dashboard
Devices
Remote Access
Patching
Backup
Policies
Settings
```

---

# Layout Goals

```txt
Responsive
Theme Aware
Mobile Friendly
Desktop Friendly
Reusable
Authentication Ready
```

---

# Page Locations

Create:

```txt
apps/web/src/layouts/DashboardLayout.astro
apps/web/src/pages/dashboard/index.astro
```

---

# Dashboard Layout Responsibilities

```txt
Header
Sidebar
Mobile Navigation
Theme Switcher
Page Content Slot
```

---

# Security

Protected routes will eventually require:

```txt
Valid Session
Authenticated User
Tenant Context
```

Authentication enforcement is implemented in later passes.

---

# Success Criteria

```txt
Dashboard route exists
Dashboard layout exists
Responsive layout works
Theme support works
Web build passes
```

---

# Future Work

```txt
Current User Provider
Route Guards
Navigation Permissions
Feature Flag Navigation
Tenant Switcher
User Menu
```
