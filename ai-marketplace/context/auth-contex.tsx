'use client';
import { createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, useRegisterModal } from '../stores/auth-store'; // Import useRegisterModal
import { register, login, userMe } from '../services/api';

interface AuthContextType {
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { setTokens, clearTokens, setUser, clearUser } = useAuthStore();
  const { openRegisterModal } = useRegisterModal(); // Access openRegisterModal

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
    openRegisterModal(); // Open the register modal
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
