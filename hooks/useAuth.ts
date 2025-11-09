
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';


export const useAuth = () => {
  const router = useRouter();
  const { user, token, isAuthenticated, isLoading, login, register, logout, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const requireAuth = (redirectTo = '/login') => {
    if (!isAuthenticated && !isLoading) {
      router.push(redirectTo);
      return false;
    }
    return true;
  };

  const redirectIfAuthenticated = (redirectTo = '/dashboard') => {
    if (isAuthenticated && !isLoading) {
      router.push(redirectTo);
      return true;
    }
    return false;
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    requireAuth,
    redirectIfAuthenticated
  };
};