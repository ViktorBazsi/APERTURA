import { submitContactMessage } from '../services/contact.service.js';

export async function submitContact(req, res) {
  const result = await submitContactMessage(req.body);
  res.status(201).json(result);
}