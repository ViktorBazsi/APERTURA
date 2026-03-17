import { Router } from 'express';
import { uploadDocuments, uploadImages } from '../controllers/upload.controller.js';
import { catchAsync } from '../utils/catchAsync.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/admin.js';
import { createImageUpload } from '../middlewares/upload.js';

const router = Router();
const upload = createImageUpload();

router.post('/image', requireAuth, requireAdmin, upload.array('images', 10), catchAsync(uploadImages));
router.post('/document', requireAuth, requireAdmin, upload.array('files', 5), catchAsync(uploadDocuments));

export default router;