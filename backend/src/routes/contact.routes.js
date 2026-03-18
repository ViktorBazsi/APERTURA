import { Router } from 'express';
import { submitContact } from '../controllers/contact.controller.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.post('/', catchAsync(submitContact));

export default router;