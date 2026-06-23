import { supabase } from '../utils/supabaseClient';
import { getSession } from '../utils/session';

const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && !url.includes('dummy') && key && !key.includes('dummy');
};

export const getProfile = async (userId) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (!error) return data;
  }
  
  // Local fallback
  return {
    id: userId || '00000000-0000-0000-0000-000000000003',
    display_name: 'Alex Johnson',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    rating: 4.9,
    location: 'Miami, FL',
    completed_exchanges: 24,
    is_premium: true,
    is_verified: true,
    member_since: '2024-01-15'
  };
};

export const updateProfile = async (userId, updates) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (!error) return data;
  }
  return updates;
};
