export interface Menu {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  caption: string;
  sort_order: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  review: string;
  rating: number;
  avatar_url: string | null;
  created_at: string;
}

export interface Owner {
  id: string;
  email: string;
  name: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  sort_order: number;
  created_at: string;
}
