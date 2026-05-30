# Hi5Central Architecture

## Overview

Hi5Central is a modern RMM, remote access, software patching, and backup management platform.

The platform supports both:

- Managed Cloud Deployment
- Self-Hosted Deployment

---

# Core Architecture

```txt
                ┌─────────────┐
                │  Astro Web  │
                └──────┬──────┘
                       │
                       ▼
                ┌─────────────┐
                │ Hono API    │
                └──────┬──────┘
                       │
      ┌────────────────┼────────────────┐
      ▼                ▼                ▼

 PostgreSQL       Redis/BullMQ     Realtime Gateway

      │                                 │
      ▼                                 ▼

 Licensing                    WebSocket Services

      │
      ▼

 Go Agent
```

---

# Technology Stack

## Frontend

- Astro 6
- React 19
- Tailwind CSS

## Backend

- Node.js 22 LTS
- Hono 4
- TypeScript

## Database

- PostgreSQL 17
- Drizzle ORM

## Queue

- Redis 8
- BullMQ 5

## Agent

- Go

## Remote Access

- WebRTC
- Coturn

---

# Services

## Web Portal

Provides:

- Dashboard
- Device Management
- Policies
- Remote Access
- Backup
- Reporting
- Settings

---

## API Service

Provides:

- Authentication
- Device APIs
- Policy APIs
- Backup APIs
- Patching APIs
- Licensing APIs

---

## Worker Service

Processes:

- Jobs
- Scripts
- Patch Tasks
- Backup Tasks
- Scheduled Actions

---

## Realtime Service

Handles:

- Agent Presence
- Notifications
- Live Updates
- Session Control

---

# Agent Architecture

The agent is written in Go.

Responsibilities:

- Enrolment
- Check-ins
- Inventory
- Jobs
- Software Patching
- Backup Processing
- Session Management

---

# Remote Access Architecture

Remote access uses separate paths.

## Video Path

```txt
Screen Capture
      ↓
Video Encoder
      ↓
WebRTC Video Track
      ↓
Viewer
```

## Input Path

```txt
Viewer
      ↓
Input Channel
      ↓
Go Agent
      ↓
Windows Input Handler
      ↓
Operating System
```

## Important Rule

```txt
Input must never wait for video.
```

This prevents laggy or jumpy mouse movement.

---

# Backup Architecture

Managed Customers:

```txt
Device
   ↓
Go Agent
   ↓
AES-256-GCM Encryption
   ↓
Hi5Central Storage
```

Self-Hosted Customers:

```txt
Device
   ↓
Go Agent
   ↓
AES-256-GCM Encryption
   ↓
Customer Storage
```

Examples:

- S3
- Azure Blob
- Backblaze B2
- Wasabi
- MinIO

---

# Security Principles

- Argon2id password hashing
- TLS everywhere
- Secure cookies
- Role-based access control
- Audit logging
- AES-256-GCM backup encryption
- Signed installers
- Feature flags
- Tenant isolation

---

# Deployment Models

## Managed Cloud

Hosted by Hi5Central.

Customer manages:

- Users
- Devices
- Policies

Hi5Central manages:

- Infrastructure
- Backups
- Security Updates
- Monitoring

---

## Self-Hosted

Customer manages:

- VPS
- Storage
- DNS
- TLS
- Backups

Hi5Central provides:

- Docker Images
- Licensing
- Documentation
- Updates
