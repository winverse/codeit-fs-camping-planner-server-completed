import type { TRIP_STATUSES } from '#constants';

export type TripStatus = (typeof TRIP_STATUSES)[number];

export interface TripCreateData {
  campsiteId: number;
  people: number;
  memo?: string;
}

export interface TripUpdateData {
  people?: number;
  memo?: string;
  status?: TripStatus;
  rating?: number;
}
