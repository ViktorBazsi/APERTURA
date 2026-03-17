import { createCrudController } from './createCrudController.js';
import { documentService } from '../services/document.service.js';

export const documentController = createCrudController(documentService);