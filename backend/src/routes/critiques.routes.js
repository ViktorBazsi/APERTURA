import { Router } from 'express';
import { critiqueController } from '../controllers/critique.controller.js';
import { catchAsync } from '../utils/catchAsync.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/admin.js';

const router = Router();

router.get('/', catchAsync(critiqueController.list));
router.get('/:id', catchAsync(critiqueController.getById));
router.post('/', requireAuth, requireAdmin, catchAsync(critiqueController.create));
router.put('/:id', requireAuth, requireAdmin, catchAsync(critiqueController.update));
router.delete('/:id', requireAuth, requireAdmin, catchAsync(critiqueController.remove));

export default router;
