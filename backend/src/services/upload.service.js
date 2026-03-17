import path from 'path';
import { cloudinary } from '../config/cloudinary.js';
import { ApiError } from '../utils/ApiError.js';

export async function uploadBufferToCloudinary(file, folder, resourceType = 'image') {
  if (!file) {
    throw new ApiError(400, 'Upload file is required');
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          filename: file.originalname,
          resourceType,
        });
      },
    );

    stream.end(file.buffer);
  });
}

export async function uploadManyBuffersToCloudinary(files, folder, resourceType = 'image') {
  return Promise.all((files || []).map((file) => uploadBufferToCloudinary(file, folder, resourceType)));
}

export function extractPublicIdFromUrl(url) {
  if (!url || !url.includes('/upload/')) {
    return null;
  }

  const uploadIndex = url.indexOf('/upload/');
  const assetPath = url.slice(uploadIndex + 8);
  const parts = assetPath.split('/').filter(Boolean);
  const withoutVersion = parts[0]?.startsWith('v') ? parts.slice(1) : parts;
  const joined = withoutVersion.join('/');
  const extension = path.extname(joined);

  return extension ? joined.slice(0, -extension.length) : joined;
}

export async function deleteCloudinaryAssetByUrl(url, resourceType = 'image') {
  const publicId = extractPublicIdFromUrl(url);

  if (!publicId) {
    return null;
  }

  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export async function deleteCloudinaryAssetsByUrls(urls = [], resourceType = 'image') {
  await Promise.all(urls.filter(Boolean).map((url) => deleteCloudinaryAssetByUrl(url, resourceType)));
}