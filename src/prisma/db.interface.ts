import type { TripStatus } from '#constants';
import type { Models } from './contract.js';
import type { db } from './db.js';

export type CampsiteRow = Omit<Models.public_Campsite, 'trips'>;
export type CampsiteData = Omit<CampsiteRow, 'id'>;

export type TripRow = Omit<Models.public_Trip, 'campsite'>;
export type TripWithCampsite = TripRow & {
  campsite: Pick<CampsiteRow, 'id' | 'name' | 'imageUrl'> | null;
};

export type Db = typeof db;

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
