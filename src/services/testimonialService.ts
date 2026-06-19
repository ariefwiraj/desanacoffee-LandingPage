import { apiGet, apiPost, apiPut, apiDelete } from './api';
import type { Testimonial } from '@/types';

export const testimonialService = {
  async getAll(): Promise<Testimonial[]> {
    const res = await apiGet<{ testimonials: Testimonial[] }>('/testimonials');
    return res.data?.testimonials ?? [];
  },

  async create(data: {
    customer_name: string;
    review: string;
    rating: number;
    avatar_url?: string | null;
  }): Promise<Testimonial | null> {
    const res = await apiPost<{ testimonial: Testimonial }>('/testimonials', data);
    return res.data?.testimonial ?? null;
  },

  async update(
    id: string,
    data: {
      customer_name: string;
      review: string;
      rating: number;
      avatar_url?: string | null;
    }
  ): Promise<Testimonial | null> {
    const res = await apiPut<{ testimonial: Testimonial }>(`/testimonials/${id}`, data);
    return res.data?.testimonial ?? null;
  },

  async remove(id: string): Promise<boolean> {
    const res = await apiDelete(`/testimonials/${id}`);
    return !res.error;
  },
};
