import { Router } from 'express';
import { getMe, patchMe } from '../controllers/user.controller.js';
import { catchAsync } from '../utils/catchAsync.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.get('/me', requireAuth, catchAsync(getMe));
router.patch('/me', requireAuth, catchAsync(patchMe));

export default router;