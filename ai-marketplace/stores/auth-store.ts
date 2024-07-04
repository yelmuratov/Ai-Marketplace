// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
    persist((set) => ({
        accessToken: null,
        refreshToken: null,
        user: null,
        setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
        clearTokens: () => set({ accessToken: null, refreshToken: null }),
        setUser: (user: IUser) => set({ user }),
        clearUser: () => set({ user: null }),
    }), {
        name: 'auth-storage',
    }),
);
