import bcrypt from 'bcrypt';
import { prisma } from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';
import { signToken } from '../utils/jwt.js';

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

function normalizeEmail(email) {
  return email?.trim().toLowerCase();
}

function validateEmail(normalizedEmail) {
  if (!normalizedEmail || !/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
    throw new ApiError(400, 'Valid email is required');
  }
}

function validatePassword(password) {
  if (!password || password.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters long');
  }
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

function validateLoginCredentials({ email, password }) {
  const normalizedEmail = normalizeEmail(email);
  validateEmail(normalizedEmail);
  validatePassword(password);
  return normalizedEmail;
}

function validateRegisterPayload({ firstName, lastName, email, phone, password }) {
  const normalizedEmail = normalizeEmail(email);
  validateEmail(normalizedEmail);
  validatePassword(password);

  return {
    firstName: validateName(firstName, 'First name'),
    lastName: validateName(lastName, 'Last name'),
    email: normalizedEmail,
    phone: validatePhone(phone),
  };
}

export async function registerUser({ firstName, lastName, email, phone, password }) {
  const normalized = validateRegisterPayload({ firstName, lastName, email, phone, password });
  const existingUser = await prisma.user.findUnique({ where: { email: normalized.email } });

  if (existingUser) {
    throw new ApiError(409, 'Email already in use');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      firstName: normalized.firstName,
      lastName: normalized.lastName,
      email: normalized.email,
      phone: normalized.phone,
      newsletterSubscribed: false,
      passwordHash,
      role: 'user',
    },
  });

  return {
    token: signToken({ sub: user.id, role: user.role }),
    user: sanitizeUser(user),
  };
}

export async function loginUser({ email, password }) {
  const normalizedEmail = validateLoginCredentials({ email, password });
  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  return {
    token: signToken({ sub: user.id, role: user.role }),
    user: sanitizeUser(user),
  };
}

export async function getCurrentUser(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return sanitizeUser(user);
}