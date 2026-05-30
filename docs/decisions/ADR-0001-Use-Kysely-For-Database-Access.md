# ADR-0001 Use Kysely For Database Access

## Status

Accepted

---

# Context

Hi5Central needs a type-safe way for the Hono API and worker services to communicate with PostgreSQL.

The database layer must be:

```txt
Free
Open source
Type-safe
Lightweight
Self-host friendly
Easy to understand
SQL-like
