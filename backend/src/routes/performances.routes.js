import { Router } from 'express';
import { performanceController } from '../controllers/performance.controller.js';
import { catchAsync } from '../utils/catchAsync.js';
import { requireAuth, optionalAuth } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/admin.js';

const router = Router();

router.get('/', catchAsync(performanceController.list));
router.get('/slug/:slug', catchAsync(performanceController.getBySlug));
router.get('/:id/ratings-summary', optionalAuth, catchAsync(performanceController.getRatingsSummary));
router.post('/:id/rating', requireAuth, catchAsync(performanceController.upsertRating));
router.get('/:id/feedbacks', catchAsync(performanceController.listFeedbacks));
router.post('/:id/feedbacks', requireAuth, catchAsync(performanceController.createFeedback));
router.get('/:id', catchAsync(performanceController.getById));
router.post('/', requireAuth, requireAdmin, catchAsync(performanceController.create));
router.put('/:id', requireAuth, requireAdmin, catchAsync(performanceController.update));
router.delete('/:id', requireAuth, requireAdmin, catchAsync(performanceController.remove));

export default router;