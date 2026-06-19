import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middleware/auth';
import upload from '../middleware/upload';
import { storageService } from '../services/storageService';

const router = Router();

// POST /api/upload - auth required, general-purpose image upload
router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'No image file provided' });
        return;
      }

      const url = await storageService.uploadFile(req.file);
      res.status(201).json({
        message: 'File uploaded successfully',
        url,
        filename: req.file.originalname,
        size: req.file.size,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
