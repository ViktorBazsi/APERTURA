import { prisma } from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';

export function createCrudService(modelName) {
  const model = prisma[modelName];

  return {
    list: (args = {}) => model.findMany(args),
    getById: async (id, args = {}) => {
      const item = await model.findUnique({ where: { id }, ...args });
      if (!item) {
        throw new ApiError(404, 'Resource not found');
      }
      return item;
    },
    create: (data) => model.create({ data }),
    update: async (id, data) => {
      await model.findUniqueOrThrow({ where: { id } });
      return model.update({ where: { id }, data });
    },
    remove: async (id) => {
      await model.findUniqueOrThrow({ where: { id } });
      return model.delete({ where: { id } });
    },
  };
}
