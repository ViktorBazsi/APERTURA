import { createCrudService } from './crud.service.js';
import { deleteCloudinaryAssetByUrl } from './upload.service.js';

const crud = createCrudService('document');

export const documentService = {
  list: () => crud.list({ orderBy: { createdAt: 'desc' } }),
  getById: crud.getById,
  create: crud.create,
  update: crud.update,
  remove: async (id) => {
    const current = await crud.getById(id);
    await crud.remove(id);
    if (current?.fileUrl) {
      await deleteCloudinaryAssetByUrl(current.fileUrl, 'raw');
    }
  },
};