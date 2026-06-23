-- Migration: 01_schema.sql
-- Description: Core schema setup for SecureSwap with RLS, profiles trigger, and relationships.

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    avatar_url TEXT,
    rating NUMERIC DEFAULT 5.0,
    success_rate NUMERIC DEFAULT 100.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Create profiles trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name, avatar_url, rating, success_rate)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
        COALESCE(new.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'),
        4.9,
        98.0
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create exchanges table
CREATE TABLE IF NOT EXISTS public.exchanges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    value NUMERIC DEFAULT 0.0,
    status TEXT DEFAULT 'pending'::text,
    creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    partner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    offering_description TEXT,
    receiving_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for exchanges
ALTER TABLE public.exchanges ENABLE ROW LEVEL SECURITY;

-- Exchanges RLS Policies
CREATE POLICY "Exchanges are viewable by authenticated users" ON public.exchanges
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert their own exchanges" ON public.exchanges
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own exchanges" ON public.exchanges
    FOR UPDATE TO authenticated USING (auth.uid() = creator_id OR auth.uid() = partner_id);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exchange_id UUID REFERENCES public.exchanges(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Messages RLS Policies
CREATE POLICY "Messages are viewable by exchange participants" ON public.messages
    FOR SELECT TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.exchanges 
            WHERE exchanges.id = messages.exchange_id 
              AND (exchanges.creator_id = auth.uid() OR exchanges.partner_id = auth.uid())
        )
    );

CREATE POLICY "Participants can send messages" ON public.messages
    FOR INSERT TO authenticated WITH CHECK (
        auth.uid() = sender_id AND
        EXISTS (
            SELECT 1 FROM public.exchanges 
            WHERE exchanges.id = messages.exchange_id 
              AND (exchanges.creator_id = auth.uid() OR exchanges.partner_id = auth.uid())
        )
    );
