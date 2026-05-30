PASS-0014 Hono API Foundation

Overview

This pass creates the Hi5Central API service.

The API will be built using:

Hono 4
Node.js 22 LTS
TypeScript

The API will eventually provide:

Authentication
Devices
Policies
Patching
Backup
Reporting
Licensing
White Labelling

This pass only establishes the API foundation.

⸻

Objective

Create:

apps/api

with a working Hono server.

⸻

Created Structure

apps/api/
package.json
tsconfig.json
src/
  index.ts
  routes/
    health.ts
  lib/
    db.ts

⸻

Endpoints

Health

GET /health

Returns:

{
  "status": "ok"
}

⸻

Readiness

GET /ready

Returns:

{
  "status": "ready",
  "database": true
}

If PostgreSQL is unavailable:

{
  "status": "not_ready",
  "database": false
}

⸻

Database Integration

The API uses:

@hi5central/db

for database connectivity.

⸻

Environment Variables

Required:

DATABASE_URL
PORT

⸻

Success Criteria

API starts successfully
/health responds
/ready responds
Database connectivity tested
Vercel build unaffected

⸻

Future Work

Authentication Module
Tenant Module
Device Module
Policy Module
Feature Flag Module
Licensing Module
Audit Logging
