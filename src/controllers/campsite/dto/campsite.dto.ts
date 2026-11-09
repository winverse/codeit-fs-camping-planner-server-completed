import { z } from 'zod';
import type { CampsiteRow } from '#prisma/models.js';

const INDUSTRIES = ['일반야영장', '자동차야영장', '글램핑', '카라반'];

export function toCampsiteResponse(row: CampsiteRow) {
  return {
    id: row.id,
    name: row.name,
    intro: row.intro,
    region: row.region,
    city: row.city,
    address: row.address,
    industries: row.industries
      .split(',')
      .filter((industry) => INDUSTRIES.includes(industry)),
    facilities: row.facilities === '' ? [] : row.facilities.split(','),
    petAllowed: row.petAllowed,
    imageUrl: row.imageUrl,
  };
}

export const campsiteListQuerySchema = z.object({
  pet: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true')
    .optional(),
});

export type CampsiteListQuery = z.infer<typeof campsiteListQuerySchema>;
