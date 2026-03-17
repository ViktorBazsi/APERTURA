import { createCrudService } from './crud.service.js';
import { prisma } from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';
import { slugify } from '../utils/slugify.js';
import { deleteCloudinaryAssetByUrl } from './upload.service.js';

const crud = createCrudService('creator');

export const creatorService = {
  list: () =>
    crud.list({
      include: {
        performances: {
          include: {
            performance: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
  getById: (id) =>
    crud.getById(id, {
      include: {
        performances: {
          include: {
            performance: true,
          },
        },
      },
    }),
  getBySlug: async (slug) => {
    const item = await prisma.creator.findUnique({
      where: { slug },
      include: {
        performances: {
          include: {
            performance: true,
          },
        },
      },
    });

    if (!item) {
      throw new ApiError(404, 'Creator not found');
    }

    return item;
  },
  create: (payload) =>
    crud.create({
      ...payload,
      slug: payload.slug || slugify(payload.name),
    }),
  update: async (id, payload) => {
    const current = await prisma.creator.findUnique({ where: { id } });
    const next = await crud.update(id, {
      ...payload,
      slug: payload.slug || (payload.name ? slugify(payload.name) : undefined),
    });

    if (payload.coverImageUrl && current?.coverImageUrl && current.coverImageUrl !== payload.coverImageUrl) {
      await deleteCloudinaryAssetByUrl(current.coverImageUrl);
    }

    return next;
  },
  remove: async (id) => {
    const current = await prisma.creator.findUnique({ where: { id } });
    await crud.remove(id);
    if (current?.coverImageUrl) {
      await deleteCloudinaryAssetByUrl(current.coverImageUrl);
    }
  },
};