import { Router } from 'express';
import { eventController } from '../controllers/event.controller.js';
import { catchAsync } from '../utils/catchAsync.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/admin.js';

const router = Router();

router.get('/', catchAsync(eventController.list));
router.get('/:id', catchAsync(eventController.getById));
router.post('/', requireAuth, requireAdmin, catchAsync(eventController.create));
router.put('/:id', requireAuth, requireAdmin, catchAsync(eventController.update));
router.delete('/:id', requireAuth, requireAdmin, catchAsync(eventController.remove));

export default router;
