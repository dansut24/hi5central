# PASS-0020 Tenant Management Foundation

## Overview

This pass defines tenant management for Hi5Central.

Tenants represent customer organisations.

All customer-owned resources must be scoped to a tenant.

---

# Objective

Define the tenant foundation for:

```txt
Customer Organisations
Users
Memberships
Roles
Feature Flags
Subscriptions
Branding
White Labelling
```

---

# Tenant Table

Uses:

```txt
tenants
```

Fields:

```txt
id
name
slug
plan
status
created_at
updated_at
```

---

# Memberships

Uses:

```txt
memberships
```

Fields:

```txt
id
tenant_id
user_id
role
created_at
```

---

# Roles

Supported roles:

```txt
owner
admin
technician
readonly
```

---

# Role Responsibilities

## Owner

```txt
Full tenant control
Billing access
User management
Security settings
```

---

## Admin

```txt
User management
Policy management
Device management
Reporting
```

---

## Technician

```txt
Device access
Remote sessions
Scripts
Patching actions
Backup actions
```

---

## Readonly

```txt
View devices
View reports
View audit logs
No write access
```

---

# Feature Flags

Uses:

```txt
feature_flags
```

Fields:

```txt
id
tenant_id
feature_name
enabled
```

Examples:

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

# Subscriptions

Uses:

```txt
subscriptions
```

Fields:

```txt
id
tenant_id
plan
status
renewal_date
```

Plans:

```txt
free
solo
team
msp
enterprise
self_hosted
```

---

# Branding

Uses:

```txt
tenant_branding
```

Fields:

```txt
id
tenant_id
company_name
logo_url
favicon_url
primary_colour
secondary_colour
viewer_name
viewer_icon_url
agent_name
support_exe_name
custom_domain
created_at
updated_at
```

---

# White Labelling

White labelling can customise:

```txt
Portal Logo
Portal Colours
Login Screen
Email Templates
Viewer Name
Viewer Icon
Agent Name
Support EXE Name
Custom Domain
```

---

# Tenant Isolation

All tenant-owned resources must include:

```txt
tenant_id
```

Tenant isolation must be enforced by:

```txt
API Middleware
Database Query Scoping
Role Checks
Audit Logging
```

---

# Managed Tenants

Managed tenants use Hi5Central-hosted infrastructure.

Hi5Central is responsible for:

```txt
Database
Redis
Object Storage
Backups
Monitoring
Updates
```

---

# Self-Hosted Tenants

Self-hosted tenants use customer-hosted infrastructure.

Customer is responsible for:

```txt
VPS
DNS
TLS
PostgreSQL
Redis
Object Storage
Backups
Operating System
```

---

# Success Criteria

```txt
Tenant model documented
Membership model documented
Roles documented
Feature flags documented
Subscriptions documented
Branding documented
Tenant isolation documented
```

---

# Future Work

```txt
Tenant Database Migration
Tenant Creation API
Membership APIs
Feature Flag APIs
Branding Settings UI
Subscription Enforcement
Tenant Middleware
```
