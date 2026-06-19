import { apiGet, apiPostForm, apiPutForm, apiDelete } from './api';
import type { Menu } from '@/types';

export const menuService = {
  async getAll(featured?: boolean): Promise<Menu[]> {
    const path = featured ? '/menus?featured=true' : '/menus';
    const res = await apiGet<{ menus: Menu[] }>(path);
    return res.data?.menus ?? [];
  },

  async getById(id: string): Promise<Menu | null> {
    const res = await apiGet<{ menu: Menu }>(`/menus/${id}`);
    return res.data?.menu ?? null;
  },

  async create(formData: FormData): Promise<Menu | null> {
    const res = await apiPostForm<{ menu: Menu }>('/menus', formData);
    return res.data?.menu ?? null;
  },

  async update(id: string, formData: FormData): Promise<Menu | null> {
    const res = await apiPutForm<{ menu: Menu }>(`/menus/${id}`, formData);
    return res.data?.menu ?? null;
  },

  async remove(id: string): Promise<boolean> {
    const res = await apiDelete(`/menus/${id}`);
    return !res.error;
  },
};
