import pool from '../config/db';
import type { MenuCategory, CreateCategoryData, UpdateCategoryData } from '../types';

export const categoryService = {
  async getAllCategories(): Promise<MenuCategory[]> {
    const result = await pool.query(
      'SELECT * FROM menu_categories ORDER BY sort_order ASC, name ASC'
    );
    return result.rows;
  },

  async getCategoryById(id: string): Promise<MenuCategory | null> {
    const result = await pool.query('SELECT * FROM menu_categories WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  async getCategoryByName(name: string): Promise<MenuCategory | null> {
    const result = await pool.query('SELECT * FROM menu_categories WHERE name = $1', [name]);
    return result.rows[0] || null;
  },

  async createCategory(data: CreateCategoryData): Promise<MenuCategory> {
    const { name, sort_order = 0 } = data;
    const result = await pool.query(
      `INSERT INTO menu_categories (name, sort_order)
       VALUES ($1, $2) RETURNING *`,
      [name, sort_order]
    );
    return result.rows[0];
  },

  async updateCategory(id: string, data: UpdateCategoryData): Promise<MenuCategory> {
    // We need to cascade the name update to the menus table if name changed
    const currentCategory = await this.getCategoryById(id);
    if (!currentCategory) throw new Error('Category not found');

    const name = data.name !== undefined ? data.name : currentCategory.name;
    const sort_order = data.sort_order !== undefined ? data.sort_order : currentCategory.sort_order;

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const result = await client.query(
        `UPDATE menu_categories
         SET name = $1, sort_order = $2
         WHERE id = $3 RETURNING *`,
        [name, sort_order, id]
      );

      if (data.name && data.name !== currentCategory.name) {
        // Update menus that had the old category name
        await client.query(
          `UPDATE menus SET category = $1 WHERE category = $2`,
          [data.name, currentCategory.name]
        );
      }

      await client.query('COMMIT');
      return result.rows[0];
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  },

  async deleteCategory(id: string): Promise<void> {
    const currentCategory = await this.getCategoryById(id);
    if (!currentCategory) throw new Error('Category not found');

    // Prevent deletion if menus are using this category
    const menuCountRes = await pool.query(
      'SELECT count(*) FROM menus WHERE category = $1',
      [currentCategory.name]
    );
    const count = parseInt(menuCountRes.rows[0].count, 10);

    if (count > 0) {
      throw new Error(`Cannot delete category because it is used by ${count} menu item(s). Please move or delete them first.`);
    }

    await pool.query('DELETE FROM menu_categories WHERE id = $1', [id]);
  }
};
