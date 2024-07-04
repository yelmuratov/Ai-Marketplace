// hooks/useSessionTimeout.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';

const useSessionTimeout = (timeout: number = 24 * 60 * 60 * 1000) => { // Default timeout is 24 hours
  const router = useRouter();
  const { clearTokens, clearUser } = useAuthStore();

  useEffect(() => {
    let activityTimeout: NodeJS.Timeout;

    const resetTimeout = () => {
      if (activityTimeout) clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        clearTokens();
        clearUser();
        localStorage.removeItem('auth-storage');
        router.push('/login');
      }, timeout);
    };

    const handleActivity = () => {
      resetTimeout();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    resetTimeout(); // Start the timeout on mount

    return () => {
      if (activityTimeout) clearTimeout(activityTimeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [clearTokens, clearUser, router, timeout]);
};

export default useSessionTimeout;
