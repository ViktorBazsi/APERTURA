import { Router } from 'express';
import authRoutes from './auth.routes.js';
import creatorRoutes from './creators.routes.js';
import performanceRoutes from './performances.routes.js';
import eventRoutes from './events.routes.js';
import newsRoutes from './news.routes.js';
import critiqueRoutes from './critiques.routes.js';
import uploadRoutes from './uploads.routes.js';
import userRoutes from './users.routes.js';
import documentRoutes from './documents.routes.js';
import feedbackRoutes from './feedbacks.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/creators', creatorRoutes);
router.use('/performances', performanceRoutes);
router.use('/events', eventRoutes);
router.use('/news', newsRoutes);
router.use('/critiques', critiqueRoutes);
router.use('/documents', documentRoutes);
router.use('/feedbacks', feedbackRoutes);
router.use('/uploads', uploadRoutes);

export default router;