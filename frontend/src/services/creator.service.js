import { apiClient } from './api.client';

export const creatorService = {
  list: () => apiClient.get('/creators'),
  getById: (id) => apiClient.get(`/creators/${id}`),
  getBySlug: (slug) => apiClient.get(`/creators/slug/${slug}`),
  create: (payload) => apiClient.post('/creators', payload),
  update: (id, payload) => apiClient.put(`/creators/${id}`, payload),
  remove: (id) => apiClient.delete(`/creators/${id}`),
};