import { apiPost, apiGet, setToken, clearToken } from './api';
import type { Owner } from '@/types';

interface LoginResponse {
  token: string;
  owner: Owner;
}

export const authService = {
  async login(
    email: string,
    password: string
  ): Promise<{ owner: Owner; token: string } | null> {
    const res = await apiPost<LoginResponse>('/auth/login', { email, password });
    if (res.data) {
      setToken(res.data.token);
      return { owner: res.data.owner, token: res.data.token };
    }
    return null;
  },

  async getMe(): Promise<Owner | null> {
    const res = await apiGet<{ owner: Owner }>('/auth/me');
    return res.data?.owner ?? null;
  },

  logout(): void {
    clearToken();
  },
};
