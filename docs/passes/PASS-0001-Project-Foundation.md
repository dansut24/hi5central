PASS-0001 Project Foundation

Overview

This pass establishes the initial Hi5Central platform foundation.

The objective is to define the technology stack, repository structure, deployment model, and development standards before any feature development begins.

⸻

Technology Stack

Frontend

Astro 6
React 19
Tailwind CSS 4

⸻

Backend

Node.js 22 LTS
Hono 4
TypeScript

⸻

Database

PostgreSQL 17
Kysely
node-pg-migrate

⸻

Queue System

Redis 8
BullMQ 5

⸻

Agent

Go

⸻

Viewer

Electron

⸻

Remote Access

WebRTC
Coturn

⸻

Storage

S3 Compatible Object Storage

Used for:

Backups
Session Recordings
Exports
File Storage

⸻

Repository Structure

hi5central/
apps/
  web/
  api/
packages/
  db/
  shared/
docs/
infra/
docker-compose.yml
package.json
pnpm-workspace.yaml
.env.example

⸻

Deployment Models

Managed Cloud

Infrastructure managed by Hi5Central.

Responsibilities:

Infrastructure
Storage
Backups
Monitoring
Updates
Database
Redis
Object Storage

⸻

Self Hosted

Infrastructure managed by customer.

Responsibilities:

VPS
Storage
Backups
DNS
TLS
PostgreSQL
Redis
Object Storage

Delivered as:

Docker Images
Docker Compose
Licence Key
Documentation

No source code is provided.

⸻

Security Principles

Argon2id Password Hashing
TLS Everywhere
Audit Logging
Feature Flags
Tenant Isolation
AES-256-GCM Encryption
No Plaintext Secrets
Principle of Least Privilege

⸻

White Labelling

Future support includes:

Portal Branding
Viewer Branding
Agent Branding
Custom Domains
Email Branding

⸻

Deliverables

Created:

package.json
pnpm-workspace.yaml
docker-compose.yml
.env.example

⸻

Future Work

Architecture Definition
Database Design
Dashboard Shell
Authentication
Multi-Tenancy
Database Package Foundation
Kysely Integration
Electron Viewer Foundation
