PASS-0003 Database Design

Overview

This pass defines the initial PostgreSQL schema design for Hi5Central.

The schema is designed around multi-tenancy and long-term scalability.

Database access will be implemented using:

Kysely

Database migrations will be managed using:

node-pg-migrate

⸻

Multi-Tenancy

All tenant-owned tables must contain:

tenant_id

This ensures:

Tenant Isolation
Data Separation
Security

⸻

Core Areas

Tenancy

Tables:

tenants
users
memberships

Responsibilities:

Customer Accounts
Users
Roles
Permissions

⸻

Devices

Tables:

devices
device_groups

Responsibilities:

Inventory
Grouping
Monitoring

⸻

Policies

Tables:

policies
policy_assignments

Responsibilities:

Backup Policies
Patch Policies
Monitoring Policies
Automation Policies

⸻

Patching

Tables:

software_inventory
patch_jobs

Responsibilities:

Software Discovery
Patch Management
Compliance

⸻

Backup

Tables:

backup_policies
backup_jobs
restore_points

Responsibilities:

Backup Scheduling
Retention
Restore Management

⸻

Remote Access

Tables:

remote_sessions
session_recordings

Responsibilities:

Session Tracking
Recording Metadata
Auditing

⸻

Auditing

Tables:

audit_logs

Responsibilities:

Security
Compliance
Activity History

⸻

Licensing

Tables:

subscriptions
feature_flags
licenses

Responsibilities:

Plan Management
Feature Access
Self Hosted Licensing

⸻

White Labelling

Tables:

tenant_branding

Responsibilities:

Portal Branding
Viewer Branding
Agent Branding
Custom Domains
Email Branding

⸻

Design Principles

UUID Primary Keys
Indexed Foreign Keys
Kysely Query Layer
node-pg-migrate Migrations
Soft Deletes
Audit Everything
Multi-Tenant First
Security First

⸻

Deliverables

Created:

docs/03-database-design.md

⸻

Future Work

Kysely Database Package
Migration Framework
Authentication Tables
API Integration
Redis Integration
Audit Framework
Feature Flag System
