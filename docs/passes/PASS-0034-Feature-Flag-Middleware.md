# PASS-0034 Feature Flag Middleware

## Overview

This pass adds feature flag middleware to Hi5Central.

Feature flags control which tenants can access specific platform features.

---

# Objective

Create reusable middleware for checking tenant feature access.

---

# Feature Flags

Feature flags are stored in:

```txt
feature_flags
```

---

# Example Features

```txt
remote_access
background_mode
attended_support
patching
advanced_patching
backup
branding
api_access
session_recording
```

---

# Middleware Behaviour

The middleware should:

```txt
Require authenticated user
Read tenant memberships
Check if any tenant has the required feature enabled
Allow access if enabled
Reject access if disabled
```

---

# Forbidden Response

If the feature is not enabled:

```txt
403 Forbidden
```

Response:

```json
{
  "success": false,
  "error": "feature_not_enabled"
}
```

---

# Created Files

```txt
apps/api/src/middleware/features.ts
```

---

# Success Criteria

```txt
Feature middleware compiles
API build succeeds
Routes can require enabled features
Feature disabled response works
```

---

# Future Work

```txt
Tenant-specific feature checks
Plan enforcement
Usage limits
Billing integration
Platform admin override
```
