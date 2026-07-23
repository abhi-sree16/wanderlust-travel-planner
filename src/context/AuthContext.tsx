import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '@/lib/types';
import * as store from '@/lib/store';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => { error: string | null };
  signUp: (email: string, password: string, fullName: string) => { error: string | null };
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = store.getSession();
    setUser(session);
    setLoading(false);
  }, []);

  const signIn = (email: string, password: string) => {
    const { user, error } = store.signIn(email, password);
    if (user) setUser(user);
    return { error };
  };

  const signUp = (email: string, password: string, fullName: string) => {
    const { user, error } = store.signUp(email, password, fullName);
    if (user) setUser(user);
    return { error };
  };

  const signOut = () => {
    store.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
