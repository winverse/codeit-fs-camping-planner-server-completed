import type { TRIP_STATUSES } from '#constants';
import type { Models } from '#prisma/contract.js';
import type { CampsiteRow } from './campsite.interface.js';

export type TripRow = Omit<Models.public_Trip, 'campsite'>;
export type TripWithCampsite = TripRow & {
  campsite: Pick<CampsiteRow, 'id' | 'name' | 'imageUrl'> | null;
};

export type TripStatus = (typeof TRIP_STATUSES)[number];

export interface CreateTripData {
  campsiteId: number;
  people: number;
  memo?: string;
}

export interface UpdateTripData {
  people?: number;
  memo?: string;
  status?: TripStatus;
  rating?: number;
}
