# PASS-0006 Mobile Responsive Dashboard

## Overview

This pass improves the Hi5Central dashboard for mobile and tablet devices.

The desktop layout will remain unchanged.

---

# Objective

Improve the dashboard experience on:

```txt
Mobile
Tablet
Desktop
```

---

# Mobile Layout

## Mobile Header

Create:

```txt
apps/web/src/components/MobileHeader.astro
```

Responsibilities:

```txt
Show Hi5Central logo
Show page title
Show action button
Only visible on mobile
```

---

## Mobile Navigation

Create:

```txt
apps/web/src/components/MobileNav.astro
```

Responsibilities:

```txt
Bottom navigation
Quick access to core areas
Mobile-only display
```

Navigation items:

```txt
Home
Devices
Remote
Patching
More
```

---

## Device Cards

Create:

```txt
apps/web/src/components/DeviceCards.astro
```

Responsibilities:

```txt
Replace table on mobile
Show device status
Show health
Show patch count
```

---

# Responsive Rules

## Desktop

```txt
Fixed sidebar
Full table
Two-column dashboard
```

---

## Tablet

```txt
Stacked cards
Readable spacing
Sidebar hidden if needed
```

---

## Mobile

```txt
No fixed sidebar
Top mobile header
Bottom navigation
Stacked metric cards
Device cards instead of table
Large tap targets
```

---

# Success Criteria

```txt
Desktop still looks the same
Mobile layout is usable
Device table is not cramped
Navigation works on small screens
Vercel build succeeds
```

---

# Future Work

```txt
Slide-out menu
Dark mode
Search
Live data
Mobile remote access launcher
```
