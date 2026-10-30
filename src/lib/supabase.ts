import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Production configuration:
// Strictly read from environment variables (manage in .env locally or Vercel Environment Variables in production).
// No manual credentials stored in localStorage or entered via admin UI.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let client: SupabaseClient | null = null;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    SUPABASE_URL && 
    SUPABASE_ANON_KEY && 
    SUPABASE_URL.startsWith('http') &&
    !SUPABASE_URL.includes('your-project')
  );
};

export const getSupabaseClient = (): SupabaseClient | null => {
  if (client) return client;
  
  if (isSupabaseConfigured()) {
    try {
      client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      return client;
    } catch (e) {
      console.warn('Failed to initialize Supabase client:', e);
      return null;
    }
  }
  return null;
};
