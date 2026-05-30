# PASS-0037 Astro Login Page

## Overview

This pass creates the first Hi5Central login page.

The login page will eventually authenticate against the Hono API.

For this pass, the page focuses on layout, styling, and form structure.

---

# Objective

Create:

```txt
/login
```

---

# Page Location

```txt
apps/web/src/pages/login.astro
```

---

# Login Fields

```txt
Email Address
Password
```

---

# Actions

```txt
Sign In
Forgot Password
```

---

# Design Requirements

```txt
Theme-aware
Mobile-friendly
Light mode support
Dark mode support
Hi5Central branding
```

---

# Security Notes

The login form must eventually submit credentials only over HTTPS in production.

Passwords must never be logged.

Authentication is handled by the Hono API.

---

# Success Criteria

```txt
Login page exists
Page is responsive
Theme styles work
Web build passes
```

---

# Future Work

```txt
Connect form to POST /auth/login
Show validation errors
Redirect to dashboard after login
Add forgot password flow
Add MFA step
```
