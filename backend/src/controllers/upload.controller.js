import { uploadManyBuffersToCloudinary } from '../services/upload.service.js';
import { ApiError } from '../utils/ApiError.js';

const imageFolders = new Set([
  'apertura/creators',
  'apertura/performances/posters',
  'apertura/performances/gallery',
  'apertura/news',
]);

const documentFolders = new Set(['apertura/documents']);

export async function uploadImages(req, res) {
  const folder = req.body.folder;

  if (!imageFolders.has(folder)) {
    throw new ApiError(400, 'Invalid upload folder');
  }

  const files = req.files || [];
  const uploads = await uploadManyBuffersToCloudinary(files, folder, 'image');

  res.status(201).json({ message: 'Images uploaded', files: uploads });
}

export async function uploadDocuments(req, res) {
  const folder = req.body.folder;

  if (!documentFolders.has(folder)) {
    throw new ApiError(400, 'Invalid upload folder');
  }

  const files = req.files || [];
  const uploads = await uploadManyBuffersToCloudinary(files, folder, 'raw');

  res.status(201).json({ message: 'Documents uploaded', files: uploads });
}