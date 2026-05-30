# PASS-0035 Logout Everywhere

## Overview

This pass adds logout-everywhere support to Hi5Central.

Logout everywhere revokes all active sessions for the authenticated user.

---

# Objective

Create:

```txt
POST /auth/logout-everywhere
```

---

# Flow

```txt
Validate Current Session
Load Authenticated User
Revoke All User Sessions
Clear Current Session Cookie
Write Audit Event
Return Success
```

---

# Security Requirements

```txt
Requires Authentication
Revokes All Sessions
Clears Cookie
Writes Audit Event
Prevents Token Reuse
```

---

# Endpoint

```txt
POST /auth/logout-everywhere
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
Endpoint compiles
All user sessions can be revoked
Cookie is cleared
Audit log is written
API build passes
```

---

# Future Work

```txt
Admin session revocation
Session list endpoint
Security settings UI
```
