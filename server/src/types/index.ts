// ============================================
// Desana Coffee - Shared TypeScript Interfaces
// ============================================

export interface Owner {
  id: string;
  email: string;
  password: string;
  name: string;
  created_at: Date;
}

export interface Menu {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  featured: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
  created_at: Date;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  review: string;
  rating: number;
  avatar_url: string | null;
  created_at: Date;
}

export interface WebsiteContent {
  id: string;
  section_name: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  image_url: string | null;
  updated_at: Date;
}

export interface MenuCategory {
  id: string;
  name: string;
  sort_order: number;
  created_at: Date;
}

export interface JwtPayload {
  ownerId: string;
  email: string;
}

// Extend Express Request to include owner property
declare global {
  namespace Express {
    interface Request {
      owner?: JwtPayload;
    }
  }
}

export interface CreateMenuData {
  name: string;
  description?: string;
  price: number;
  category: string;
  image_url?: string;
  featured?: boolean;
  sort_order?: number;
}

export interface UpdateMenuData {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  image_url?: string;
  featured?: boolean;
  sort_order?: number;
}

export interface CreateGalleryData {
  image_url: string;
  caption?: string;
  sort_order?: number;
}

export interface UpdateGalleryData {
  image_url?: string;
  caption?: string;
  sort_order?: number;
}

export interface CreateTestimonialData {
  customer_name: string;
  review: string;
  rating: number;
  avatar_url?: string;
}

export interface UpdateTestimonialData {
  customer_name?: string;
  review?: string;
  rating?: number;
  avatar_url?: string;
}

export interface CreateCategoryData {
  name: string;
  sort_order?: number;
}

export interface UpdateCategoryData {
  name?: string;
  sort_order?: number;
}
