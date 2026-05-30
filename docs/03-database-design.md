Hi5Central Database Design

Overview

PostgreSQL 17 is the primary database.

Kysely is used as the query layer.

Database migrations are managed using:

node-pg-migrate

All tenant-owned tables must contain:

tenant_id

to support multi-tenancy.

⸻

Core Tables

Tenants

tenants

Stores customer organizations.

Fields:

id
name
slug
plan
status
created_at
updated_at

⸻

Users

users

Stores platform users.

Fields:

id
email
password_hash
first_name
last_name
status
created_at
updated_at

Passwords are hashed using:

Argon2id

⸻

Memberships

memberships

Links users to tenants.

Fields:

id
tenant_id
user_id
role
created_at

Roles:

owner
admin
technician
readonly

⸻

Devices

Devices

devices

Stores enrolled devices.

Fields:

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

⸻

Device Groups

device_groups

Stores logical device groups.

Fields:

id
tenant_id
name
description

⸻

Policies

Policies

policies

Fields:

id
tenant_id
name
policy_type
enabled
created_at
updated_at

Examples:

patching
backup
monitoring
automation

⸻

Policy Assignments

policy_assignments

Fields:

id
policy_id
device_id
device_group_id
site_id
tenant_id

⸻

Software Patching

Software Inventory

software_inventory

Fields:

id
tenant_id
device_id
name
version
publisher
install_date

⸻

Patch Jobs

patch_jobs

Fields:

id
tenant_id
device_id
status
job_type
created_at
updated_at

⸻

Backup

Backup Policies

backup_policies

Fields:

id
tenant_id
name
schedule
retention
storage_provider

⸻

Backup Jobs

backup_jobs

Fields:

id
tenant_id
device_id
status
started_at
completed_at

⸻

Restore Points

restore_points

Fields:

id
tenant_id
device_id
backup_job_id
created_at
size_bytes

⸻

Remote Access

Remote Sessions

remote_sessions

Fields:

id
tenant_id
device_id
technician_id
status
started_at
ended_at

⸻

Session Recordings

session_recordings

Fields:

id
tenant_id
session_id
storage_path
created_at

⸻

Audit Logging

Audit Logs

audit_logs

Fields:

id
tenant_id
user_id
action
resource_type
resource_id
ip_address
created_at

⸻

Licensing

Subscriptions

subscriptions

Fields:

id
tenant_id
plan
status
renewal_date

⸻

Feature Flags

feature_flags

Fields:

id
tenant_id
feature_name
enabled

Examples:

remote_access
backup
patching
api_access
branding

⸻

White Labelling

Tenant Branding

tenant_branding

Fields:

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

⸻

Self-Hosted Licensing

Licenses

licenses

Fields:

id
instance_id
license_key
status
expires_at

⸻

Future Tables

Planned for future releases:

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

⸻

Design Principles

* Multi-tenant first
* Audit everything
* No plaintext secrets
* Soft deletes where appropriate
* UUID primary keys
* Indexed foreign keys
* Kysely query layer
* node-pg-migrate migrations
* Security first
