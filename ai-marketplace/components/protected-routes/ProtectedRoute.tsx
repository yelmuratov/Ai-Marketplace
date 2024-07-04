import { useRouter } from 'next/router';
import { useAuthStore } from '.././../stores/auth-store';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push('/');
    }
  }, [accessToken, router]);

  if (!accessToken) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;