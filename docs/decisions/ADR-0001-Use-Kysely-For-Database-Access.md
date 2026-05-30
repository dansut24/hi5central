ADR-0001 Use Kysely For Database Access

Status

Accepted

⸻

Overview

This Architectural Decision Record (ADR) documents the decision to use Kysely as the database query layer for Hi5Central.

The goal is to provide a modern, type-safe, maintainable, and self-host-friendly database architecture while keeping the platform lightweight and scalable.

⸻

Context

Hi5Central requires a reliable method for the API and background services to communicate with PostgreSQL.

The database layer must support:

Type Safety
PostgreSQL 17
Multi-Tenancy
Long-Term Maintainability
Self-Hosted Deployments
Managed Cloud Deployments
Scalability

The database layer should also avoid excessive framework lock-in and remain easy for future developers to understand.

⸻

Decision

Hi5Central will use:

Kysely

for database access and query generation.

Database migrations will be managed using:

node-pg-migrate

Database connections will use:

pg

The final database stack is:

PostgreSQL 17
Kysely
node-pg-migrate
pg

⸻

Reasons For Choosing Kysely

Kysely was selected because it provides:

Strong TypeScript support
Compile-time query validation
SQL-like syntax
Excellent PostgreSQL support
Low framework lock-in
Lightweight architecture
Good long-term maintainability

Kysely allows developers to write queries that closely resemble SQL while still benefiting from TypeScript safety.

Example:

db.selectFrom("devices")
  .selectAll()
  .execute();

This approach keeps the database layer simple and easy to reason about.

⸻

Migration Strategy

Database schema changes will be managed using:

node-pg-migrate

Responsibilities:

Create Tables
Modify Tables
Add Indexes
Add Constraints
Track Migration History
Rollback Changes

Keeping migrations separate from the query layer provides greater flexibility and reduces coupling.

⸻

Alternatives Considered

Drizzle ORM

Pros:

Strong TypeScript support
Schema-first design
Good migration tooling
Popular modern ORM

Cons:

More ORM-focused
Greater framework coupling
Schema management tightly integrated

⸻

Prisma

Pros:

Large ecosystem
Developer friendly
Popular in SaaS applications

Cons:

Heavier abstraction layer
Additional generation steps
Less SQL-like
Can become restrictive at scale

⸻

TypeORM

Pros:

Mature ecosystem
Supports many databases

Cons:

Complex architecture
Higher maintenance overhead
Less attractive for new projects

⸻

Raw pg Queries

Pros:

Maximum control
No abstraction layer

Cons:

No type safety
More repetitive code
Higher risk of developer mistakes

⸻

Why Kysely Was Selected

Kysely provided the best balance between:

Performance
Type Safety
Simplicity
Maintainability
Flexibility
Developer Experience

It allows Hi5Central to remain close to standard SQL while benefiting from modern TypeScript tooling.

⸻

Self-Hosted Impact

Self-hosted customers do not interact with Kysely directly.

Customers receive:

Docker Images
Docker Compose Files
Environment Variables
Licence Keys
Documentation

They do not need to understand:

Kysely
TypeScript
Node.js Internals
Migration Frameworks

⸻

Managed Cloud Impact

Managed cloud customers are completely unaffected by the database implementation.

Hi5Central manages:

Database Hosting
Backups
Replication
Maintenance
Monitoring
Updates

⸻

Consequences

Positive

Strong Type Safety
SQL-Like Development Experience
Lightweight Architecture
Reduced Framework Lock-In
Excellent PostgreSQL Support
Easy Future Maintenance

⸻

Trade-Offs

More Manual Type Definitions
Separate Migration System
Less Automatic Schema Generation
Requires Understanding of SQL Concepts

⸻

Related Decisions

ADR-0002 Electron Viewer Architecture
ADR-0003 White Labelling Architecture
ADR-0004 Self Hosted Deployment Model

⸻

Review Date

This decision should be reviewed if:

PostgreSQL is replaced
Kysely becomes unsupported
Platform requirements significantly change

Until then, Kysely remains the approved database access layer for Hi5Central.
