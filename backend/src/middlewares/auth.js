import { prisma } from '../config/prisma.js';
import { verifyToken } from '../utils/jwt.js';
import { ApiError } from '../utils/ApiError.js';

async function resolveUserFromToken(token) {
  const payload = verifyToken(token);
  return prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, email: true, role: true, createdAt: true, updatedAt: true },
  });
}

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return next(new ApiError(401, 'Authentication required'));
  }

  try {
    const user = await resolveUserFromToken(token);

    if (!user) {
      return next(new ApiError(401, 'User not found'));
    }

    req.user = user;
    return next();
  } catch {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
}

export async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return next();
  }

  try {
    const user = await resolveUserFromToken(token);
    if (user) {
      req.user = user;
    }
  } catch {
    req.user = null;
  }

  return next();
}