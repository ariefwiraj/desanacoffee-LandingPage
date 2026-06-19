import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { authService } from '../services/authService';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 1 })
      .withMessage('Password cannot be empty'),
  ],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { email, password } = req.body;
      const result = await authService.login(email, password);

      res.json({
        message: 'Login successful',
        token: result.token,
        owner: result.owner,
      });
    } catch (error) {
      next(error);
    }
  }
);

// GET /api/auth/me
router.get(
  '/me',
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.owner) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }

      const owner = await authService.getOwnerById(req.owner.ownerId);
      if (!owner) {
        res.status(404).json({ error: 'Owner not found' });
        return;
      }

      res.json({ owner });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
