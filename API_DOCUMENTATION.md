# API Reference — SecureSwap

This document details all API services, query properties, authentication policies, and data mappings used to integrate the React client with the Supabase PostgreSQL database.

---

## 1. Authentication Endpoints
All authentication is handled via `supabase.auth` JWT session providers.

### Sign In
- **Method**: `supabase.auth.signInWithPassword({ email, password })`
- **Output**: Returns session token + user profile.
- **Route Guard Impact**: Triggers state updates in `useAuth` hook and redirects user to `/exchange-dashboard`.

### Sign Up
- **Method**: `supabase.auth.signUp({ email, password, options: { data: { display_name } } })`
- **Trigger Behavior**: Automatically hooks into the Postgres trigger function `handle_new_user()` to populate a corresponding profile record in the `public.profiles` database table.

---

## 2. Database Endpoints (Profiles)
- **Table**: `public.profiles`
- **Row-Level Security (RLS)**: Enable RLS. Viewable by all authenticated operators. Editable strictly by matching `auth.uid() = id`.

### Fetch Profile
```javascript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single();
```
- **Returns**:
  - `id` (UUID)
  - `display_name` (text)
  - `avatar_url` (text)
  - `rating` (numeric)
  - `success_rate` (numeric)

### Update Profile
```javascript
const { data, error } = await supabase
  .from('profiles')
  .update(updates)
  .eq('id', userId);
```

---

## 3. Database Endpoints (Exchanges)
- **Table**: `public.exchanges`
- **Row-Level Security (RLS)**: Viewable by all authenticated users. Insertion restricted to creator (`owner_id`). Updates restricted to `owner_id` or `partner_id`.

### Fetch Active Listings
```javascript
const { data, error } = await supabase
  .from('exchanges')
  .select(`
    *,
    partner:partner_id (
      display_name,
      avatar_url,
      rating
    )
  `)
  .order('created_at', { ascending: false });
```

### Create Listing
```javascript
const { data, error } = await supabase
  .from('exchanges')
  .insert([{ title, description, type, category, value, owner_id }])
  .select()
  .single();
```

---

## 4. Real-time Messaging Channels
- **Table**: `public.messages`
- **Row-Level Security (RLS)**: Select and Insert allowed strictly if the user is the `owner_id` or `partner_id` of the linked exchange.

### Fetch Chat History
```javascript
const { data, error } = await supabase
  .from('messages')
  .select('*')
  .eq('exchange_id', exchangeId)
  .order('created_at', { ascending: true });
```

### Listen to Live Chats (Supabase Realtime)
```javascript
supabase
  .channel(`messages:exchange_id=eq.${exchangeId}`)
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'messages',
    filter: `exchange_id=eq.${exchangeId}`
  }, (payload) => {
    // Append payload.new directly to messages state array
  })
  .subscribe();
```
