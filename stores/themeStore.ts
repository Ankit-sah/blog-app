// stores/theme-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeState } from '@/types';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme: 'light' | 'dark' | 'system') => set({ theme })
    }),
    {
      name: 'theme-storage'
    }
  )
);