import { apiClient } from './api.client';

export const userService = {
  getMe: () => apiClient.get('/users/me'),
  updateMe: (payload) => apiClient.patch('/users/me', payload),
};