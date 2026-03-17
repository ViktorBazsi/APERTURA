import { createCrudService } from './crud.service.js';
import { prisma } from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';
import { slugify } from '../utils/slugify.js';
import { deleteCloudinaryAssetByUrl } from './upload.service.js';

const crud = createCrudService('news');

export const newsService = {
  list: () => crud.list({ orderBy: { publishedAt: 'desc' } }),
  getById: crud.getById,
  getBySlug: async (slug) => {
    const item = await prisma.news.findUnique({ where: { slug } });
    if (!item) {
      throw new ApiError(404, 'News not found');
    }
    return item;
  },
  create: (payload) =>
    crud.create({
      ...payload,
      slug: payload.slug || slugify(payload.title),
    }),
  update: async (id, payload) => {
    const current = await prisma.news.findUnique({ where: { id } });
    const next = await crud.update(id, {
      ...payload,
      slug: payload.slug || (payload.title ? slugify(payload.title) : undefined),
    });

    if (payload.coverImageUrl && current?.coverImageUrl && current.coverImageUrl !== payload.coverImageUrl) {
      await deleteCloudinaryAssetByUrl(current.coverImageUrl);
    }

    return next;
  },
  remove: async (id) => {
    const current = await prisma.news.findUnique({ where: { id } });
    await crud.remove(id);
    if (current?.coverImageUrl) {
      await deleteCloudinaryAssetByUrl(current.coverImageUrl);
    }
  },
};