import type { TRIP_STATUSES } from './trip.js';

export type TripStatus = (typeof TRIP_STATUSES)[number];
