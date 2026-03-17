import { Router } from 'express';
import { creatorController } from '../controllers/creator.controller.js';
import { catchAsync } from '../utils/catchAsync.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/admin.js';

const router = Router();

router.get('/', catchAsync(creatorController.list));
router.get('/slug/:slug', catchAsync(creatorController.getBySlug));
router.get('/:id', catchAsync(creatorController.getById));
router.post('/', requireAuth, requireAdmin, catchAsync(creatorController.create));
router.put('/:id', requireAuth, requireAdmin, catchAsync(creatorController.update));
router.delete('/:id', requireAuth, requireAdmin, catchAsync(creatorController.remove));

export default router;
