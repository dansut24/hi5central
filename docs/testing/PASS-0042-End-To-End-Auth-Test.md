# PASS-0042 End-To-End Auth Test

## Test Date

2026-05-30

---

# Objective

Validate the complete login flow.

---

# Steps

## 1. Start Database

```bash
docker compose up -d
```

Expected:

```txt
PostgreSQL and Redis running
```

---

## 2. Run Migrations

```bash
pnpm --filter @hi5central/db migrate
```

Expected:

```txt
Migrations applied successfully
```

---

## 3. Run Seeder

```bash
pnpm --filter @hi5central/db seed
```

Expected:

```txt
Development tenant and user created
```

---

## 4. Start API

```bash
pnpm --filter @hi5central/api dev
```

Expected:

```txt
Hi5Central API listening on port 3001
```

---

## 5. Test Health

```bash
curl http://localhost:3001/health
```

Expected:

```json
{
  "status": "ok",
  "service": "hi5central-api"
}
```

---

## 6. Test Readiness

```bash
curl http://localhost:3001/ready
```

Expected:

```json
{
  "status": "ready",
  "database": true
}
```

---

## 7. Test Login

```bash
curl -i -c cookies.txt \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hi5central.local","password":"Password123!"}' \
  http://localhost:3001/auth/login
```

Expected:

```txt
HTTP 200
Set-Cookie: hi5central_session=...
```

Expected body:

```json
{
  "success": true
}
```

---

## 8. Test Current User

```bash
curl -b cookies.txt http://localhost:3001/auth/me
```

Expected:

```json
{
  "success": true
}
```

---

## 9. Test Logout

```bash
curl -i -b cookies.txt -X POST http://localhost:3001/auth/logout
```

Expected:

```json
{
  "success": true
}
```

---

## 10. Confirm Session Invalid

```bash
curl -b cookies.txt http://localhost:3001/auth/me
```

Expected:

```txt
401 Unauthorized
```

---

# Status

```txt
PENDING
```
