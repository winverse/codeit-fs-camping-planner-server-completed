import { z } from "zod";
import type { CampsiteRow } from "#prisma/models.js";

export type Industry = "일반야영장" | "자동차야영장" | "글램핑" | "카라반";

const INDUSTRIES: readonly Industry[] = [
  "일반야영장",
  "자동차야영장",
  "글램핑",
  "카라반",
];

export type CampsiteResponse = {
  id: number;
  name: string;
  intro: string;
  region: string;
  city: string;
  address: string;
  industries: Industry[];
  facilities: string[];
  petAllowed: boolean;
  imageUrl: string | null;
};

function isIndustry(value: string): value is Industry {
  return INDUSTRIES.some((industry) => industry === value);
}

export function toCampsiteResponse(row: CampsiteRow): CampsiteResponse {
  return {
    id: row.id,
    name: row.name,
    intro: row.intro,
    region: row.region,
    city: row.city,
    address: row.address,
    industries: row.industries.split(",").filter(isIndustry),
    facilities: row.facilities === "" ? [] : row.facilities.split(","),
    petAllowed: row.petAllowed,
    imageUrl: row.imageUrl,
  };
}

export const campsiteListQuerySchema = z.object({
  pet: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
});

export type CampsiteListQuery = z.infer<typeof campsiteListQuerySchema>;
