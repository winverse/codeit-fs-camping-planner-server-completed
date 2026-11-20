import type { z } from 'zod';
import type { idParamSchema } from './request.schema.js';

export type IdParams = z.infer<typeof idParamSchema>;
