import { create } from 'zustand';
import { authService } from '@/services/authService';
import { getToken } from '@/services/api';
import type { Owner } from '@/types';

interface AuthState {
  owner: Owner | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  owner: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email, password) => {
    const result = await authService.login(email, password);
    if (result) {
      set({ owner: result.owner, isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => {
    authService.logout();
    set({ owner: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = getToken();
    if (!token) {
      set({ isLoading: false, isAuthenticated: false, owner: null });
      return;
    }

    const owner = await authService.getMe();
    if (owner) {
      set({ owner, isAuthenticated: true, isLoading: false });
    } else {
      set({ owner: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
