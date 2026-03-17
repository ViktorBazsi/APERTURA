import { Router } from 'express';
import { newsController } from '../controllers/news.controller.js';
import { catchAsync } from '../utils/catchAsync.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/admin.js';

const router = Router();

router.get('/', catchAsync(newsController.list));
router.get('/slug/:slug', catchAsync(newsController.getBySlug));
router.get('/:id', catchAsync(newsController.getById));
router.post('/', requireAuth, requireAdmin, catchAsync(newsController.create));
router.put('/:id', requireAuth, requireAdmin, catchAsync(newsController.update));
router.delete('/:id', requireAuth, requireAdmin, catchAsync(newsController.remove));

export default router;