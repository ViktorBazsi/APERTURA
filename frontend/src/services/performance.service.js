import { apiClient } from './api.client';

export const performanceService = {
  list: () => apiClient.get('/performances'),
  getById: (id) => apiClient.get(`/performances/${id}`),
  getBySlug: (slug) => apiClient.get(`/performances/slug/${slug}`),
  create: (payload) => apiClient.post('/performances', payload),
  update: (id, payload) => apiClient.put(`/performances/${id}`, payload),
  remove: (id) => apiClient.delete(`/performances/${id}`),
  getRatingsSummary: (id) => apiClient.get(`/performances/${id}/ratings-summary`),
  submitRating: (id, value) => apiClient.post(`/performances/${id}/rating`, { value }),
  getFeedbacks: (id) => apiClient.get(`/performances/${id}/feedbacks`),
  createFeedback: (id, content) => apiClient.post(`/performances/${id}/feedbacks`, { content }),
};