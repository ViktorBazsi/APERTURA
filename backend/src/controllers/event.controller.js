import { createCrudController } from './createCrudController.js';
import { eventService } from '../services/event.service.js';

export const eventController = createCrudController(eventService);
