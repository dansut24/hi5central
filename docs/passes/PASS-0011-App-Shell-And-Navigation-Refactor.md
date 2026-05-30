# PASS-0011 App Shell and Navigation Refactor

## Overview

This pass refactors the dashboard layout into a reusable application shell.

The current dashboard page contains layout code, sidebar code, mobile header code, drawer code, and page content in one file.

This pass separates the shared application layout from page-specific content.

---

# Objective

Create a reusable app shell for all authenticated Hi5Central pages.

---

# Problem

The dashboard currently contains repeated layout logic:

```txt
Desktop sidebar
Mobile header
Mobile drawer
Main page wrapper
Page spacing
Navigation links
```

If this remains inside each page, future pages will duplicate code.

---

# Solution

Create reusable shell components:

```txt
AppShell
DesktopSidebar
```

Existing components remain:

```txt
MobileHeader
MobileDrawer
PageHeader
ThemeSwitcher
```

---

# Created Files

```txt
apps/web/src/components/AppShell.astro
apps/web/src/components/DesktopSidebar.astro
```

---

# Updated Files

```txt
apps/web/src/pages/index.astro
```

---

# AppShell Responsibilities

```txt
Import global layout structure
Render MobileHeader
Render MobileDrawer
Render DesktopSidebar
Render main content area
Provide consistent page spacing
```

---

# DesktopSidebar Responsibilities

```txt
Show Hi5Central logo
Show desktop navigation
Show secure tenant mode card
Use theme-aware styling
```

---

# Navigation Items

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

# Success Criteria

```txt
Dashboard still looks the same
Mobile drawer still works
Theme switcher still works
index.astro becomes smaller
Future pages can reuse AppShell
Vercel build succeeds
```

---

# Future Work

```txt
Add route-aware active navigation
Add icons
Add collapsed sidebar mode
Add tenant switcher
Add notifications
Add user profile menu
```
