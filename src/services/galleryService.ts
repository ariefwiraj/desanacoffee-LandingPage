import { apiGet, apiPostForm, apiPutForm, apiDelete } from './api';
import type { GalleryImage } from '@/types';

export const galleryService = {
  async getAll(): Promise<GalleryImage[]> {
    const res = await apiGet<{ images: GalleryImage[] }>('/gallery');
    return res.data?.images ?? [];
  },

  async create(formData: FormData): Promise<GalleryImage | null> {
    const res = await apiPostForm<{ image: GalleryImage }>('/gallery', formData);
    return res.data?.image ?? null;
  },

  async update(id: string, formData: FormData): Promise<GalleryImage | null> {
    const res = await apiPutForm<{ image: GalleryImage }>(`/gallery/${id}`, formData);
    return res.data?.image ?? null;
  },

  async remove(id: string): Promise<boolean> {
    const res = await apiDelete(`/gallery/${id}`);
    return !res.error;
  },
};
