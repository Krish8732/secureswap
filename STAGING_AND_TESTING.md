# Staging, Deployment, & Unit Testing Specification — SecureSwap

This document details the configuration for hosting SecureSwap on staging platforms (Vercel), CI/CD pipelines, and the implementation guidelines for client-side unit testing using Vitest.

---

## 1. Staging Environment Deployment (Vercel)

SecureSwap is optimized for deployment on **Vercel** due to its out-of-the-box support for Vite builds, client-side route rewrites, and environment variable protection.

### 1.1. Manual Staging Setup via Vercel Dashboard

1. Log into your Vercel Account and click **Add New** > **Project**.
2. Import the SecureSwap repository: `https://github.com/Krish8732/secureswap.git`.
3. Configure the **Build & Development Settings**:
   - **Framework Preset**: `Vite` (automatically detected).
   - **Build Command**: `npm run build`.
   - **Output Directory**: `dist` (default for Vite).
4. Configure **Environment Variables**:
   Under the project settings, add the following production/staging keys:
   
   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `VITE_SUPABASE_URL` | `https://getondqktgjcfdwywlsk.supabase.co` | The Live Supabase API Endpoint |
   | `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Client Anonymous Access Public JWT Key |

5. Click **Deploy**. Vercel will build the bundles, optimize code chunks, and issue a staging URL (e.g., `https://secureswap-staging.vercel.app`).

### 1.2. Vercel Configuration (`vercel.json`)

To prevent `404` errors when reloading dynamic React Router routes (e.g., `/exchange-dashboard`, `/exchange-details/:id`), Vercel must route all traffic back to `index.html`:

```json
{
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 2. Continuous Integration & Deployment (CI/CD)

A GitHub Actions workflow will automate code verification (linting and building) and staging deployment.

### 2.1. GitHub Actions Workflow Configuration
Create a file at `.github/workflows/deploy.yml`:

```yaml
name: SecureSwap CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  verify:
    name: Build & Code Verification
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Production Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

  deploy-staging:
    name: Staging Deployment to Vercel
    needs: verify
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Deploy to Vercel Staging
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 3. Client Unit Testing Architecture (Vitest)

To validate complex component hooks (e.g., the `useAuth` session syncing and Supabase fallback mechanisms), SecureSwap plans to deploy a **Vitest** test suite.

### 3.1. Testing Dependencies

Install the required testing packages as devDependencies:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event
```

### 3.2. Vite Test Integration Configuration

Extend `vite.config.mjs` to define the test runner options:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // ... existing configs
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/']
    }
  }
});
```

### 3.3. Test Suite Setup (`src/test/setup.js`)

Prepare the browser simulation environment for Vitest:

```javascript
import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Clean up mocks after each test
afterEach(() => {
  vi.clearAllMocks();
  window.localStorage.clear();
});
```

### 3.4. Mocking Supabase & Auth Hooks Spec

To test `useAuth` state changes without calling the live network, mock the `@supabase/supabase-js` client module:

```javascript
// src/hooks/__tests__/useAuth.test.jsx
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuth } from '../useAuth';

// Mock Supabase client
vi.mock('../../utils/supabaseClient', () => {
  return {
    supabase: {
      auth: {
        getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
        onAuthStateChange: vi.fn(() => ({
          data: { subscription: { unsubscribe: vi.fn() } }
        })),
        signInWithPassword: vi.fn(),
        signOut: vi.fn()
      }
    }
  };
});

describe('useAuth Hook Unit Tests', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://dummy-id.supabase.co');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'dummy-key');
  });

  it('should initialize with default guest states if no session exists', async () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.session).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should fall back to demo mode when env keys are missing', async () => {
    // Unset Env keys
    vi.stubEnv('VITE_SUPABASE_URL', '');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');

    const { result } = renderHook(() => useAuth());

    let loginResult;
    await act(async () => {
      loginResult = await result.current.login('demo@secureswap.com', 'SecurePass123!');
    });

    expect(loginResult.success).toBe(true);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.session.email).toBe('demo@secureswap.com');
  });
});
```
