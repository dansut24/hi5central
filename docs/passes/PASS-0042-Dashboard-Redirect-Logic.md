# PASS-0042 Dashboard Redirect Logic

## Overview

This pass adds redirect behaviour for login and dashboard pages.

---

# Objective

Prepare the portal for authenticated navigation.

---

# Behaviour

## Unauthenticated User

```txt
Visits /dashboard
Redirects to /login
```

---

## Authenticated User

```txt
Visits /login
Redirects to /dashboard
```

---

# Files Updated

```txt
apps/web/src/pages/dashboard/index.astro
apps/web/src/pages/login.astro
```

---

# Current Status

The redirect logic is prepared but disabled until live API testing is complete.

---

# Success Criteria

```txt
Redirect logic prepared
Web build passes
Ready for end-to-end testing
```

---

# Future Work

```txt
Enable redirect checks
Live login test
Logout flow test
```
