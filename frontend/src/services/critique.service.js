import { apiClient } from './api.client';

export const critiqueService = {
  list: () => apiClient.get('/critiques'),
  getById: (id) => apiClient.get(`/critiques/${id}`),
  create: (payload) => apiClient.post('/critiques', payload),
  update: (id, payload) => apiClient.put(`/critiques/${id}`, payload),
  remove: (id) => apiClient.delete(`/critiques/${id}`),
};