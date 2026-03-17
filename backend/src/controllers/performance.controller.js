import { createCrudController } from './createCrudController.js';
import { performanceService } from '../services/performance.service.js';

const base = createCrudController(performanceService);

export const performanceController = {
  ...base,
  getBySlug: async (req, res) => {
    const item = await performanceService.getBySlug(req.params.slug);
    res.json(item);
  },
  getRatingsSummary: async (req, res) => {
    const item = await performanceService.getRatingsSummary(req.params.id, req.user?.id);
    res.json(item);
  },
  upsertRating: async (req, res) => {
    const item = await performanceService.upsertRating(req.params.id, req.user.id, Number(req.body.value));
    res.json(item);
  },
  listFeedbacks: async (req, res) => {
    const items = await performanceService.listFeedbacks(req.params.id);
    res.json(items);
  },
  createFeedback: async (req, res) => {
    const item = await performanceService.createFeedback(req.params.id, req.user.id, req.body.content);
    res.status(201).json(item);
  },
};