import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { menuService } from '../services/menuService';
import { authMiddleware } from '../middleware/auth';
import upload from '../middleware/upload';
import { storageService } from '../services/storageService';

const router = Router();

// GET /api/menus - public
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const featured = req.query.featured === 'true' ? true : undefined;
    const menus = await menuService.getAllMenus(featured);
    res.json({ menus });
  } catch (error) {
    next(error);
  }
});

// GET /api/menus/:id - public
router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const menu = await menuService.getMenuById((req.params.id as string));
    res.json({ menu });
  } catch (error) {
    next(error);
  }
});

// POST /api/menus - auth required
router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  [
    body('name').notEmpty().withMessage('Menu name is required').trim(),
    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .isInt({ min: 0 })
      .withMessage('Price must be a non-negative integer'),
    body('category')
      .notEmpty()
      .withMessage('Category is required')
      .trim(),
    body('description').optional().trim(),
    body('featured').optional().isBoolean().withMessage('Featured must be a boolean'),
    body('sort_order').optional().isInt().withMessage('Sort order must be an integer'),
  ],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const data = {
        name: req.body.name,
        description: req.body.description,
        price: parseInt(req.body.price, 10),
        category: req.body.category,
        image_url: req.file ? await storageService.uploadFile(req.file) : req.body.image_url,
        featured: req.body.featured === 'true' || req.body.featured === true,
        sort_order: req.body.sort_order ? parseInt(req.body.sort_order, 10) : 0,
      };

      const menu = await menuService.createMenu(data);
      res.status(201).json({ message: 'Menu item created', menu });
    } catch (error) {
      next(error);
    }
  }
);

// PUT /api/menus/:id - auth required
router.put(
  '/:id',
  authMiddleware,
  upload.single('image'),
  [
    body('name').optional().notEmpty().withMessage('Menu name cannot be empty').trim(),
    body('price')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Price must be a non-negative integer'),
    body('category').optional().notEmpty().withMessage('Category cannot be empty').trim(),
    body('description').optional().trim(),
    body('featured').optional().isBoolean().withMessage('Featured must be a boolean'),
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
      if (req.body.description !== undefined) data.description = req.body.description;
      if (req.body.price !== undefined) data.price = parseInt(req.body.price, 10);
      if (req.body.category !== undefined) data.category = req.body.category;
      if (req.file) data.image_url = await storageService.uploadFile(req.file);
      else if (req.body.image_url !== undefined) data.image_url = req.body.image_url;
      if (req.body.featured !== undefined) {
        data.featured = req.body.featured === 'true' || req.body.featured === true;
      }
      if (req.body.sort_order !== undefined) data.sort_order = parseInt(req.body.sort_order, 10);

      const menu = await menuService.updateMenu((req.params.id as string), data);
      res.json({ message: 'Menu item updated', menu });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/menus/:id - auth required
router.delete(
  '/:id',
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await menuService.deleteMenu((req.params.id as string));
      res.json({ message: 'Menu item deleted' });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
