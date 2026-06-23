# SecureSwap — Trustless Peer-to-Peer Exchange Platform

SecureSwap is a trustless, peer-to-peer (P2P) exchange web application designed to enable users to swap digital services, gift cards, and physical items safely.

---

## 🚀 Features

* **Live Supabase DB Layer**: Fully connected data layer with dynamic fallback to browser `localStorage` if database variables are unset.
* **Real-time Chat Negotiations**: Subscribes to Supabase realtime channels to deliver instant negotiation messages.
* **Premium Theme Styling**: Sleek glassmorphism look with responsive Light and Dark themes.
* **Google OAuth Authentication**: Fully supports free Google Sign-In with automated local token syncing.
* **Protected Session Redirections**: Multi-step Route Guards protecting all private pages.
* **Vite manual chunking & lazy routes**: Lightweight bundles for maximum loading performance.

---

## 📋 Prerequisites

* Node.js (v18.x or higher)
* npm

---

## 🛠️ Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root folder and configure your Supabase variables:
   ```text
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-public-anon-key
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Verify build compilation**:
   ```bash
   npm run build
   ```

---

## 📂 Documentation Suite

* [PRD.md](file:///c:/Users/krish/Desktop/projects/secureswap/PRD.md): Product requirements, features, and future scope.
* [ARCHITECTURE.md](file:///c:/Users/krish/Desktop/projects/secureswap/ARCHITECTURE.md): Directories structure, React hooks logic, and DAL maps.
* [DATABASE_SCHEMA.md](file:///c:/Users/krish/Desktop/projects/secureswap/DATABASE_SCHEMA.md): Database table models, relationships, and RLS rules.
* [DESIGN_SYSTEM.md](file:///c:/Users/krish/Desktop/projects/secureswap/DESIGN_SYSTEM.md): Light/Dark themes, CSS design tokens, and components styles.
* [SECURITY.md](file:///c:/Users/krish/Desktop/projects/secureswap/SECURITY.md): Client-side hardening, Protected Route guards, and OAuth details.
