import { z } from "zod";
import { TRIP_STATUS_TRANSITIONS, TRIP_STATUSES } from "#constants";
import type { TripStatus, TripWithCampsite } from "#prisma/models.js";

export const createTripSchema = z
  .object({
    campsiteId: z.number().int().min(1),
    people: z.number().int().min(1).max(8),
    memo: z.string().max(200).optional(),
  })
  .strict();

export type CreateTripInput = z.infer<typeof createTripSchema>;

export const tripListQuerySchema = z.object({
  status: z.enum(TRIP_STATUSES).optional(),
});

export type TripListQuery = z.infer<typeof tripListQuerySchema>;

export const updateTripSchema = z
  .object({
    people: z.number().int().min(1).max(8).optional(),
    memo: z.string().max(200).optional(),
    status: z.enum(TRIP_STATUSES).optional(),
    rating: z.number().int().min(1).max(5).optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, {
    message: "변경할 값을 하나 이상 보내야 합니다.",
  });

export type UpdateTripInput = z.infer<typeof updateTripSchema>;

export type TripResponse = {
  id: number;
  campsite: { id: number; name: string; imageUrl: string | null };
  people: number;
  status: TripStatus;
  rating: number | null;
  memo: string;
  allowedNextStatuses: TripStatus[];
};

export function toTripResponse(trip: TripWithCampsite): TripResponse {
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
