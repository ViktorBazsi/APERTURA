import { apiClient } from './api.client';

export const documentService = {
  list: () => apiClient.get('/documents'),
  getById: (id) => apiClient.get(`/documents/${id}`),
  create: (payload) => apiClient.post('/documents', payload),
  remove: (id) => apiClient.delete(`/documents/${id}`),
};