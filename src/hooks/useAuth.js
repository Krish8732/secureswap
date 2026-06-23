import { useState, useEffect } from 'react';
import { getSession, createDemoSession, clearSession } from '../utils/session';
import { supabase } from '../utils/supabaseClient';

const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && !url.includes('dummy') && key && !key.includes('dummy');
};

export const useAuth = () => {
  const [session, setSession] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 1. Initial check of local session
    const localS = getSession();
    if (localS) {
      setSession(localS);
      setIsAuthenticated(true);
    }

    // 2. If Supabase is active, listen to auth state changes
    let subscription = null;
    if (isSupabaseConfigured()) {
      // Fetch initial session
      supabase.auth.getSession().then(({ data: { session: sbSession } }) => {
        if (sbSession?.user) {
          const email = sbSession.user.email;
          const nextSession = {
            email,
            provider: sbSession.user.app_metadata?.provider || 'google',
            issuedAt: Date.now(),
            expiresAt: Date.now() + 8 * 60 * 60 * 1000,
            mode: 'live',
            userId: sbSession.user.id
          };
          localStorage.setItem('secureSwapSession', JSON.stringify(nextSession));
          setSession(nextSession);
          setIsAuthenticated(true);
        }
      });

      // Subscribe to changes
      const { data } = supabase.auth.onAuthStateChange((event, sbSession) => {
        if (sbSession?.user) {
          const email = sbSession.user.email;
          const nextSession = {
            email,
            provider: sbSession.user.app_metadata?.provider || 'google',
            issuedAt: Date.now(),
            expiresAt: Date.now() + 8 * 60 * 60 * 1000,
            mode: 'live',
            userId: sbSession.user.id
          };
          localStorage.setItem('secureSwapSession', JSON.stringify(nextSession));
          setSession(nextSession);
          setIsAuthenticated(true);
        } else if (event === 'SIGNED_OUT') {
          clearSession();
          setSession(null);
          setIsAuthenticated(false);
        }
      });
      subscription = data.subscription;
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const login = async (email, password, rememberMe = false) => {
    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        return { success: true, user: data.user };
      } else {
        // Fallback demo validation
        if (email === 'demo@secureswap.com' && password === 'SecurePass123!') {
          const nextSession = createDemoSession({ email, rememberMe });
          setSession(nextSession);
          setIsAuthenticated(true);
          return { success: true };
        }
        return { success: false, error: 'Invalid credentials. Please use the pre-filled demo account.' };
      }
    } catch (err) {
      console.error('Sign In failed:', err);
      return { success: false, error: err.message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin + '/exchange-dashboard'
          }
        });
        if (error) throw error;
        return data;
      } else {
        // Fallback demo for Google Auth
        const nextSession = createDemoSession({ email: 'google.user@secureswap.com', rememberMe: true });
        setSession(nextSession);
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch (err) {
      console.error('Google Sign In failed:', err);
      throw err;
    }
  };

  const register = async (email, password, fullName) => {
    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: fullName
            }
          }
        });
        if (error) throw error;
        return { success: true, user: data.user };
      } else {
        const nextSession = createDemoSession({ email, rememberMe: false });
        setSession(nextSession);
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch (err) {
      console.error('Sign Up failed:', err);
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    clearSession();
    setSession(null);
    setIsAuthenticated(false);
  };

  return { session, isAuthenticated, login, register, loginWithGoogle, logout };
};
