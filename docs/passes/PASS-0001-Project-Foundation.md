PASS-0001 Project Foundation

Overview

This pass establishes the initial Hi5Central platform foundation.

The objective is to define the technology stack, repository structure, deployment model, and development standards before any feature development begins.

⸻

Technology Stack

Frontend

Astro 6
React 19
Tailwind CSS

⸻

Backend

Node.js 22 LTS
Hono 4
TypeScript

⸻

Database

PostgreSQL 17
Drizzle ORM

⸻

Queue System

Redis 8
BullMQ 5

⸻

Agent

Go

⸻

Remote Access

WebRTC
Coturn

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

⸻

Self Hosted

Infrastructure managed by customer.

Responsibilities:

VPS
Storage
Backups
DNS
TLS

⸻

Security Principles

Argon2id Password Hashing
TLS Everywhere
Audit Logging
Feature Flags
Tenant Isolation
AES-256-GCM Encryption

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
