import { apiClient } from './api.client';

export const feedbackService = {
  remove: (id) => apiClient.delete(`/feedbacks/${id}`),
};