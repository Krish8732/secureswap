# Product Requirements Document (PRD) — SecureSwap

## 1. Executive Summary & Goals
SecureSwap is a trustless, peer-to-peer (P2P) exchange platform designed to enable users to swap digital services, gift cards, and physical items safely. The primary goal is to eliminate risk of fraud by providing verified user matching, commitment-based terms lock, and transaction logs.

---

## 2. Target Audience
* **Freelancers & Designers**: Exchanging professional skills (e.g., logo design for web development).
* **Gift Card Traders**: Swapping regional gift cards securely.
* **Tech Enthusiasts**: Swapping hardware items safely.

---

## 3. Core Features & Functional Requirements

### 3.1. User Onboarding & Auth
* **Sign Up / Log In**: Free email/password authentication or free OAuth (Google Sign-In).
* **Auto-Session Guard**: Safe protected routes redirection when unauthenticated.

### 3.2. Exchange Dashboard
* **Dynamic Indicators**: Clear stats indicating active exchanges, completed transactions, and values.
* **List Views**: Tab panels separating exchanges by status (All, Active, Pending, Completed).
* **Advanced Filters**: Query search by title or description, category filter, value flexibility, and sorting algorithms.

### 3.3. Create Exchange Flow
* **Multi-Step Form**: Guided steps (Choose offering type -> Input description/files -> Specify requirements -> Set limits).
* **Draft Auto-Save**: Prevents loss of form progress by saving drafts to local storage.

### 3.4. Matchmaking Page
* **Compatibility Scores**: Automatic rating calculation based on category compatibility.
* **Filter Options**: Filter by location, min reputation score, and verified badge tags.

### 3.5. Exchange Detail & Negotiation Room
* **Progress Steps**: Visual tracker highlighting current negotiation phase (Created -> Matched -> Terms Committed -> Completed).
* **Real-time Chat**: Subscribed to Supabase table logs for instant communication.
* **Dispute System**: Formal dispute triggers for review.

---

## 4. Non-Functional Requirements
* **Theme Adaptability**: Dual Light & Dark modes to match OS system defaults.
* **Offline Resiliency**: Complete localStorage backup sync if Supabase is offline.
* **Optimal Speed**: Multi-chunk script bundles using Vite code-splitting logic.
