import type { TripStatus } from "#prisma/models.js";

export const TRIP_STATUSES = ["wish", "booked", "done", "canceled"] as const;

export const MIN_PEOPLE = 1;
export const MAX_PEOPLE = 8;
export const MAX_MEMO_LENGTH = 200;
export const MIN_RATING = 1;
export const MAX_RATING = 5;

export const TRIP_STATUS_TRANSITIONS: Record<
  TripStatus,
  readonly TripStatus[]
> = {
  wish: ["booked", "canceled"],
  booked: ["done", "canceled"],
  done: [],
  canceled: [],
};
