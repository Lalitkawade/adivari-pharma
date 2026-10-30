import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../lib/types';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('adivari_admin_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached user:', e);
      }
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(true);

  // Synchronize session with Supabase Auth
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase || !isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    // 1. Check existing active session in Supabase Auth
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!isMounted) return;
      if (session?.user && !error) {
        const adminUser: AdminUser = {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Administrator',
          role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('adivari_admin_user', JSON.stringify(adminUser));
      } else if (!session) {
        setUser(null);
        localStorage.removeItem('adivari_admin_user');
      }
      setLoading(false);
    }).catch(err => {
      console.warn('Supabase getSession error:', err);
      if (isMounted) setLoading(false);
    });

    // 2. Realtime auth change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      if (session?.user) {
        const adminUser: AdminUser = {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Administrator',
          role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('adivari_admin_user', JSON.stringify(adminUser));
      } else {
        setUser(null);
        localStorage.removeItem('adivari_admin_user');
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Supabase Auth Sign In
  const login = async (email: string, password: string): Promise<boolean> => {
    const supabase = getSupabaseClient();

    if (!supabase || !isSupabaseConfigured()) {
      toast.error('Supabase is not configured. Please check your .env credentials.');
      return false;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
      });

      if (error) {
        toast.error(error.message || 'Invalid email or password.');
        return false;
      }

      if (data.user) {
        const adminUser: AdminUser = {
          id: data.user.id,
          email: data.user.email || email,
          name: data.user.user_metadata?.full_name || email.split('@')[0] || 'Administrator',
          role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('adivari_admin_user', JSON.stringify(adminUser));
        toast.success(`Welcome back, ${adminUser.name}!`);
        return true;
      }
      return false;
    } catch (err: any) {
      toast.error(err.message || 'Authentication error.');
      return false;
    }
  };

  // Supabase Auth Password Reset
  const resetPassword = async (email: string): Promise<boolean> => {
    const supabase = getSupabaseClient();
    if (!supabase || !isSupabaseConfigured()) {
      toast.error('Supabase is not configured.');
      return false;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/admin/login`
      });

      if (error) {
        toast.error(error.message || 'Failed to send password reset email.');
        return false;
      }

      toast.success('Password reset email sent! Check your inbox.');
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Password reset request failed.');
      return false;
    }
  };

  // Sign out
  const logout = async () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase signOut error:', err);
      }
    }
    setUser(null);
    localStorage.removeItem('adivari_admin_user');
    toast.success('Signed out successfully.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        resetPassword,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
