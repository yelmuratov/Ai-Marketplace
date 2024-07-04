// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { refreshToken as fetchNewToken } from '../services/api';

interface IUser {
  username: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: IUser | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  setUser: (user: IUser) => void;
  clearUser: () => void;
  refreshTokens: () => Promise<void>; // Add method to refresh tokens
}

interface RegisterModalStore {
  isRegisterModalOpen: boolean;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
}

interface LoginModalStore {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const isClient = typeof window !== 'undefined';

export const useRegisterModal = create<RegisterModalStore>((set) => ({
  isRegisterModalOpen: isClient ? JSON.parse(localStorage.getItem('isRegisterModalOpen') as string) || true : true,
  openRegisterModal: () => set({ isRegisterModalOpen: true }),
  closeRegisterModal: () => set({ isRegisterModalOpen: false }),
}));

export const useLoginModal = create<LoginModalStore>((set) => ({
  isLoginModalOpen: isClient ? Boolean(localStorage.getItem('isLoginModalOpen') as string) || false : false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}));

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
      setUser: (user: IUser) => set({ user }),
      clearUser: () => set({ user: null }),
      refreshTokens: async () => {
        const { refreshToken, setTokens, clearTokens, clearUser } = get();
        if (refreshToken) {
          try {
            const data = await fetchNewToken(refreshToken);
            setTokens(data.access, data.refresh);
            localStorage.setItem('auth-storage', JSON.stringify({ state: { user: get().user, accessToken: data.access, refreshToken: data.refresh } }));
          } catch (error) {
            clearTokens();
            clearUser();
            localStorage.removeItem('auth-storage');
            console.error('Failed to refresh token:', error);
          }
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
