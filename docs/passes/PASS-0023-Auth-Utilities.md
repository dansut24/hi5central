# PASS-0023 Auth Utilities

## Overview

This pass creates the shared authentication utility functions used by the API.

These utilities are responsible for:

```txt
Password Hashing
Password Verification
Token Generation
Token Hashing
Session Token Creation
```

---

# Objective

Create a shared authentication package for:

```txt
Argon2id Password Hashing
SHA-256 Token Hashing
Secure Random Token Generation
```

---

# Created Structure

```txt
packages/auth/

package.json
tsconfig.json

src/
  index.ts
  password.ts
  tokens.ts
```

---

# Password Utilities

Support:

```txt
hashPassword()
verifyPassword()
```

Using:

```txt
Argon2id
```

---

# Token Utilities

Support:

```txt
generateToken()
hashToken()
```

Using:

```txt
crypto.randomBytes()
SHA-256
```

---

# Security Requirements

```txt
No plaintext passwords
No plaintext session tokens
No reversible token storage
Cryptographically secure randomness
```

---

# Test Plan

Run:

```bash
pnpm --filter @hi5central/auth build
```

Expected:

```txt
Build succeeds
```

---

# Success Criteria

```txt
Password utilities created
Token utilities created
Package builds successfully
Ready for authentication endpoints
```

---

# Future Work

```txt
Login endpoint
Logout endpoint
Session middleware
Current user endpoint
```
