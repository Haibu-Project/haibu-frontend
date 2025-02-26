import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
  name: string;
  surnames: string;
  username: string;
  email: string;
  setUser: (user: Partial<UserState>) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      surnames: '',
      username: '',
      email: '',
      setUser: (user) => set((state) => ({ ...state, ...user })),
      clearUser: () => set({ name: '', surnames: '', username: '', email: '' }),
    }),
    {
      name: 'user-storage',
    }
  )
);