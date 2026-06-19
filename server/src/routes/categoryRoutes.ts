import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { categoryService } from '../services/categoryService';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// GET /api/categories - public
router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json({ categories });
  } catch (error) {
    next(error);
  }
});

// POST /api/categories - auth required
router.post(
  '/',
  authMiddleware,
  [
    body('name').notEmpty().withMessage('Category name is required').trim(),
    body('sort_order').optional().isInt().withMessage('Sort order must be an integer'),
  ],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      // Check for duplicate name
      const existing = await categoryService.getCategoryByName(req.body.name);
      if (existing) {
        res.status(400).json({ error: 'Category with this name already exists' });
        return;
      }

      const data = {
        name: req.body.name,
        sort_order: req.body.sort_order ? parseInt(req.body.sort_order, 10) : 0,
      };

      const category = await categoryService.createCategory(data);
      res.status(201).json({ message: 'Category created', category });
    } catch (error) {
      next(error);
    }
  }
);

// PUT /api/categories/:id - auth required
router.put(
  '/:id',
  authMiddleware,
  [
    body('name').optional().notEmpty().withMessage('Category name cannot be empty').trim(),
    body('sort_order').optional().isInt().withMessage('Sort order must be an integer'),
  ],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const data: Record<string, any> = {};
      if (req.body.name !== undefined) data.name = req.body.name;
      if (req.body.sort_order !== undefined) data.sort_order = parseInt(req.body.sort_order, 10);

      if (data.name) {
        const existing = await categoryService.getCategoryByName(data.name);
        if (existing && existing.id !== (req.params.id as string)) {
          res.status(400).json({ error: 'Category with this name already exists' });
          return;
        }
      }

      const category = await categoryService.updateCategory((req.params.id as string), data);
      res.json({ message: 'Category updated', category });
    } catch (error: any) {
      if (error.message === 'Category not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      next(error);
    }
  }
);

// DELETE /api/categories/:id - auth required
router.delete(
  '/:id',
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await categoryService.deleteCategory((req.params.id as string));
      res.json({ message: 'Category deleted' });
    } catch (error: any) {
      if (error.message.startsWith('Cannot delete')) {
        res.status(400).json({ error: error.message });
        return;
      }
      if (error.message === 'Category not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      next(error);
    }
  }
);

export default router;
