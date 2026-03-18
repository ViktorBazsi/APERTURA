import { apiClient } from './api.client';

export const contactService = {
  submit: (payload) => apiClient.post('/contact', payload),
};