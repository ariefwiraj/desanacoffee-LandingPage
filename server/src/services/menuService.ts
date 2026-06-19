import pool from '../config/db';
import { Menu, CreateMenuData, UpdateMenuData } from '../types';
import { storageService } from './storageService';
import { AppError } from '../middleware/errorHandler';
import fs from 'fs';
import path from 'path';

export const menuService = {
  async getAllMenus(featured?: boolean): Promise<Menu[]> {
    let query = 'SELECT * FROM menus';
    const params: any[] = [];

    if (featured !== undefined) {
      query += ' WHERE featured = $1';
      params.push(featured);
    }

    query += ' ORDER BY sort_order ASC, created_at DESC';

    const result = await pool.query<Menu>(query, params);
    return result.rows;
  },

  async getMenuById(id: string): Promise<Menu> {
    const result = await pool.query<Menu>(
      'SELECT * FROM menus WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      throw new AppError('Menu item not found', 404);
    }

    return result.rows[0];
  },

  async createMenu(data: CreateMenuData): Promise<Menu> {
    const result = await pool.query<Menu>(
      `INSERT INTO menus (name, description, price, category, image_url, featured, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        data.name,
        data.description || null,
        data.price,
        data.category,
        data.image_url || null,
        data.featured ?? false,
        data.sort_order ?? 0,
      ]
    );

    return result.rows[0];
  },

  async updateMenu(id: string, data: UpdateMenuData): Promise<Menu> {
    // First check if the menu exists
    const existing = await pool.query<Menu>('SELECT * FROM menus WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      throw new AppError('Menu item not found', 404);
    }

    const current = existing.rows[0];

    const result = await pool.query<Menu>(
      `UPDATE menus
       SET name = $1, description = $2, price = $3, category = $4,
           image_url = $5, featured = $6, sort_order = $7, updated_at = NOW()
       WHERE id = $8
       RETURNING *`,
      [
        data.name ?? current.name,
        data.description ?? current.description,
        data.price ?? current.price,
        data.category ?? current.category,
        data.image_url ?? current.image_url,
        data.featured ?? current.featured,
        data.sort_order ?? current.sort_order,
        id,
      ]
    );

    // If image was replaced, delete the old file
    if (data.image_url && current.image_url && data.image_url !== current.image_url) {
      await deleteImageFile(current.image_url);
    }

    return result.rows[0];
  },

  async deleteMenu(id: string): Promise<void> {
    const existing = await pool.query<Menu>('SELECT * FROM menus WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      throw new AppError('Menu item not found', 404);
    }

    // Delete associated image file if exists
    if (existing.rows[0].image_url) {
      await deleteImageFile(existing.rows[0].image_url);
    }

    await pool.query('DELETE FROM menus WHERE id = $1', [id]);
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
