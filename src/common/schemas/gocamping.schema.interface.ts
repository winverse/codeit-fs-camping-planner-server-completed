import type { z } from 'zod';
import type { goCampingItemSchema } from './gocamping.schema.js';

export type GoCampingItem = z.infer<typeof goCampingItemSchema>;
