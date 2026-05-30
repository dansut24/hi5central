# PASS-0026 Session Middleware

## Overview

This pass creates authentication middleware used to protect API routes.

The middleware validates active sessions before allowing access.

---

# Objective

Support:

```txt
Authenticated Routes
Current User Lookup
Role Validation
Tenant Validation
```

---

# Middleware Flow

```txt
Read cookie
Hash token
Lookup session
Validate expiry
Validate revocation
Load user
Load memberships
Attach user context
Continue request
```

---

# Protected Routes

Examples:

```txt
/devices
/policies
/remote-access
/backup
/patching
/settings
```

---

# User Context

Middleware attaches:

```txt
user
tenant
memberships
roles
session
```

---

# Failure Responses

```txt
401 Unauthorized
403 Forbidden
```

---

# Security Requirements

```txt
Hash comparison only
No plaintext session lookup
Expiry enforcement
Revocation enforcement
Tenant isolation
```

---

# Success Criteria

```txt
Middleware validates sessions
Protected routes reject unauthenticated users
User context available
Tenant context available
```

---

# Future Work

```txt
Role middleware
Feature flag middleware
MFA middleware
API key middleware
```
