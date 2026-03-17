import { apiClient } from './api.client';

export const newsService = {
  list: () => apiClient.get('/news'),
  getById: (id) => apiClient.get(`/news/${id}`),
  getBySlug: (slug) => apiClient.get(`/news/slug/${slug}`),
  create: (payload) => apiClient.post('/news', payload),
  update: (id, payload) => apiClient.put(`/news/${id}`, payload),
  remove: (id) => apiClient.delete(`/news/${id}`),
};