import { registerUser, loginUser, getCurrentUser } from '../services/auth.service.js';

export async function register(req, res) {
  const result = await registerUser(req.body);
  res.status(201).json(result);
}

export async function login(req, res) {
  const result = await loginUser(req.body);
  res.json(result);
}

export async function me(req, res) {
  const user = await getCurrentUser(req.user.id);
  res.json(user);
}
