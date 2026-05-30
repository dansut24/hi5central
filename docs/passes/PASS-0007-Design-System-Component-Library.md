# PASS-0007 Design System and Component Library

## Overview

This pass creates the first reusable Hi5Central design system components.

The goal is to stop dashboard pages from becoming large duplicated Astro files.

---

# Objective

Create reusable UI components for:

```txt
Buttons
Cards
Badges
Page headers
Section headers
Stat cards
```

---

# Component Location

Create:

```txt
apps/web/src/components/ui/
```

---

# Components

## Button

```txt
Button.astro
```

Used for:

```txt
Primary actions
Secondary actions
Danger actions
```

---

## Card

```txt
Card.astro
```

Used for:

```txt
Dashboard panels
Metric sections
Content containers
```

---

## Badge

```txt
Badge.astro
```

Used for:

```txt
Online status
Warning status
Plan labels
Feature flags
```

---

## Page Header

```txt
PageHeader.astro
```

Used for:

```txt
Page title
Tenant label
Primary page actions
```

---

## Section Header

```txt
SectionHeader.astro
```

Used for:

```txt
Panel titles
Panel descriptions
```

---

## Stat Card

```txt
StatCard.astro
```

Used for:

```txt
Dashboard metrics
Device totals
Patch exposure
Backup health
```

---

# Design Rules

Use:

```txt
Rounded corners
Soft borders
White translucent cards
Slate text
Indigo primary actions
Consistent spacing
Responsive layout
```

---

# Deliverables

Create:

```txt
apps/web/src/components/ui/Button.astro
apps/web/src/components/ui/Card.astro
apps/web/src/components/ui/Badge.astro
apps/web/src/components/ui/PageHeader.astro
apps/web/src/components/ui/SectionHeader.astro
apps/web/src/components/ui/StatCard.astro
```

Update:

```txt
apps/web/src/pages/index.astro
```

---

# Success Criteria

```txt
Dashboard still looks the same
Reusable UI components exist
Future pages can reuse shared components
Vercel build succeeds
```

---

# Future Work

```txt
Add modal component
Add drawer component
Add table component
Add form components
Add dark mode variants
Add icon support
```
