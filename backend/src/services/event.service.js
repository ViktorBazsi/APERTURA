import { createCrudService } from './crud.service.js';

const crud = createCrudService('event');

export const eventService = {
  list: () => crud.list({ include: { performance: true }, orderBy: { startAt: 'asc' } }),
  getById: (id) => crud.getById(id, { include: { performance: true } }),
  create: crud.create,
  update: crud.update,
  remove: crud.remove,
};
