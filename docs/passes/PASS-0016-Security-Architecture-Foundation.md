PASS-0016 Security Architecture Foundation

Overview

This pass establishes the security architecture standards for Hi5Central.

Security is a foundational platform requirement and must be considered during the design, development, deployment, and operation of every platform component.

All future development must align with the standards defined in this pass.

⸻

Objective

Establish security requirements for:

Portal
API
Database
Agent
Viewer
Remote Access
Infrastructure
Managed Deployments
Self Hosted Deployments

⸻

Security Principles

Least Privilege

Users, services, and systems must receive only the permissions required to perform their intended functions.

⸻

Zero Trust

Every request must be authenticated and authorised.

No component should be implicitly trusted.

⸻

Tenant Isolation

Customer data must remain isolated.

All tenant-owned data must enforce:

tenant_id

ownership and access controls.

⸻

Audit Everything

Security-sensitive actions must be logged.

Actions must be attributable to:

User
Technician
Agent
System Process

⸻

Encryption Everywhere

Data must be protected:

In Transit
At Rest
In Backups

⸻

Authentication Security

Password Storage

Passwords must use:

Argon2id

Passwords must never be stored in plaintext.

⸻

Session Security

Sessions must support:

Session Expiration
Session Revocation
Logout Everywhere
Session Auditing

⸻

Multi-Factor Authentication

Future support:

TOTP
Recovery Codes
Email Verification

⸻

Enterprise Authentication

Future support:

SAML
OIDC
Azure AD
Google Workspace

⸻

Authorisation Security

Role Based Access Control

Support:

Owner
Admin
Technician
Read Only

⸻

Tenant Scope Enforcement

Users must only access resources belonging to authorised tenants.

⸻

Feature Flags

Access to platform features must be controlled through:

Plans
Subscriptions
Feature Flags

⸻

Cryptography Standards

Password Hashing

Argon2id

⸻

Symmetric Encryption

AES-256-GCM

⸻

Token Hashing

SHA-256

Used for:

API Tokens
Agent Tokens
Enrollment Tokens
Session Tokens

⸻

Transport Security

TLS 1.2 Minimum
TLS 1.3 Preferred

⸻

Database Security

Database Platform

PostgreSQL 17

⸻

Query Layer

Kysely

⸻

Migration Framework

node-pg-migrate

⸻

Data Protection

Requirements:

No Plaintext Secrets
Tenant Isolation
Indexed Foreign Keys
UUID Primary Keys
Soft Deletes Where Appropriate

⸻

Agent Security

Device Identity

Each device must receive:

Unique Device ID
Unique Device Key

⸻

Enrollment Security

Support:

Enrollment Tokens
Enrollment Expiry
Enrollment Revocation
One-Time Enrollment

⸻

Future Enhancements

Mutual TLS
Certificate Validation
Agent Integrity Verification

⸻

Remote Access Security

Session Requirements

Every session must record:

Technician Identity
Device Identity
Session Identifier
Start Time
End Time

⸻

Supported Modes

Attended
Unattended
Background

⸻

Audit Events

Record:

Session Start
Session End
Clipboard Activity
File Transfers
Commands Executed
Session Recording Access

⸻

Session Recording

Future support:

Recording Retention Policies
Recording Access Controls
Encrypted Storage

⸻

Viewer Security

Electron Security

Requirements:

Context Isolation Enabled
Node Integration Disabled
Content Security Policy
Protocol Validation
Signed Releases

⸻

Update Security

Support:

Signed Updates
Version Validation
Update Auditing

⸻

API Security

Requirements

Authentication
Authorisation
Rate Limiting
Input Validation
Audit Logging

⸻

Security Headers

Support:

Content Security Policy
Strict Transport Security
Frame Protection
Referrer Policies

⸻

Future Enhancements

API Keys
Service Accounts
Webhook Signing

⸻

Infrastructure Security

Containers

Requirements:

Non-Root Containers
Minimal Base Images
Dependency Scanning
Container Scanning

⸻

Network Security

Requirements:

Firewall Rules
Restricted Ports
Private Services
TLS Everywhere

⸻

Monitoring

Support:

Health Monitoring
Security Logging
Alerting
Audit Collection

⸻

Backup Security

Backup Protection

Requirements:

Encrypted Backups
Backup Verification
Restore Auditing
Retention Policies

⸻

Storage Architecture

Large data must be stored in object storage.

Examples:

Backups
Session Recordings
Large Exports
Large File Storage

Metadata remains in PostgreSQL.

⸻

Self Hosted Security

Customer Responsibilities

DNS
TLS
Firewall
Storage
Operating System
Infrastructure Monitoring

⸻

Hi5Central Responsibilities

Application Security Updates
Security Advisories
Migration Updates
Documentation

⸻

Supply Chain Security

Future requirements:

Dependency Scanning
Code Scanning
Container Scanning
SBOM Generation
Release Signing

⸻

Security Documentation

The following documents define platform security standards:

docs/security/overview.md
docs/security/authentication.md
docs/security/agent-security.md
docs/security/remote-access-security.md
docs/security/infrastructure-security.md
docs/security/self-hosted-security.md
docs/security/cryptography.md

⸻

Success Criteria

Security architecture documented
Authentication standards defined
Cryptography standards defined
Agent security defined
Remote access security defined
Infrastructure security defined
Self-hosted security defined

⸻

Future Work

Authentication Foundation
Session Management
Audit Logging Framework
Enrollment Framework
Remote Session Auditing
MFA Implementation
SSO Integration
Security Testing Framework
