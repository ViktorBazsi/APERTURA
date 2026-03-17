import { createCrudService } from './crud.service.js';

const crud = createCrudService('critique');

export const critiqueService = {
  list: () => crud.list({ include: { performance: true }, orderBy: { createdAt: 'desc' } }),
  getById: (id) => crud.getById(id, { include: { performance: true } }),
  create: crud.create,
  update: crud.update,
  remove: crud.remove,
};
