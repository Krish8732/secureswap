# Real-time Notifications Blueprint — SecureSwap

This document details the database schema additions, PostgreSQL database triggers, RLS policies, and client-side real-time subscription mechanics required to power the SecureSwap notifications feed.

---

## 1. Database Schema Extensions (PostgreSQL)

To support notification delivery, a `public.notifications` table must be established. This is mapped directly to our user profiles.

### 1.1. SQL Definition

```sql
-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('match', 'status_change', 'new_message')),
    is_read BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON public.notifications(user_id) WHERE (is_read = false);
```

### 1.2. Security and Row-Level Security (RLS)

As required by Supabase security guidelines, RLS is enabled on `public.notifications`, and access is restricted to the owner of the notifications:

```sql
-- Enable Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Select policy: Users can only select their own notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- Update policy: Users can only edit (e.g. mark as read) their own notifications
CREATE POLICY "Users can update their own notifications" ON public.notifications
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
```

---

## 2. Automated Database Triggers (Postgres Functions)

Notifications are generated directly within the database engine via triggers. This guarantees consistency across REST API calls, WebSockets, or manual SQL updates.

### 2.1. Listing Matches & Status Changes Trigger

Triggers on `public.exchanges` when a partner matches, or when the listing is marked complete:

```sql
CREATE OR REPLACE FUNCTION public.handle_exchange_notification()
RETURNS TRIGGER AS $$
BEGIN
    -- Case A: An exchange listing has found a match (partner_id is set)
    IF (OLD.partner_id IS NULL AND NEW.partner_id IS NOT NULL) THEN
        -- Notify the owner of the listing
        INSERT INTO public.notifications (user_id, title, content, type)
        VALUES (
            NEW.creator_id,
            'Match Found!',
            'A partner has joined your exchange listing: "' || NEW.title || '"',
            'match'
        );
        -- Notify the partner who joined
        INSERT INTO public.notifications (user_id, title, content, type)
        VALUES (
            NEW.partner_id,
            'Listing Joined',
            'You successfully matched with: "' || NEW.title || '"',
            'match'
        );
        
    -- Case B: The exchange status changes to 'completed'
    ELSIF (OLD.status <> NEW.status AND NEW.status = 'completed') THEN
        -- Notify Creator
        INSERT INTO public.notifications (user_id, title, content, type)
        VALUES (
            NEW.creator_id,
            'Exchange Finalized',
            'Your exchange "' || NEW.title || '" is marked as complete.',
            'status_change'
        );
        -- Notify Partner
        IF (NEW.partner_id IS NOT NULL) THEN
            INSERT INTO public.notifications (user_id, title, content, type)
            VALUES (
                NEW.partner_id,
                'Exchange Finalized',
                'Your exchange "' || NEW.title || '" is marked as complete.',
                'status_change'
            );
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind trigger to exchanges table
CREATE OR REPLACE TRIGGER on_exchange_updated
    AFTER UPDATE ON public.exchanges
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_exchange_notification();
```

### 2.2. Chat Messages Trigger

Triggers when a new message is inserted into a negotiation room, alerting the other participant:

```sql
CREATE OR REPLACE FUNCTION public.handle_message_notification()
RETURNS TRIGGER AS $$
DECLARE
    v_recipient_id UUID;
    v_exchange_title TEXT;
BEGIN
    -- Fetch the exchange details and other participant id
    SELECT 
        title,
        CASE WHEN creator_id = NEW.sender_id THEN partner_id ELSE creator_id END
    INTO v_exchange_title, v_recipient_id
    FROM public.exchanges
    WHERE id = NEW.exchange_id;

    -- Create notification for the recipient
    IF (v_recipient_id IS NOT NULL) THEN
        INSERT INTO public.notifications (user_id, title, content, type)
        VALUES (
            v_recipient_id,
            'New Message Received',
            'New message in "' || v_exchange_title || '": "' || substring(NEW.text from 1 for 40) || '..."',
            'new_message'
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind trigger to messages table
CREATE OR REPLACE TRIGGER on_message_inserted
    AFTER INSERT ON public.messages
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_message_notification();
```

---

## 3. Client Subscription Integration (React & Supabase Client)

SecureSwap frontend listens dynamically to updates on the `public.notifications` table to show badge updates and live toast feeds.

### 3.1. Context & Hook Architecture (`src/contexts/NotificationContext.jsx`)

Create a unified notification context to stream alerts live:

```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../hooks/useAuth';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { session, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch past notifications
  const fetchNotifications = async () => {
    if (!isAuthenticated || !session?.userId) return;
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(30);

    if (!error && data) {
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.is_read).length);
    }
  };

  // Mark a notification as read
  const markAsRead = async (notificationId) => {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (!error) {
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
      setUnreadCount(c => Math.max(0, c - 1));
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !session?.userId) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    fetchNotifications();

    // Subscribe to real-time updates for user's notifications
    const channel = supabase
      .channel(`user-notifications:${session.userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${session.userId}`
        },
        (payload) => {
          // Prepend new notification to the feed
          setNotifications(prev => [payload.new, ...prev]);
          setUnreadCount(c => c + 1);
          
          // Trigger browser notification or custom UI toast here
          if (Notification.permission === 'granted') {
            new Notification(payload.new.title, { body: payload.new.content });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated, session?.userId]);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
```
