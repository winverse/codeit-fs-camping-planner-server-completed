import type { Models } from './contract.js';
import type { db } from './db.js';

export type CampsiteRow = Omit<Models.public_Campsite, 'trips'>;
export type CampsiteData = Omit<CampsiteRow, 'id'>;

export type TripRow = Omit<Models.public_Trip, 'campsite'>;
export type TripWithCampsite = TripRow & {
  campsite: Pick<CampsiteRow, 'id' | 'name' | 'imageUrl'> | null;
};

export type Db = typeof db;
