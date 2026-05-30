# Hi5Central Project Overview

## Overview

Hi5Central is a modern Remote Monitoring and Management (RMM) platform designed for MSPs, internal IT teams, and enterprise organisations.

The platform provides:

```txt
Remote Access
Device Management
Patch Management
Backup Management
Monitoring
Automation
Reporting
Multi-Tenant Administration
White Labelling
```

---

# Deployment Models

## Managed

Hosted by Hi5Central.

Includes:

```txt
Portal hosting
Database hosting
Redis hosting
Object storage
Viewer downloads
Automatic upgrades
Monitoring
Backups
```

---

## Self Hosted

Hosted by the customer.

Includes:

```txt
Docker deployment
PostgreSQL
Redis
Object storage
Licence activation
```

No source code is provided.

---

# Core Components

## Web Portal

```txt
Astro 6
React 19
Tailwind 4
```

Responsibilities:

```txt
Dashboard
Device Management
Policies
Reporting
Configuration
Administration
```

---

## API

```txt
Hono 4
Node.js 22
```

Responsibilities:

```txt
Authentication
Device APIs
Policy APIs
Reporting APIs
Licensing
```

---

## Database

```txt
PostgreSQL 17
Kysely
node-pg-migrate
```

---

## Agent

```txt
Go
```

Responsibilities:

```txt
Remote Access
Inventory
Patching
Backup
Monitoring
Automation
```

---

## Viewer

```txt
Electron
```

Responsibilities:

```txt
Remote Control
Clipboard
File Transfer
Chat
Session Recording
Multi Monitor
```

---

# Design Principles

```txt
Security First
Multi Tenant First
API First
Cloud Native
Self Host Ready
White Label Ready
Enterprise Ready
```
