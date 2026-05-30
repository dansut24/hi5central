# Hi5Central Architecture

## High Level Architecture

```txt
Browser
   │
   ▼
Astro Portal
   │
   ▼
Hono API
   │
   ├── PostgreSQL 17
   ├── Redis 8
   ├── BullMQ
   └── Object Storage

Viewer
   │
   ▼
Control Server
   │
   ▼
Agent
```

---

# Frontend

```txt
Astro 6
React 19
Tailwind 4
```

---

# Backend

```txt
Hono 4
Node.js 22
TypeScript
```

---

# Database

```txt
PostgreSQL 17
Kysely
node-pg-migrate
```

---

# Queue System

```txt
Redis 8
BullMQ 5
```

Used for:

```txt
Patch Jobs
Backup Jobs
Automation Jobs
Reporting Jobs
```

---

# Storage

```txt
S3 Compatible Object Storage
```

Used for:

```txt
Backups
Session Recordings
Exports
Files
```

---

# Remote Access

```txt
WebRTC
Coturn
Electron Viewer
Go Agent
```

---

# White Labelling

Supports:

```txt
Portal Branding
Viewer Branding
Agent Branding
Custom Domains
Email Branding
```
