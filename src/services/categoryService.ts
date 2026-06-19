import { apiGet, apiPost, apiPut, apiDelete } from './api';
import type { MenuCategory } from '@/types';

export const categoryService = {
  async getAll(): Promise<MenuCategory[]> {
    const res = await apiGet<{ categories: MenuCategory[] }>('/categories');
    return res.data?.categories ?? [];
  },

  async create(data: { name: string; sort_order?: number }): Promise<MenuCategory | null> {
    const res = await apiPost<{ category: MenuCategory }>('/categories', data);
    return res.data?.category ?? null;
  },

  async update(id: string, data: { name?: string; sort_order?: number }): Promise<MenuCategory | null> {
    const res = await apiPut<{ category: MenuCategory }>(`/categories/${id}`, data);
    return res.data?.category ?? null;
  },

  async remove(id: string): Promise<{ success: boolean; error?: string }> {
    const res = await apiDelete(`/categories/${id}`);
    if (res.error) {
      return { success: false, error: res.error };
    }
    return { success: true };
  }
};
