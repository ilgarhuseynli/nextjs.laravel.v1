'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth/auth-service';
import { APP_ROUTES } from '@/config/routes';
import Cookies from 'js-cookie';

type Address = {
  city?: string;
  street?: string;
  country?: string;
  postal_code?: string;
};

type User = {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  image: string;
  address: Address | boolean;
  phone: string;
  email: string;
  created_at: number;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      const { data } = await authService.getAuthSettings();
      setUser(data.account);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    // Check for token in both localStorage and cookies
    const storedToken = localStorage.getItem('token') || Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserData();
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      setToken(response.token);
      await fetchUserData();
      router.push(APP_ROUTES.dashboard.overview);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setToken(null);
      router.push(APP_ROUTES.auth.login);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
