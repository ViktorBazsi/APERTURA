import { Router } from 'express';
import { documentController } from '../controllers/document.controller.js';
import { catchAsync } from '../utils/catchAsync.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/admin.js';

const router = Router();

router.get('/', catchAsync(documentController.list));
router.get('/:id', catchAsync(documentController.getById));
router.post('/', requireAuth, requireAdmin, catchAsync(documentController.create));
router.delete('/:id', requireAuth, requireAdmin, catchAsync(documentController.remove));

export default router;