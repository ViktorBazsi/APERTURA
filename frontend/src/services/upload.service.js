import { apiClient } from './api.client';

export const uploadService = {
  uploadImages: async (folder, files) => {
    const formData = new FormData();
    formData.append('folder', folder);
    Array.from(files).forEach((file) => formData.append('images', file));

    return apiClient.post('/uploads/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadDocuments: async (folder, files) => {
    const formData = new FormData();
    formData.append('folder', folder);
    Array.from(files).forEach((file) => formData.append('files', file));

    return apiClient.post('/uploads/document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};