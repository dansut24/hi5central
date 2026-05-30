# PASS-0010 Theme Switcher

## Overview

This pass adds theme switching to Hi5Central.

The platform will support:

```txt
Auto
Light
Dark
```

Theme switcher added to desktop header and mobile drawer.
Mobile drawer is now theme-aware.

---

# Objective

Allow users to control the dashboard theme.

---

# Theme Modes

## Auto

```txt
Uses the browser or operating system preference
```

---

## Light

```txt
Forces the light theme
```

---

## Dark

```txt
Forces the dark theme
```

---

# Storage

Theme preference is stored locally in the browser.

Storage key:

```txt
hi5central-theme
```

---

# Created Files

```txt
apps/web/src/components/ThemeSwitcher.astro
```

---

# Updated Files

```txt
apps/web/src/pages/index.astro
```

---

# Behaviour

When the user selects:

```txt
Auto
```

the app removes the forced theme and allows CSS system preference detection.

When the user selects:

```txt
Light
```

the app sets:

```txt
data-theme="light"
```

on the document element.

When the user selects:

```txt
Dark
```

the app sets:

```txt
data-theme="dark"
```

on the document element.

---

# Future Work

```txt
Save theme preference to user profile
Sync preference across devices
Add tenant-level branding
Add accent colour picker
Add theme option to Settings page
```
