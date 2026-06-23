# Security Policy & Hardening Guidelines — SecureSwap

## 1. Supported Versions

Only the latest version of the frontend client is currently supported.

| Version | Supported |
| ------- | --------- |
| 1.0.x   | Yes       |
| < 1.0   | No        |

---

## 2. Reporting a Vulnerability

If you discover any security vulnerabilities in SecureSwap, please do not open a public issue. Instead, report it privately by emailing **security@secureswap.com**. 

We aim to respond within 48 hours and provide a patch within 7 business days.

---

## 3. Client-Side Security Hardening

### 3.1. Route Protection
All dashboard, details, matchmaking, and creation routes are wrapped in a `<ProtectedRoute>` component. Unauthenticated requests are immediately redirected back to `/user-login`, preserving route state integrity.

### 3.2. Session Expirations
Local user sessions store explicit `issuedAt` and `expiresAt` timestamps. The `getSession()` accessor checks if the current time exceeds the expiration threshold. If so, it wipes the storage and redirects the user immediately.

### 3.3. Google OAuth Setup
Social login redirects occur through Supabase Auth, which implements OAuth 2.1 protocol rules securely. Client credentials are configured in the Supabase Dashboard, preventing exposure of secrets in client bundle packages.
