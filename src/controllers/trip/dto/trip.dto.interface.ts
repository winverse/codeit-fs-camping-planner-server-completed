import type { z } from 'zod';
import type {
  createTripSchema,
  tripListQuerySchema,
  updateTripSchema,
} from './trip.dto.js';

export type CreateTripInput = z.infer<typeof createTripSchema>;
export type TripListQuery = z.infer<typeof tripListQuerySchema>;
export type UpdateTripInput = z.infer<typeof updateTripSchema>;
