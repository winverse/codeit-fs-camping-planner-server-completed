import type { z } from 'zod';
import type { Models } from '#prisma/contract.js';
import type { goCampingItemSchema } from '#schemas';

export type CampsiteRow = Omit<Models.public_Campsite, 'trips'>;
export type CampsiteData = Omit<CampsiteRow, 'id'>;

export type GoCampingItem = z.infer<typeof goCampingItemSchema>;
