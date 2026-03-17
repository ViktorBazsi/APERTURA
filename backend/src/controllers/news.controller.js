import { createCrudController } from './createCrudController.js';
import { newsService } from '../services/news.service.js';

const base = createCrudController(newsService);

export const newsController = {
  ...base,
  getBySlug: async (req, res) => {
    const item = await newsService.getBySlug(req.params.slug);
    res.json(item);
  },
};