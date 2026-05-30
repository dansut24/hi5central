# PASS-0041 Login API Integration

## Overview

This pass connects the Astro login page to the Hono authentication API.

The login page will submit credentials to:

```txt
POST /auth/login
```

---

# Objective

Allow users to submit the login form from the web portal.

---

# Login Flow

```txt
User enters email and password
  ↓
Login form sends request to API
  ↓
API validates credentials
  ↓
API creates session
  ↓
API sets secure session cookie
  ↓
User is redirected to dashboard
```

---

# Files Created

```txt
apps/web/src/components/LoginForm.astro
```

---

# Files Updated

```txt
apps/web/src/pages/login.astro
```

---

# Security Notes

```txt
Passwords must never be logged
Login requests must use HTTPS in production
Session cookies are HttpOnly
API remains responsible for authentication
```

---

# Success Criteria

```txt
Login form component exists
Login page uses login form
Web build passes
Ready for live API testing
```

---

# Future Work

```txt
Show login errors
Redirect authenticated users away from login page
Add forgot password flow
Add MFA flow
```
