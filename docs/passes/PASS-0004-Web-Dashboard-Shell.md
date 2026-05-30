# PASS-0004 Web Dashboard Shell

## Overview

This pass creates the first deployable Hi5Central web dashboard.

The dashboard is built using Astro 6, React 19 support, and Tailwind CSS.

The first dashboard is static and uses mock data only.

---

# Web Application

## Location

```txt
apps/web
```

---

## Framework

```txt
Astro 6
React 19
Tailwind CSS
```

---

# Created Files

```txt
apps/web/package.json
apps/web/astro.config.mjs
apps/web/tsconfig.json
apps/web/src/pages/index.astro
apps/web/src/styles/global.css
```

---

# Dashboard Sections

## Sidebar

Includes:

```txt
Dashboard
Devices
Remote Access
Patching
Backup
Policies
Reports
Settings
```

---

## Top Header

Includes:

```txt
Tenant name
Environment label
View Docs button
New Session button
```

---

## Metrics

Initial dashboard cards:

```txt
Total Devices
Online Devices
Patch Exposure
Active Sessions
```

---

## Device Table

Mock device data includes:

```txt
Device name
Assigned user
Operating system
Online status
Health status
Patch count
```

---

## Remote Access Panel

Documents the core remote access rule:

```txt
Input must never wait for video.
```

---

## Backup Panel

Shows the intended managed-backup model:

```txt
Managed customers use Hi5Central-managed encrypted object storage.
```

---

# Deployment

## Provider

```txt
Vercel
```

---

## Vercel Settings

Root Directory:

```txt
apps/web
```

Install Command:

```txt
corepack enable && cd ../.. && corepack prepare pnpm@10.28.2 --activate && pnpm install
```

Build Command:

```txt
pnpm build
```

Output Directory:

```txt
dist
```

Node Version:

```txt
22.x
```

---

# Build Issue Resolved

## Problem

Vercel originally failed with:

```txt
ERR_PNPM_META_FETCH_FAIL
Value of "this" must be of type URLSearchParams
```

## Resolution

Forced Corepack to activate the correct pnpm version:

```txt
pnpm@10.28.2
```

---

# Second Build Issue Resolved

## Problem

Vercel ran the wrong build script because the web package was not configured correctly.

## Resolution

Updated:

```txt
apps/web/package.json
```

to include:

```txt
build: astro build
```

---

# Ignored Build Step

Docs-only commits should not deploy the web app.

Configured Vercel ignored build step under:

```txt
Project Settings
Build and Deployment
Ignored Build Step
```

---

# Current Status

```txt
Vercel build successful
Dashboard deployed
Static mock dashboard working
```

---

# Future Work

```txt
Create layout component
Create reusable dashboard cards
Create device table component
Add API service
Add database package
Add authentication pages
Add tenant-aware routing
Add Platform Admin area
```
