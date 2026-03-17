import { createCrudController } from './createCrudController.js';
import { creatorService } from '../services/creator.service.js';

const base = createCrudController(creatorService);

export const creatorController = {
  ...base,
  getBySlug: async (req, res) => {
    const item = await creatorService.getBySlug(req.params.slug);
    res.json(item);
  },
};
