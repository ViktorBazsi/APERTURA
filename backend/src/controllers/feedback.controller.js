import { removeFeedback } from '../services/feedback.service.js';

export async function destroyFeedback(req, res) {
  await removeFeedback(req.params.id, req.user);
  res.status(204).send();
}