// context/AuthProvider.tsx
'use client';
import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, useRegisterModal } from '../stores/auth-store';
import { register, login, userMe } from '../services/api';
import useSessionTimeout from '@/hooks/useSessionTimeout'; // Import the hook

interface AuthContextType {
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { setTokens, clearTokens, setUser, clearUser, refreshTokens, refreshToken } = useAuthStore();
  const { openRegisterModal } = useRegisterModal();

  const handleRegister = async (username: string, email: string, password: string) => {
    await register(username, email, password);
  };

  const handleLogin = async (username: string, password: string) => {
    const data = await login(username, password);
    setTokens(data.access, data.refresh);
    const user = await userMe(data.access);
    setUser(user);
    localStorage.setItem('auth-storage', JSON.stringify({ state: { user, accessToken: data.access, refreshToken: data.refresh } }));
    router.push('/');
  };

  const handleLogout = () => {
    clearTokens();
    clearUser();
    localStorage.removeItem('auth-storage');
    openRegisterModal();
    router.push('/');
  };

  useEffect(() => {
    if (refreshToken) {
      const refreshInterval = 23 * 60 * 60 * 1000; // 23 hours in milliseconds
      const intervalId = setInterval(refreshTokens, refreshInterval);

      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [refreshToken, refreshTokens]);

  useSessionTimeout(); // Use the session timeout hook

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
