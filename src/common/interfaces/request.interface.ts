import type { z } from 'zod';
import type { idParamSchema } from '#schemas';

export type IdParams = z.infer<typeof idParamSchema>;
