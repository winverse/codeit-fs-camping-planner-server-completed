import type { TripStatus } from "#prisma/models.js";

export const TRIP_STATUSES = ["wish", "booked", "done", "canceled"] as const;

export const TRIP_STATUS_TRANSITIONS: Record<
  TripStatus,
  readonly TripStatus[]
> = {
  wish: ["booked", "canceled"],
  booked: ["done", "canceled"],
  done: [],
  canceled: [],
};
