import { z } from 'zod';
import {
  MAX_MEMO_LENGTH,
  MAX_PEOPLE,
  MAX_RATING,
  MIN_PEOPLE,
  MIN_RATING,
  TRIP_STATUS_TRANSITIONS,
  TRIP_STATUSES,
} from '#constants';
import type { TripWithCampsite } from '#prisma/models.js';

export const createTripSchema = z
  .object({
    campsiteId: z.number().int().min(1),
    people: z.number().int().min(MIN_PEOPLE).max(MAX_PEOPLE),
    memo: z.string().max(MAX_MEMO_LENGTH).exactOptional(),
  })
  .strict();

export type CreateTripInput = z.infer<typeof createTripSchema>;

export const tripListQuerySchema = z.object({
  status: z.enum(TRIP_STATUSES).optional(),
});

export type TripListQuery = z.infer<typeof tripListQuerySchema>;

export const updateTripSchema = z
  .object({
    people: z.number().int().min(MIN_PEOPLE).max(MAX_PEOPLE).exactOptional(),
    memo: z.string().max(MAX_MEMO_LENGTH).exactOptional(),
    status: z.enum(TRIP_STATUSES).exactOptional(),
    rating: z.number().int().min(MIN_RATING).max(MAX_RATING).exactOptional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, {
    message: '변경할 값을 하나 이상 보내야 합니다.',
  });

export type UpdateTripInput = z.infer<typeof updateTripSchema>;

export function toTripResponse(trip: TripWithCampsite) {
  if (trip.campsite === null) {
    throw new Error(`캠핑 계획 ${trip.id}의 캠핑장이 없습니다.`);
  }

  return {
    id: trip.id,
    campsite: {
      id: trip.campsite.id,
      name: trip.campsite.name,
      imageUrl: trip.campsite.imageUrl,
    },
    people: trip.people,
    status: trip.status,
    rating: trip.rating,
    memo: trip.memo,
    allowedNextStatuses: [...TRIP_STATUS_TRANSITIONS[trip.status]],
  };
}
