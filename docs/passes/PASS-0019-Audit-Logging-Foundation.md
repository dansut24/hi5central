# PASS-0019 Audit Logging Foundation

## Overview

This pass defines the audit logging foundation for Hi5Central.

Audit logging records security-sensitive and operationally important actions.

Audit logs are required for:

```txt
Security
Compliance
Troubleshooting
Customer Accountability
Technician Accountability
```

---

# Objective

Create a consistent audit logging model for the platform.

---

# Audit Table

Create:

```txt
audit_logs
```

---

# Audit Log Fields

Fields:

```txt
id
tenant_id
user_id
action
resource_type
resource_id
ip_address
user_agent
metadata
created_at
```

---

# Append-Only Requirement

Audit logs must be append-only.

Audit logs must not be edited.

Audit logs must not be deleted through normal application flows.

---

# Events To Audit

## Authentication

```txt
Login Success
Login Failure
Logout
Logout Everywhere
Password Reset Requested
Password Reset Completed
Email Verified
```

---

## User Management

```txt
User Created
User Updated
User Disabled
User Deleted
Role Changed
Membership Created
Membership Removed
```

---

## Device Management

```txt
Device Enrolled
Device Updated
Device Deleted
Device Group Changed
Agent Revoked
```

---

## Remote Access

```txt
Remote Session Started
Remote Session Ended
Clipboard Used
File Transfer Started
File Transfer Completed
Command Executed
Session Recording Viewed
```

---

## Policy Management

```txt
Policy Created
Policy Updated
Policy Deleted
Policy Assigned
Policy Unassigned
```

---

## Backup

```txt
Backup Policy Created
Backup Job Started
Backup Job Failed
Backup Restore Started
Backup Restore Completed
Restore Point Deleted
```

---

## Patching

```txt
Patch Policy Created
Patch Policy Updated
Patch Job Started
Patch Job Completed
Patch Job Failed
Patch Approved
Patch Denied
```

---

## Licensing

```txt
Plan Changed
Feature Enabled
Feature Disabled
Licence Activated
Licence Expired
```

---

# Metadata

The metadata field stores event-specific details as JSON.

Examples:

```txt
Old Value
New Value
Device ID
Session ID
Policy ID
Error Message
```

---

# Retention

Default retention:

```txt
1 year
```

Future configurable retention:

```txt
Tenant policy
Enterprise custom retention
Self-hosted custom retention
```

---

# Security Requirements

```txt
Append-only logs
Tenant-scoped logs
User attribution
IP address tracking
User-agent tracking
JSON metadata
Retention policy
```

---

# Success Criteria

```txt
Audit log model documented
Events defined
Retention model defined
Append-only requirement defined
Security-sensitive actions listed
```

---

# Future Work

```txt
Audit Log Database Migration
Audit Logging Helper
Audit Middleware
Audit Viewer UI
Audit Retention Jobs
Audit Export
```
