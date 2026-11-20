import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import { config } from '#config';
import type { Contract } from './contract.js';
import contractJson from './contract.json' with { type: 'json' };

const contract = contractFromJson<Contract>(contractJson);

export const db = postgres({
  contract,
  url: config.DATABASE_URL,
});
