import { getOwnProfile, updateOwnProfile } from '../services/user.service.js';

export async function getMe(req, res) {
  const user = await getOwnProfile(req.user.id);
  res.json(user);
}

export async function patchMe(req, res) {
  const user = await updateOwnProfile(req.user.id, req.body);
  res.json(user);
}