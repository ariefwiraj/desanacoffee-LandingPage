import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import { Owner, JwtPayload } from '../types';
import { AppError } from '../middleware/errorHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'desana_coffee_jwt_secret_key_2024';
const JWT_EXPIRES_IN = '7d';

export const authService = {
  async login(email: string, password: string): Promise<{ token: string; owner: Omit<Owner, 'password'> }> {
    const result = await pool.query<Owner>(
      'SELECT * FROM owners WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      throw new AppError('Invalid email or password', 401);
    }

    const owner = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, owner.password);

    if (!isValidPassword) {
      throw new AppError('Invalid email or password', 401);
    }

    const payload: JwtPayload = {
      ownerId: owner.id,
      email: owner.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    const { password: _, ...ownerWithoutPassword } = owner;

    return { token, owner: ownerWithoutPassword };
  },

  async getOwnerById(id: string): Promise<Omit<Owner, 'password'> | null> {
    const result = await pool.query<Owner>(
      'SELECT id, email, name, created_at FROM owners WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  },
};
