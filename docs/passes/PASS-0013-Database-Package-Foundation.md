# PASS-0013 Database Package Foundation

## Overview

This pass creates the shared Hi5Central database package.

The database package will provide the common database client, database types, and migration foundation used by the API and worker services.

---

# Objective

Create:

```txt
packages/db
```

using:

```txt
Kysely
PostgreSQL
node-pg-migrate
pg
```

---

# Package Responsibilities

The database package is responsible for:

```txt
Creating the PostgreSQL connection
Exporting the Kysely client
Defining database table types
Providing migration commands
Providing shared database utilities
```

---

# Created Structure

```txt
packages/db/
  package.json
  tsconfig.json
  src/
    client.ts
    env.ts
    types.ts
    index.ts
  migrations/
```

---

# Database Client

The client will use:

```txt
Kysely
PostgresDialect
pg Pool
```

---

# Environment Variables

Required:

```txt
DATABASE_URL
```

---

# Migration Tool

Migrations will use:

```txt
node-pg-migrate
```

---

# Success Criteria

```txt
Database package exists
Kysely dependency installed
pg dependency installed
node-pg-migrate dependency installed
TypeScript types compile
API can later import database package
```

---

# Future Work

```txt
Create first migration
Create tenants table
Create users table
Create memberships table
Wire API to database package
Add health check
```
