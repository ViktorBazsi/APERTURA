import { Router } from 'express';
import { destroyFeedback } from '../controllers/feedback.controller.js';
import { catchAsync } from '../utils/catchAsync.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.delete('/:id', requireAuth, catchAsync(destroyFeedback));

export default router;