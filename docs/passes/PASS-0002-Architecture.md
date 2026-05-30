PASS-0002 Architecture Definition

Overview

This pass defines the core Hi5Central platform architecture.

The architecture is designed for scalability, self-hosting support, managed cloud hosting, and future modular expansion.

⸻

Core Services

Web Portal

Astro
React
Tailwind

Responsibilities:

Dashboard
Devices
Policies
Backup
Patching
Reporting
Settings

⸻

API Service

Hono
TypeScript

Responsibilities:

Authentication
Devices
Policies
Backups
Patching
Licensing

⸻

Database

PostgreSQL 17
Drizzle ORM

Responsibilities:

Tenant Data
Devices
Users
Policies
Auditing

⸻

Queue System

Redis 8
BullMQ 5

Responsibilities:

Jobs
Scripts
Backups
Patching
Scheduling

⸻

Remote Access Architecture

Video Path

Screen Capture
→ Encoder
→ WebRTC Video Track
→ Viewer

⸻

Input Path

Viewer
→ Input Channel
→ Go Agent
→ Input Handler
→ Operating System

⸻

Design Principle

Input must never wait for video.

This prevents:

Mouse Lag
Mouse Jumps
Input Delay

⸻

Backup Architecture

Managed Customers

Device
→ Agent
→ AES-256-GCM
→ Hi5Central Storage

⸻

Self Hosted

Device
→ Agent
→ AES-256-GCM
→ Customer Storage

Supported Storage:

S3
Azure Blob
Backblaze
Wasabi
MinIO

⸻

Licensing Architecture

Managed

Database Feature Flags

⸻

Self Hosted

Signed Licence Files

⸻

Deliverables

Created:

docs/01-architecture.md

⸻

Future Work

Database Design
Dashboard UI
Authentication
Licensing Service
