# Hi5Central Database Design

## Overview

PostgreSQL 17 is the primary database.

Drizzle ORM is used for schema management and migrations.

All tenant-owned tables must contain:

```txt
tenant_id
```

to support multi-tenancy.

---

# Core Tables

## Tenants

```txt
tenants
```

Stores customer organizations.

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

## Users

```txt
users
```

Stores platform users.

Fields:

```txt
id
email
password_hash
first_name
last_name
status
created_at
updated_at
```

Passwords are hashed using:

```txt
Argon2id
```

---

## Memberships

```txt
memberships
```

Links users to tenants.

Fields:

```txt
id
tenant_id
user_id
role
created_at
```

Roles:

```txt
owner
admin
technician
readonly
```

---

# Devices

## Devices

```txt
devices
```

Stores enrolled devices.

Fields:

```txt
id
tenant_id
device_name
hostname
operating_system
agent_version
status
last_seen
created_at
updated_at
```

---

## Device Groups

```txt
device_groups
```

Stores logical device groups.

Fields:

```txt
id
tenant_id
name
description
```

---

# Policies

## Policies

```txt
policies
```

Fields:

```txt
id
tenant_id
name
policy_type
enabled
created_at
updated_at
```

Examples:

```txt
patching
backup
monitoring
automation
```

---

## Policy Assignments

```txt
policy_assignments
```

Fields:

```txt
id
policy_id
device_id
device_group_id
site_id
tenant_id
```

---

# Software Patching

## Software Inventory

```txt
software_inventory
```

Fields:

```txt
id
tenant_id
device_id
name
version
publisher
install_date
```

---

## Patch Jobs

```txt
patch_jobs
```

Fields:

```txt
id
tenant_id
device_id
status
job_type
created_at
updated_at
```

---

# Backup

## Backup Policies

```txt
backup_policies
```

Fields:

```txt
id
tenant_id
name
schedule
retention
storage_provider
```

---

## Backup Jobs

```txt
backup_jobs
```

Fields:

```txt
id
tenant_id
device_id
status
started_at
completed_at
```

---

## Restore Points

```txt
restore_points
```

Fields:

```txt
id
tenant_id
device_id
backup_job_id
created_at
size_bytes
```

---

# Remote Access

## Remote Sessions

```txt
remote_sessions
```

Fields:

```txt
id
tenant_id
device_id
technician_id
status
started_at
ended_at
```

---

## Session Recordings

```txt
session_recordings
```

Fields:

```txt
id
tenant_id
session_id
storage_path
created_at
```

---

# Audit Logging

## Audit Logs

```txt
audit_logs
```

Fields:

```txt
id
tenant_id
user_id
action
resource_type
resource_id
ip_address
created_at
```

---

# Licensing

## Subscriptions

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

---

## Feature Flags

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
backup
patching
api_access
branding
```

---

# Self-Hosted Licensing

## Licenses

```txt
licenses
```

Fields:

```txt
id
instance_id
license_key
status
expires_at
```

---

# Future Tables

Planned for future releases:

```txt
alerts
notifications
webhooks
scripts
automation_rules
reports
knowledge_base
documentation
vulnerability_scans
mdm_devices
```

---

# Design Principles

- Multi-tenant first
- Audit everything
- No plaintext secrets
- Soft deletes where appropriate
- UUID primary keys
- Indexed foreign keys
- Drizzle-managed migrations
- Security first
