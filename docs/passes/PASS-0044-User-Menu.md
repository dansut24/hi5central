# PASS-0044 User Menu

## Overview

This pass introduces the authenticated user menu.

The user menu provides access to user-specific actions and account information.

This is the first authenticated UI component added to the Hi5Central platform.

---

# Objective

Add a reusable user menu component that can be used throughout the platform.

---

# Features

## User Information

Display:

```txt
User Name
User Email
Tenant Name
```

---

## Menu Actions

Display:

```txt
Profile
My Account
Theme
Logout
```

---

## Placement

Desktop:

```txt
Top Right Header
```

Mobile:

```txt
Header Menu
```

---

# Files Created

```txt
apps/web/src/components/UserMenu.astro
```

---

# Files Updated

```txt
apps/web/src/layouts/DashboardLayout.astro
```

---

# Initial Data Source

Current implementation uses placeholder data.

Example:

```txt
Hi5Central Admin
admin@hi5central.local
Hi5Central Demo
```

---

# Future Data Source

Authentication API:

```txt
GET /auth/me
```

---

# Security

The user menu must never:

```txt
Expose session identifiers
Expose tenant secrets
Expose authentication tokens
Expose API keys
```

---

# Future Enhancements

```txt
Live current user integration
Avatar support
Profile page
Account settings
Tenant switcher
Organization selector
Platform administrator controls
```

---

# Success Criteria

```txt
User menu component created
Dashboard layout updated
Desktop layout displays menu
Mobile layout displays menu
Web build passes
```

---

# Dependencies

```txt
PASS-0043 End-To-End Authentication Test
```

---

# Status

```txt
READY FOR IMPLEMENTATION
```
