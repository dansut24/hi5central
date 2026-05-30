# PASS-0018 Session Management

## Overview

This pass defines session management for Hi5Central.

Sessions maintain authenticated access after a successful login.

---

# Objective

Create secure session management supporting:

```txt
Portal Access
Session Tracking
Session Revocation
Logout
Logout Everywhere
Audit Logging
```

---

# Session Storage

Create:

```txt
sessions
```

---

# Session Table

Fields:

```txt
id
user_id
session_token_hash
ip_address
user_agent
created_at
expires_at
last_activity_at
revoked_at
```

---

# Token Storage

Raw session tokens must never be stored.

Store only:

```txt
SHA-256 hash of session token
```

---

# Cookie Security

Session cookies must use:

```txt
HttpOnly
Secure
SameSite=Lax
Path=/
```

Production cookies must only be sent over HTTPS.

---

# Session Expiry

Sessions must expire automatically.

Default expiry:

```txt
14 days
```

Future configurable options:

```txt
Tenant session policy
Remember me
Short-lived admin sessions
```

---

# Logout

Logout should:

```txt
Revoke current session
Clear session cookie
Write audit event
```

---

# Logout Everywhere

Logout everywhere should:

```txt
Revoke all active sessions for user
Clear current session cookie
Write audit event
```

---

# Session Revocation

Admins should be able to revoke user sessions.

Use cases:

```txt
Compromised account
Technician leaves company
Tenant admin action
Security incident
```

---

# Session Audit Events

Audit:

```txt
Login Success
Login Failure
Logout
Logout Everywhere
Session Revoked
Session Expired
```

---

# Security Requirements

```txt
No plaintext session tokens
Secure cookies
Session expiry
Session revocation
Audit logging
IP and user-agent tracking
```

---

# Success Criteria

```txt
Session architecture documented
Session table defined
Cookie rules defined
Revocation rules defined
Audit requirements defined
```

---

# Future Work

```txt
Session Database Migration
Session Middleware
Current User Endpoint
Logout Endpoint
Logout Everywhere Endpoint
Admin Session Revocation
```
