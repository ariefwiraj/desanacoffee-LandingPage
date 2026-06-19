import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { galleryService } from '../services/galleryService';
import { authMiddleware } from '../middleware/auth';
import upload from '../middleware/upload';
import { storageService } from '../services/storageService';

const router = Router();

// GET /api/gallery - public
router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const images = await galleryService.getAllImages();
    res.json({ images });
  } catch (error) {
    next(error);
  }
});

// POST /api/gallery - auth required
router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  [
    body('caption').optional().trim(),
    body('sort_order').optional().isInt().withMessage('Sort order must be an integer'),
  ],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      if (!req.file && !req.body.image_url) {
        res.status(400).json({ error: 'Image file is required' });
        return;
      }

      const data = {
        image_url: req.file ? await storageService.uploadFile(req.file) : req.body.image_url,
        caption: req.body.caption,
        sort_order: req.body.sort_order ? parseInt(req.body.sort_order, 10) : 0,
      };

      const image = await galleryService.addImage(data);
      res.status(201).json({ message: 'Gallery image added', image });
    } catch (error) {
      next(error);
    }
  }
);

// PUT /api/gallery/:id - auth required
router.put(
  '/:id',
  authMiddleware,
  upload.single('image'),
  [
    body('caption').optional().trim(),
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
      if (req.file) data.image_url = await storageService.uploadFile(req.file);
      else if (req.body.image_url !== undefined) data.image_url = req.body.image_url;
      if (req.body.caption !== undefined) data.caption = req.body.caption;
      if (req.body.sort_order !== undefined) data.sort_order = parseInt(req.body.sort_order, 10);

      const image = await galleryService.updateImage((req.params.id as string), data);
      res.json({ message: 'Gallery image updated', image });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/gallery/:id - auth required
router.delete(
  '/:id',
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await galleryService.deleteImage((req.params.id as string));
      res.json({ message: 'Gallery image deleted' });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
