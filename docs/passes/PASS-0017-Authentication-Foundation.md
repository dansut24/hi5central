# PASS-0017 Authentication Foundation

## Overview

This pass defines the authentication architecture for Hi5Central.

Authentication verifies user identity before granting access to the platform.

---

# Objective

Create the authentication foundation for:

```txt
Portal Login
User Authentication
Password Management
Email Verification
Multi-Factor Authentication
Future Enterprise SSO
```

---

# Authentication Model

Hi5Central uses:

```txt
Email Address
Password
Session-Based Authentication
```

Authentication is handled by the Hi5Central API.

Supabase Auth is not used for core authentication.

---

# Password Security

Passwords must be stored using:

```txt
Argon2id
```

Passwords must never be stored in plaintext.

Passwords must never be reversible.

---

# User Table

Uses:

```txt
users
```

Fields:

```txt
id
email
password_hash
first_name
last_name
status
created_at
updated_at
```

---

# Email Verification

Create:

```txt
email_verification_tokens
```

Fields:

```txt
id
user_id
token_hash
expires_at
created_at
used_at
```

---

# Password Reset

Create:

```txt
password_reset_tokens
```

Fields:

```txt
id
user_id
token_hash
expires_at
created_at
used_at
```

---

# Account Status

Supported states:

```txt
active
pending_verification
locked
disabled
```

---

# Multi-Factor Authentication

Future support:

```txt
TOTP
Recovery Codes
Authenticator Applications
```

Future table:

```txt
mfa_factors
```

---

# Enterprise Authentication

Future support:

```txt
SAML
OIDC
Azure AD
Google Workspace
Okta
```

---

# Authentication Flow

```txt
User
  ↓
Login Form
  ↓
Hono API
  ↓
Password Verification
  ↓
Session Creation
  ↓
Secure Cookie
  ↓
Portal Access
```

---

# Security Requirements

```txt
Argon2id Password Hashing
Email Verification
Password Reset Tokens
Session Auditing
Account Lockout Support
Rate Limiting
Audit Logging
```

---

# Success Criteria

```txt
Authentication architecture documented
Password security defined
Email verification defined
Password reset defined
MFA architecture defined
Enterprise SSO architecture defined
```

---

# Future Work

```txt
Authentication Database Migration
Authentication API Endpoints
Login Form
Password Reset Flow
Email Verification Flow
MFA Implementation
```
