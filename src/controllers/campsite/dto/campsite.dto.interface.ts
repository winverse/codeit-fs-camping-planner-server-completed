import type { z } from 'zod';
import type { campsiteListQuerySchema } from './campsite.dto.js';

export type CampsiteListQuery = z.infer<typeof campsiteListQuerySchema>;
