import pool from '../config/db';
import type { GalleryImage, CreateGalleryData, UpdateGalleryData } from '../types';
import { AppError } from '../middleware/errorHandler';
import { storageService } from './storageService';
import fs from 'fs';
import path from 'path';

export const galleryService = {
  async getAllImages(): Promise<GalleryImage[]> {
    const result = await pool.query<GalleryImage>(
      'SELECT * FROM gallery ORDER BY sort_order ASC, created_at DESC'
    );
    return result.rows;
  },

  async addImage(data: CreateGalleryData): Promise<GalleryImage> {
    const result = await pool.query<GalleryImage>(
      `INSERT INTO gallery (image_url, caption, sort_order)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [data.image_url, data.caption || null, data.sort_order ?? 0]
    );

    return result.rows[0];
  },

  async updateImage(id: string, data: UpdateGalleryData): Promise<GalleryImage> {
    const existing = await pool.query<GalleryImage>('SELECT * FROM gallery WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      throw new AppError('Gallery image not found', 404);
    }

    const current = existing.rows[0];

    const result = await pool.query<GalleryImage>(
      `UPDATE gallery
       SET image_url = $1, caption = $2, sort_order = $3
       WHERE id = $4
       RETURNING *`,
      [
        data.image_url ?? current.image_url,
        data.caption ?? current.caption,
        data.sort_order ?? current.sort_order,
        id,
      ]
    );

    // Delete old image file if replaced
    if (data.image_url && current.image_url && data.image_url !== current.image_url) {
      await deleteImageFile(current.image_url);
    }

    return result.rows[0];
  },

  async deleteImage(id: string): Promise<void> {
    const existing = await pool.query<GalleryImage>('SELECT * FROM gallery WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      throw new AppError('Gallery image not found', 404);
    }

    if (existing.rows[0].image_url) {
      await deleteImageFile(existing.rows[0].image_url);
    }

    await pool.query('DELETE FROM gallery WHERE id = $1', [id]);
  },
};

async function deleteImageFile(imageUrl: string): Promise<void> {
  try {
    if (imageUrl.startsWith('http')) {
      await storageService.deleteFile(imageUrl);
    } else {
      const filePath = path.join(__dirname, '../../', imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  } catch (err) {
    console.error('Failed to delete image file:', err);
  }
}
