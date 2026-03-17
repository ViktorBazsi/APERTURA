import { createCrudController } from './createCrudController.js';
import { critiqueService } from '../services/critique.service.js';

export const critiqueController = createCrudController(critiqueService);
