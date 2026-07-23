import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '@/lib/types';
import * as store from '@/lib/store';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => store.getSession());

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error, user: u } = store.signUp(email, password, fullName);
    if (u) setUser(u);
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error, user: u } = store.signIn(email, password);
    if (u) setUser(u);
    return { error };
  };

  const signOut = () => {
    store.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading: false, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
