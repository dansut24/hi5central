# PASS-0025 Login Endpoint

## Overview

This pass creates the first authentication endpoint.

Users can authenticate using email and password.

---

# Endpoint

```txt
POST /auth/login
```

---

# Request

```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

---

# Flow

```txt
Lookup user
Verify password
Create session
Store session hash
Set secure cookie
Write audit log
Return success
```

---

# Response

```json
{
  "success": true
}
```

---

# Security Requirements

```txt
Argon2id verification
Rate limiting
Audit logging
Secure cookies
No user enumeration
```

---

# Success Criteria

```txt
Login endpoint works
Session created
Cookie created
Audit log written
```

---

# Future Work

```txt
Logout endpoint
Current user endpoint
MFA
Password reset
```
