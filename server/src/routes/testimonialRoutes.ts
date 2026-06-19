import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { testimonialService } from '../services/testimonialService';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// GET /api/testimonials - public
router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const testimonials = await testimonialService.getAllTestimonials();
    res.json({ testimonials });
  } catch (error) {
    next(error);
  }
});

// POST /api/testimonials - auth required
router.post(
  '/',
  authMiddleware,
  [
    body('customer_name')
      .notEmpty()
      .withMessage('Customer name is required')
      .trim(),
    body('review')
      .notEmpty()
      .withMessage('Review is required')
      .trim(),
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be an integer between 1 and 5'),
    body('avatar_url').optional().trim(),
  ],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const data = {
        customer_name: req.body.customer_name,
        review: req.body.review,
        rating: parseInt(req.body.rating, 10),
        avatar_url: req.body.avatar_url,
      };

      const testimonial = await testimonialService.createTestimonial(data);
      res.status(201).json({ message: 'Testimonial created', testimonial });
    } catch (error) {
      next(error);
    }
  }
);

// PUT /api/testimonials/:id - auth required
router.put(
  '/:id',
  authMiddleware,
  [
    body('customer_name')
      .optional()
      .notEmpty()
      .withMessage('Customer name cannot be empty')
      .trim(),
    body('review')
      .optional()
      .notEmpty()
      .withMessage('Review cannot be empty')
      .trim(),
    body('rating')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be an integer between 1 and 5'),
    body('avatar_url').optional().trim(),
  ],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const data: Record<string, any> = {};
      if (req.body.customer_name !== undefined) data.customer_name = req.body.customer_name;
      if (req.body.review !== undefined) data.review = req.body.review;
      if (req.body.rating !== undefined) data.rating = parseInt(req.body.rating, 10);
      if (req.body.avatar_url !== undefined) data.avatar_url = req.body.avatar_url;

      const testimonial = await testimonialService.updateTestimonial((req.params.id as string), data);
      res.json({ message: 'Testimonial updated', testimonial });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/testimonials/:id - auth required
router.delete(
  '/:id',
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await testimonialService.deleteTestimonial((req.params.id as string));
      res.json({ message: 'Testimonial deleted' });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
