import { Router } from 'express';
import { login, me, register } from '../controllers/auth.controller.js';
import { catchAsync } from '../utils/catchAsync.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.post('/register', catchAsync(register));
router.post('/login', catchAsync(login));
router.get('/me', requireAuth, catchAsync(me));

export default router;
