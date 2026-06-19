import pool from '../config/db';
import { Testimonial, CreateTestimonialData, UpdateTestimonialData } from '../types';
import { AppError } from '../middleware/errorHandler';

export const testimonialService = {
  async getAllTestimonials(): Promise<Testimonial[]> {
    const result = await pool.query<Testimonial>(
      'SELECT * FROM testimonials ORDER BY created_at DESC'
    );
    return result.rows;
  },

  async createTestimonial(data: CreateTestimonialData): Promise<Testimonial> {
    const result = await pool.query<Testimonial>(
      `INSERT INTO testimonials (customer_name, review, rating, avatar_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [data.customer_name, data.review, data.rating, data.avatar_url || null]
    );

    return result.rows[0];
  },

  async updateTestimonial(id: string, data: UpdateTestimonialData): Promise<Testimonial> {
    const existing = await pool.query<Testimonial>(
      'SELECT * FROM testimonials WHERE id = $1',
      [id]
    );
    if (existing.rows.length === 0) {
      throw new AppError('Testimonial not found', 404);
    }

    const current = existing.rows[0];

    const result = await pool.query<Testimonial>(
      `UPDATE testimonials
       SET customer_name = $1, review = $2, rating = $3, avatar_url = $4
       WHERE id = $5
       RETURNING *`,
      [
        data.customer_name ?? current.customer_name,
        data.review ?? current.review,
        data.rating ?? current.rating,
        data.avatar_url ?? current.avatar_url,
        id,
      ]
    );

    return result.rows[0];
  },

  async deleteTestimonial(id: string): Promise<void> {
    const existing = await pool.query(
      'SELECT id FROM testimonials WHERE id = $1',
      [id]
    );
    if (existing.rows.length === 0) {
      throw new AppError('Testimonial not found', 404);
    }

    await pool.query('DELETE FROM testimonials WHERE id = $1', [id]);
  },
};
