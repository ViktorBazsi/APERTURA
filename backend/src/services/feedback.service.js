import { prisma } from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';

export async function removeFeedback(id, authUser) {
  const feedback = await prisma.performanceFeedback.findUnique({ where: { id } });

  if (!feedback) {
    throw new ApiError(404, 'Feedback not found');
  }

  if (authUser.role !== 'admin' && feedback.userId !== authUser.id) {
    throw new ApiError(403, 'You are not allowed to delete this feedback');
  }

  await prisma.performanceFeedback.delete({ where: { id } });
}