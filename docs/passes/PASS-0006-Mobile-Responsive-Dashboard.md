# PASS-0006 Mobile Responsive Dashboard and Navigation Drawer

## Overview

This pass improves the Hi5Central dashboard experience on mobile and tablet devices while preserving the existing desktop layout.

The original mobile concept used a bottom navigation bar. This was rejected because Hi5Central will have too many modules for a simple bottom navigation pattern.

The revised approach uses a mobile slide-out navigation drawer.

---

# Objective

Improve the dashboard experience on:

```txt
Mobile
Tablet
Desktop
```

---

# Navigation Decision

## Rejected Approach

```txt
Bottom navigation bar
```

Reason:

```txt
Too limited for Hi5Central modules
Does not scale well
Only supports a few navigation items
Would hide important platform areas
```

---

## Accepted Approach

```txt
Mobile slide-out navigation drawer
```

Reason:

```txt
Supports full navigation
Scales as modules are added
Feels familiar on mobile
Keeps desktop sidebar unchanged
```

---

# Mobile Layout

## Mobile Header

Created:

```txt
apps/web/src/components/MobileHeader.astro
```

Responsibilities:

```txt
Show Hi5Central logo
Show page title
Show menu button
Only visible on mobile
```

---

## Mobile Drawer

Created:

```txt
apps/web/src/components/MobileDrawer.astro
```

Responsibilities:

```txt
Slide out from the left
Show full navigation menu
Show secure tenant mode card
Close when overlay is tapped
Close when close button is tapped
Close when Escape key is pressed
Only visible on mobile
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

## Device Cards

Created:

```txt
apps/web/src/components/DeviceCards.astro
```

Responsibilities:

```txt
Replace table on mobile
Show device status
Show health
Show patch count
Show user and operating system
```

---

# Responsive Rules

## Desktop

```txt
Fixed sidebar
Desktop header
Full table
Two-column dashboard
```

---

## Tablet

```txt
Responsive spacing
Stacked cards where required
Readable table layout
```

---

## Mobile

```txt
No fixed sidebar
Top mobile header
Slide-out navigation drawer
Stacked metric cards
Device cards instead of table
Large tap targets
```

---

# Implemented Files

Created:

```txt
apps/web/src/components/MobileHeader.astro
apps/web/src/components/MobileDrawer.astro
apps/web/src/components/DeviceCards.astro
```

Removed from active use:

```txt
apps/web/src/components/MobileNav.astro
```

Updated:

```txt
apps/web/src/pages/index.astro
```

---

# Dashboard Behaviour

## Mobile

Uses:

```txt
MobileHeader
MobileDrawer
DeviceCards
```

Does not use:

```txt
Desktop sidebar
Desktop header
Device table
Bottom navigation
```

---

## Tablet

Uses:

```txt
Responsive metric cards
Improved spacing
Desktop-style device table from medium screen upward
```

---

## Desktop

Uses:

```txt
Fixed sidebar
Desktop header
Device table
Two-column dashboard layout
```

---

# Drawer Behaviour

The drawer supports:

```txt
Open from menu button
Close from close button
Close from overlay click
Close from Escape key
Body scroll lock while open
```

---

# Design Principles

The following principles were applied:

```txt
Mobile-first usability
Large tap targets
Readable typography
Consistent spacing
Responsive layout
Navigation scalability
Modern SaaS styling
```

Visual style:

```txt
Rounded corners
Soft shadows
White translucent cards
Slate colour palette
Indigo accent colour
```

---

# Success Criteria

```txt
Desktop layout remains unchanged
Mobile layout is usable
Device table is not cramped on mobile
Mobile drawer provides full navigation
Bottom navigation is no longer used
Vercel build succeeds
```

---

# Current Status

```txt
Desktop dashboard operational
Mobile dashboard operational
Mobile slide-out drawer implemented
Mobile device cards implemented
Responsive behaviour implemented
Ready for design system pass
```

---

# Future Work

```txt
Improve drawer animation
Add icons to drawer navigation
Add active route detection
Add tenant switcher
Add notifications
Add global search
Add dark mode
Add live API integration
Add authentication
Add PWA support
```
