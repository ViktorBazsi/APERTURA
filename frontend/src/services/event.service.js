import { apiClient } from './api.client';

export const eventService = {
  list: () => apiClient.get('/events'),
  getById: (id) => apiClient.get(`/events/${id}`),
  create: (payload) => apiClient.post('/events', payload),
  update: (id, payload) => apiClient.put(`/events/${id}`, payload),
  remove: (id) => apiClient.delete(`/events/${id}`),
};