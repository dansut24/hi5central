# Hi5Central Local Development

## Requirements

Install:

```txt
Node.js 22 LTS
pnpm 10
PostgreSQL 17
Redis 8
Git
Docker Desktop
```

---

# Clone Repository

```bash
git clone https://github.com/dansut24/hi5central.git

cd hi5central
```

---

# Install Dependencies

```bash
pnpm install
```

---

# Environment Variables

Create:

```txt
.env
```

Required:

```txt
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
```

---

# Start Development

```bash
pnpm dev
```

---

# Database Migrations

Migration system:

```txt
node-pg-migrate
```

Create migration:

```bash
pnpm migrate:create
```

Run migrations:

```bash
pnpm migrate
```

---

# Database Access

Database access uses:

```txt
Kysely
```

Example:

```ts
db.selectFrom("devices")
  .selectAll()
  .execute();
```
