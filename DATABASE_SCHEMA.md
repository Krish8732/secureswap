# Database Schema & RLS Policies — SecureSwap

This document details the database schemas, tables, relationships, and security (RLS) policies configured in the Supabase database.

---

## 1. Schema Diagram & Relationships

```mermaid
erDiagram
    PROFILES ||--o{ EXCHANGES : "creates (owner_id)"
    PROFILES ||--o{ EXCHANGES : "matches (partner_id)"
    EXCHANGES ||--o{ MESSAGES : "contains"
    PROFILES ||--o{ MESSAGES : "sends"
    PROFILES ||--o{ NOTIFICATIONS : "receives"

    PROFILES {
        uuid id PK
        timestamp created_at
        text name
        text avatar
        numeric rating
        integer rating_count
        text location
        integer completed_exchanges
        boolean is_verified
        boolean is_premium
    }

    EXCHANGES {
        uuid id PK
        timestamp created_at
        text title
        text description
        text type
        text category
        text status
        integer progress
        numeric value
        uuid owner_id FK
        uuid partner_id FK
        boolean owner_committed
        boolean partner_committed
        text duration
        text location
        boolean is_physical
        boolean is_public
        text trust_level
        text value_flexibility
        boolean allow_partial
        boolean auto_matching
        boolean require_escrow
        text wanted_type
        text wanted_category
        text wanted_description
        numeric estimated_value
    }

    MESSAGES {
        uuid id PK
        timestamp timestamp
        uuid exchange_id FK
        uuid sender_id FK
        text content
        text type
        text status
    }

    NOTIFICATIONS {
        uuid id PK
        timestamp timestamp
        uuid user_id FK
        text title
        text content
        text type
        boolean is_read
    }
```

---

## 2. Row-Level Security (RLS) Policies

All tables reside in the exposed `public` schema. To secure user records, Row-Level Security (RLS) is enabled for all tables with the following rules:

### 2.1. `profiles` Table
* **Select**: Allow public reads (`TO anon, authenticated`) so users can search and view potential exchange partners.
* **Insert/Update/Delete**: Restrict changes to the matching user ID:
  ```sql
  CREATE POLICY "Allow profile owner updates" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
  ```

### 2.2. `exchanges` Table
* **Select**: Allow public reads for public listings (`is_public = true`) and private reads for members:
  ```sql
  CREATE POLICY "Allow members access to exchanges" ON public.exchanges
  FOR SELECT TO authenticated
  USING (is_public = true OR auth.uid() = owner_id OR auth.uid() = partner_id);
  ```
* **Insert**: Allow authenticated users to create listings (`auth.uid() = owner_id`).
* **Update/Delete**: Restrict edits to the owner or assigned partner.

### 2.3. `messages` Table
* **Select**: Only allow members of the corresponding exchange room to read logs:
  ```sql
  CREATE POLICY "Allow members select messages" ON public.messages
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.exchanges
      WHERE exchanges.id = messages.exchange_id
      AND (exchanges.owner_id = auth.uid() OR exchanges.partner_id = auth.uid())
    )
  );
  ```
* **Insert**: Allow authenticated users to insert new messages if they belong to that exchange.
