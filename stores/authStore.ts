// stores/auth-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/types';

const authApi = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'demo@blog.com' && password === 'password') {
      return {
        user: {
          id: '1',
          name: 'Demo User',
          email: 'demo@blog.com',
          avatar: '/avatars/demo.jpg',
          role: 'admin'
        },
        token: 'mock-jwt-token-' + Date.now()
      };
    }
    throw new Error('Invalid credentials');
  },

  register: async (userData: Omit<User, 'id'> & { password: string }): Promise<{ user: User; token: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      user: {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        role: 'user'
      },
      token: 'mock-jwt-token-' + Date.now()
    };
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { user, token } = await authApi.login(email, password);
          // Store token in localStorage for axios interceptor
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
          }
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          const { user, token } = await authApi.register(userData);
          // Store token in localStorage for axios interceptor
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
          }
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        // Remove token from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        set({ user: null, token: null, isAuthenticated: false });
      },

      initialize: () => {
        const { token, user } = get();
        // Sync token from localStorage if available
        if (typeof window !== 'undefined') {
          const storedToken = localStorage.getItem('token');
          if (storedToken && token && user) {
            set({ isAuthenticated: true });
          } else if (storedToken && !token) {
            // Token exists in localStorage but not in store - restore it
            const storedAuth = localStorage.getItem('auth-storage');
            if (storedAuth) {
              try {
                const parsed = JSON.parse(storedAuth);
                if (parsed.state?.token && parsed.state?.user) {
                  set({ 
                    token: parsed.state.token, 
                    user: parsed.state.user, 
                    isAuthenticated: true 
                  });
                }
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
        } else if (token && user) {
          set({ isAuthenticated: true });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token 
      })
    }
  )
);