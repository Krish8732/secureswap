import { supabase } from '../utils/supabaseClient';
import { getSession } from '../utils/session';

const STORAGE_KEY = 'secureswap_exchanges';
const NOTIFICATIONS_KEY = 'secureswap_notifications';

const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && !url.includes('dummy') && key && !key.includes('dummy');
};

const getCurrentUserId = () => {
  const session = getSession();
  return session?.userId || '00000000-0000-0000-0000-000000000003'; // Fallback to Alex Rodriguez seed ID
};

const readLocal = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
};

const writeLocal = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Seed local storage with default mock data if empty
export const seedIfEmpty = () => {
  if (!isSupabaseConfigured()) {
    const existing = readLocal(STORAGE_KEY);
    if (existing.length === 0) {
      const mockExchanges = [
        {
          id: 'EX-2025-001',
          title: 'Web Development Service',
          type: 'service',
          status: 'active',
          progress: 75,
          value: 850,
          description: 'Looking to exchange web development services for graphic design work',
          partner: {
            name: 'Julian R. (Verified Partner)',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
            rating: 4.9
          },
          hasNewMessage: true,
          nextAction: 'Review Terms'
        },
        {
          id: 'EX-2025-002',
          title: 'Amazon Gift Card Exchange',
          type: 'gift_card',
          status: 'pending',
          progress: 25,
          value: 200,
          description: '$200 Amazon gift card for equivalent iTunes gift card',
          partner: {
            name: 'M. Chen • Acme Corp',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
            rating: 4.95
          },
          hasNewMessage: false,
          nextAction: 'Upload Card'
        }
      ];
      writeLocal(STORAGE_KEY, mockExchanges);
    }
  }
};

// ─── API Methods ─────────────────────────────────────────────────────────────

export const getExchanges = async () => {
  if (isSupabaseConfigured()) {
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
    
    if (error) {
      console.error('Supabase fetch exchanges failed, falling back to local:', error);
      return readLocal(STORAGE_KEY);
    }
    return data;
  }
  return readLocal(STORAGE_KEY);
};

export const getExchangeById = async (id) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('exchanges')
      .select(`
        *,
        partner:partner_id (
          display_name,
          avatar_url,
          rating,
          location,
          completed_exchanges,
          is_premium,
          is_verified,
          member_since
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Supabase fetch exchange details failed:', error);
      return readLocal(STORAGE_KEY).find(ex => ex.id === id) || null;
    }
    return data;
  }
  return readLocal(STORAGE_KEY).find(ex => ex.id === id) || null;
};

export const createExchange = async (formData) => {
  const userId = getCurrentUserId();
  const newExchange = {
    title: formData.title || 'Untitled Exchange',
    description: formData.description || '',
    type: formData.exchangeType || 'service',
    category: formData.category || '',
    status: 'active',
    progress: 0,
    value: parseFloat(formData.estimatedValue) || 0.00,
    owner_id: userId,
    duration: formData.duration || '30',
    location: formData.location || '',
    is_physical: formData.isPhysical || false,
    is_public: formData.isPublic !== false,
    trust_level: formData.trustLevel || 'standard',
    value_flexibility: formData.valueFlexibility || 'exact',
    allow_partial: formData.allowPartial || false,
    auto_matching: formData.autoMatching !== false,
    require_escrow: formData.requireEscrow || false,
    wanted_type: formData.wantedType || '',
    wanted_category: formData.wantedCategory || '',
    wanted_description: formData.wantedDescription || '',
    estimated_value: parseFloat(formData.estimatedValue) || 0.00
  };

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('exchanges')
      .insert([newExchange])
      .select()
      .single();
    
    if (error) {
      console.error('Supabase create exchange failed:', error);
    } else {
      return data;
    }
  }

  // Fallback to local
  const localId = `EX-${Date.now()}`;
  const localExchange = { id: localId, ...newExchange };
  const all = readLocal(STORAGE_KEY);
  writeLocal(STORAGE_KEY, [...all, localExchange]);
  return localExchange;
};

export const updateExchange = async (id, updates) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('exchanges')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase update exchange failed:', error);
    } else {
      return data;
    }
  }

  const all = readLocal(STORAGE_KEY);
  const index = all.findIndex(ex => ex.id === id);
  if (index !== -1) {
    all[index] = { ...all[index], ...updates, updatedAt: new Date().toISOString() };
    writeLocal(STORAGE_KEY, all);
    return all[index];
  }
  return null;
};

export const deleteExchange = async (id) => {
  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from('exchanges')
      .delete()
      .eq('id', id);
    
    if (error) console.error('Supabase delete failed:', error);
    return;
  }

  const all = readLocal(STORAGE_KEY);
  writeLocal(STORAGE_KEY, all.filter(ex => ex.id !== id));
};

// ─── Messages API ─────────────────────────────────────────────────────────────

export const getMessages = async (exchangeId) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('exchange_id', exchangeId)
      .order('created_at', { ascending: true });
    
    if (!error) return data;
  }
  // Local fallback
  const exchange = readLocal(STORAGE_KEY).find(ex => ex.id === exchangeId);
  return exchange?.messages || [];
};

export const addMessage = async (exchangeId, text) => {
  const userId = getCurrentUserId();
  const newMessage = {
    exchange_id: exchangeId,
    sender_id: userId,
    text
  };

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('messages')
      .insert([newMessage])
      .select()
      .single();
    
    if (!error) return data;
  }

  // Local fallback
  const all = readLocal(STORAGE_KEY);
  const index = all.findIndex(ex => ex.id === exchangeId);
  if (index !== -1) {
    const localMsg = { id: `MSG-${Date.now()}`, ...newMessage, created_at: new Date().toISOString() };
    all[index].messages = [...(all[index].messages || []), localMsg];
    writeLocal(STORAGE_KEY, all);
    return localMsg;
  }
  return null;
};

// ─── Notifications API ────────────────────────────────────────────────────────

export const getNotifications = async () => {
  if (isSupabaseConfigured()) {
    const userId = getCurrentUserId();
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false });
    
    if (!error) return data;
  }
  return readLocal(NOTIFICATIONS_KEY);
};

export const addNotification = async (title, content, type = 'system') => {
  const userId = getCurrentUserId();
  const notif = {
    user_id: userId,
    title,
    content,
    type,
    is_read: false
  };

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('notifications')
      .insert([notif])
      .select()
      .single();
    
    if (!error) return data;
  }

  const all = readLocal(NOTIFICATIONS_KEY);
  const localNotif = { id: `NOTIF-${Date.now()}`, ...notif, timestamp: new Date().toISOString() };
  writeLocal(NOTIFICATIONS_KEY, [localNotif, ...all]);
  return localNotif;
};
