# PASS-0032 Logout Endpoint

## Overview

This pass adds logout support to Hi5Central.

Logout revokes the current session, clears the session cookie, and writes an audit event.

---

# Objective

Create:

```txt
POST /auth/logout
```

---

# Logout Flow

```txt
Read Session Cookie
Hash Token
Find Active Session
Revoke Session
Clear Cookie
Write Audit Event
Return Success
```

---

# Security Requirements

```txt
No plaintext session tokens stored
Session token hash lookup only
Revoked sessions cannot be reused
Logout writes audit event
Cookie is cleared
```

---

# Endpoint

```txt
POST /auth/logout
```

---

# Response

```json
{
  "success": true
}
```

---

# Files Updated

```txt
apps/api/src/routes/auth.ts
```

---

# Success Criteria

```txt
Logout endpoint compiles
Session is revoked
Cookie is cleared
Audit log is written
API build passes
```

---

# Future Work

```txt
Logout everywhere
Role middleware
Feature flag middleware
Astro login page
```
