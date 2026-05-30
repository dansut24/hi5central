# PASS-0012 Database Viewer and White Labelling Decisions

## Overview

This pass updates several core architectural decisions for Hi5Central.

The project will move away from Drizzle ORM and use Kysely for database access.

The platform will also support an installable external technician viewer and white-labelled reseller deployments.

---

# Database Layer Decision

## Previous Decision

```txt
PostgreSQL 17
Drizzle ORM
```

---

## Updated Decision

```txt
PostgreSQL 17
Kysely
node-pg-migrate
```

---

# Reason For Change

Kysely was selected because it is:

```txt
Free
Open source
TypeScript-first
SQL-like
Lightweight
Easy to understand
Less ORM-heavy
Good for PostgreSQL
Suitable for self-hosted deployments
```

---

# Database Architecture

## Hono API

```txt
Hono API
```

communicates with:

```txt
Kysely Query Builder
```

which communicates with:

```txt
PostgreSQL 17
```

---

# Migration System

Database migrations will use:

```txt
node-pg-migrate
```

Responsibilities:

```txt
Create tables
Alter tables
Add indexes
Add constraints
Track migration history
```

---

# Self-Hosted Impact

Self-hosted customers do not need to install or understand Kysely.

Self-hosted customers receive:

```txt
Docker images
Docker Compose files
Environment file
Licence key
Documentation
```

They do not receive:

```txt
Source code
TypeScript project files
Kysely source definitions
Migration internals unless required
```

---

# Updated Stack

## Frontend

```txt
Astro 6
React 19
Tailwind CSS
```

---

## API

```txt
Hono 4
Node.js 22 LTS
TypeScript
```

---

## Database

```txt
PostgreSQL 17
Kysely
node-pg-migrate
```

---

## Queue

```txt
Redis 8
BullMQ 5
```

---

## Agent

```txt
Go
```

---

## Viewer

```txt
Electron
```

---

## Remote Access

```txt
WebRTC
Coturn
```

---

# External Technician Viewer

## Decision

Hi5Central will use an external installable technician viewer for remote sessions.

---

# Viewer Technology

The current recommendation is:

```txt
Electron
```

---

# Viewer Responsibilities

The viewer will support:

```txt
Remote screen viewing
Mouse control
Keyboard control
Clipboard sync
File transfer
Session tabs
Multi-monitor support
Chat
Session recording
Custom protocol launch
```

---

# Viewer Install Model

Technicians install the viewer once.

The web portal launches sessions using a custom protocol link.

Example:

```txt
hi5central-viewer://session/{session_id}
```

---

# Why Electron

Electron was selected because it supports:

```txt
Cross-platform desktop apps
Fast UI development
Custom protocol handlers
Clipboard access
File system access
Drag and drop
Session tabs
Auto-updates
```

---

# Alternatives Considered

## Tauri

Pros:

```txt
Smaller installer
Lower memory usage
Modern
```

Cons:

```txt
Rust backend required
More native complexity
Smaller ecosystem
```

---

## Qt / C++

Pros:

```txt
Native performance
Small runtime
Strong desktop control
```

Cons:

```txt
Higher development cost
More cross-platform complexity
Slower UI iteration
```

---

## Browser Viewer

Pros:

```txt
No install required
Easy access
```

Cons:

```txt
Clipboard limitations
Keyboard shortcut limitations
File system limitations
Weaker remote-control experience
Browser security restrictions
```

---

# White Labelling

## Decision

Hi5Central will support white-labelled reseller deployments without giving customers source code.

---

# White-Label Capabilities

White-labelled tenants can customise:

```txt
Company name
Logo
Favicon
Primary colour
Secondary colour
Login screen
Portal branding
Email templates
Viewer name
Viewer icon
Agent name
Support executable name
Custom domains
```

---

# Branding Data

Create a future database table:

```txt
tenant_branding
```

Fields:

```txt
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
```

---

# Managed White Labelling

Managed customers access white labelling through the portal.

They do not receive source code.

They receive:

```txt
Branded portal experience
Branded viewer installer
Branded support executable
Branded emails
Custom domain support
```

---

# Self-Hosted White Labelling

Self-hosted customers receive:

```txt
Docker images
Licence key
Branding configuration
Documentation
```

They do not receive:

```txt
Astro source code
Hono source code
Go source code
Electron source code
```

---

# Source Code Policy

Default commercial delivery does not include source code.

Customers receive:

```txt
Portal access
Compiled viewer
Compiled agent
Docker images
Documentation
```

Source code access is reserved for:

```txt
Enterprise source licence
Custom commercial agreement
High-value strategic partnership
```

---

# Future Modules

White labelling will require:

```txt
Branding Manager
Custom Domain Manager
Email Template Manager
Viewer Branding Builder
Agent Installer Branding
Support EXE Branding
```

---

# Success Criteria

```txt
Project documentation updated
Database layer decision updated
Viewer decision documented
White labelling decision documented
Self-hosting impact documented
```

---

# Future Work

```txt
Update docs/01-architecture.md
Update docs/03-database-design.md
Create docs/13-white-labelling.md
Create docs/14-viewer-architecture.md
Create packages/db using Kysely
Create API database connection
```
