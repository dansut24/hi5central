# PASS-0008 Brand Theme and Dark Mode

## Overview

This pass introduces Hi5Central brand theme tokens and dark mode support.

The platform must support:

```txt
System theme
Light theme
Dark theme
```

---

# Objective

Create a theme system that can support:

```txt
Light mode
Dark mode
System preference
Future tenant branding
Future custom colours
```

---

# Theme Strategy

Use CSS variables for core design tokens.

This allows:

```txt
Consistent styling
Easy dark mode
Tenant branding later
Reduced duplicate Tailwind classes
```

---

# Theme Modes

## System

```txt
Uses the device/browser preferred colour scheme
```

---

## Light

```txt
Forces light theme
```

---

## Dark

```txt
Forces dark theme
```

---

# Design Tokens

Core tokens:

```txt
Background
Foreground
Muted text
Card background
Border
Primary colour
Primary hover
Success
Warning
Danger
Shadow
```

---

# Implementation Plan

Update:

```txt
apps/web/src/styles/global.css
```

Add:

```txt
:root
[data-theme="light"]
[data-theme="dark"]
@media prefers-color-scheme
```

---

# Future Work

```txt
Theme toggle component
Persist user theme preference
Tenant-level branding
Custom accent colours
Dark mode dashboard refinement
```
