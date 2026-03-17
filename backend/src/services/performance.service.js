import { createCrudService } from './crud.service.js';
import { prisma } from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';
import { slugify } from '../utils/slugify.js';
import { deleteCloudinaryAssetByUrl, deleteCloudinaryAssetsByUrls } from './upload.service.js';

const crud = createCrudService('performance');

function includeAll() {
  return {
    events: true,
    critiques: true,
    images: { orderBy: { order: 'asc' } },
    creators: {
      include: {
        creator: true,
      },
    },
  };
}

function normalizeGalleryImages(galleryImages = []) {
  return (galleryImages || []).map((image, index) => ({
    imageUrl: image.imageUrl,
    order: image.order ?? index,
  }));
}

async function ensurePerformance(id) {
  const performance = await prisma.performance.findUnique({ where: { id } });
  if (!performance) {
    throw new ApiError(404, 'Performance not found');
  }
  return performance;
}

async function getRatingsSummary(performanceId, userId) {
  await ensurePerformance(performanceId);
  const ratings = await prisma.performanceRating.findMany({ where: { performanceId } });
  const count = ratings.length;
  const average = count ? Number((ratings.reduce((sum, item) => sum + item.value, 0) / count).toFixed(1)) : 0;
  const userRating = userId ? ratings.find((item) => item.userId === userId)?.value || null : null;

  return { average, count, userRating };
}

export const performanceService = {
  list: () => crud.list({ include: includeAll(), orderBy: { createdAt: 'desc' } }),
  getById: (id) => crud.getById(id, { include: includeAll() }),
  getBySlug: async (slug) => {
    const item = await prisma.performance.findUnique({ where: { slug }, include: includeAll() });
    if (!item) {
      throw new ApiError(404, 'Performance not found');
    }
    return item;
  },
  create: async (payload) => {
    const { creatorIds = [], galleryImages = [], ...rest } = payload;
    return prisma.performance.create({
      data: {
        ...rest,
        slug: rest.slug || slugify(rest.title),
        creators: creatorIds.length ? { create: creatorIds.map((creatorId) => ({ creatorId })) } : undefined,
        images: galleryImages.length ? { create: normalizeGalleryImages(galleryImages) } : undefined,
      },
      include: includeAll(),
    });
  },
  update: async (id, payload) => {
    const { creatorIds, galleryImages, ...rest } = payload;
    const current = await prisma.performance.findUnique({ where: { id }, include: { images: true } });
    const next = await prisma.performance.update({
      where: { id },
      data: {
        ...rest,
        slug: rest.slug || (rest.title ? slugify(rest.title) : undefined),
        creators: creatorIds ? { deleteMany: {}, create: creatorIds.map((creatorId) => ({ creatorId })) } : undefined,
        images: galleryImages ? { deleteMany: {}, create: normalizeGalleryImages(galleryImages) } : undefined,
      },
      include: includeAll(),
    });

    if (rest.posterUrl && current?.posterUrl && current.posterUrl !== rest.posterUrl) {
      await deleteCloudinaryAssetByUrl(current.posterUrl);
    }

    if (galleryImages) {
      const nextUrls = new Set(galleryImages.map((image) => image.imageUrl));
      const removedUrls = current.images.map((image) => image.imageUrl).filter((url) => !nextUrls.has(url));
      await deleteCloudinaryAssetsByUrls(removedUrls);
    }

    return next;
  },
  remove: async (id) => {
    const current = await prisma.performance.findUnique({ where: { id }, include: { images: true } });
    await crud.remove(id);
    if (current?.posterUrl) {
      await deleteCloudinaryAssetByUrl(current.posterUrl);
    }
    await deleteCloudinaryAssetsByUrls(current?.images?.map((image) => image.imageUrl) || []);
  },
  getRatingsSummary,
  upsertRating: async (performanceId, userId, value) => {
    await ensurePerformance(performanceId);

    if (!Number.isInteger(value) || value < 1 || value > 5) {
      throw new ApiError(400, 'Rating must be an integer between 1 and 5');
    }

    await prisma.performanceRating.upsert({
      where: { performanceId_userId: { performanceId, userId } },
      update: { value },
      create: { performanceId, userId, value },
    });

    return getRatingsSummary(performanceId, userId);
  },
  listFeedbacks: async (performanceId) => {
    await ensurePerformance(performanceId);
    return prisma.performanceFeedback.findMany({
      where: { performanceId },
      include: { user: { select: { id: true, firstName: true, lastName: true, role: true } } },
      orderBy: { createdAt: 'desc' },
    });
  },
  createFeedback: async (performanceId, userId, content) => {
    await ensurePerformance(performanceId);
    const normalizedContent = content?.trim();

    if (!normalizedContent || normalizedContent.length < 3) {
      throw new ApiError(400, 'Feedback content is required');
    }

    return prisma.performanceFeedback.create({
      data: { performanceId, userId, content: normalizedContent },
      include: { user: { select: { id: true, firstName: true, lastName: true, role: true } } },
    });
  },
};