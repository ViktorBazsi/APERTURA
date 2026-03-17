import { prisma } from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';

function sanitizeUser(user) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    newsletterSubscribed: user.newsletterSubscribed,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function validateName(value, label) {
  const normalized = value?.trim();
  if (!normalized) {
    throw new ApiError(400, `${label} is required`);
  }
  return normalized;
}

function validatePhone(phone) {
  const normalized = phone?.trim();
  if (!normalized) {
    return null;
  }
  if (!/^[\d\s()+-]{7,20}$/.test(normalized)) {
    throw new ApiError(400, 'Phone number format is invalid');
  }
  return normalized;
}

export async function getOwnProfile(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return sanitizeUser(user);
}

export async function updateOwnProfile(userId, payload) {
  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      firstName: validateName(payload.firstName, 'First name'),
      lastName: validateName(payload.lastName, 'Last name'),
      phone: validatePhone(payload.phone),
      newsletterSubscribed: Boolean(payload.newsletterSubscribed),
    },
  });

  return sanitizeUser(updated);
}