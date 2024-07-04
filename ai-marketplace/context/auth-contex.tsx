'use client';
import { createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/auth-store';
import { register, login } from '../services/api';

interface AuthContextType {
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { setTokens, clearTokens } = useAuthStore();

  const handleRegister = async (username: string, email: string, password: string) => {
    await register(username, email, password);
  };

  const handleLogin = async (username: string, password: string) => {
    const data = await login(username, password);
    setTokens(data.access, data.refresh);
    router.push('/');
  };

  const handleLogout = () => {
    clearTokens();
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ register: handleRegister, login: handleLogin, logout: handleLogout }}>
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
