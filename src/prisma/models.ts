import type { Models } from "./contract.js";

export type CampsiteRow = Omit<Models.public_Campsite, "trips">;
export type CampsiteData = Omit<CampsiteRow, "id">;

export type TripRow = Omit<Models.public_Trip, "campsite">;
export type TripStatus = Models.public_Trip["status"];
export type TripWithCampsite = TripRow & {
  campsite: Pick<CampsiteRow, "id" | "name" | "imageUrl"> | null;
};
