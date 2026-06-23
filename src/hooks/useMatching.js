import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabaseClient';

const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && !url.includes('dummy') && key && !key.includes('dummy');
};

const MOCK_MATCHES = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 24,
    location: "New York, NY",
    exchangeCount: 12,
    compatibilityScore: 95,
    isOnline: true,
    isVerified: true,
    responseTime: "within an hour",
    offering: {
      title: "Brand Identity Design",
      description: "Complete logo design, color palette selection, and comprehensive typography guidelines.",
      category: "Graphic Design",
      estimatedValue: 800
    },
    lookingFor: ["Web Development", "SEO Services"]
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4.6,
    reviewCount: 18,
    location: "San Francisco, CA",
    exchangeCount: 8,
    compatibilityScore: 88,
    isOnline: false,
    isVerified: true,
    responseTime: "within a few hours",
    offering: {
      title: "SEO Optimization",
      description: "Technical SEO audits, keyword research, meta-tag optimization, and speed improvement suggestions.",
      category: "Digital Marketing",
      estimatedValue: 500
    },
    lookingFor: ["Graphic Design", "React Development"]
  }
];

export const useMatching = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*');
        
        if (!error && data?.length > 0) {
          // Format into match card shape
          const formatted = data.map((p, idx) => ({
            id: p.id,
            name: p.display_name || 'Verified Partner',
            avatar: p.avatar_url,
            rating: parseFloat(p.rating) || 5.0,
            reviewCount: 12,
            location: p.location || 'Remote',
            exchangeCount: p.completed_exchanges || 4,
            compatibilityScore: 90 - (idx * 5),
            isOnline: idx % 2 === 0,
            isVerified: p.is_verified || true,
            responseTime: "within an hour",
            offering: {
              title: idx === 0 ? "Graphic Design" : "Content Writing",
              description: idx === 0 ? "Logo design and typography branding." : "SEO optimized articles and copy.",
              category: idx === 0 ? "Design" : "Writing",
              estimatedValue: 600
            },
            lookingFor: ["Web Development"]
          }));
          setMatches(formatted);
          setError(null);
          return;
        }
      }
      setMatches(MOCK_MATCHES);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return { matches, loading, error, refresh: fetchMatches };
};
