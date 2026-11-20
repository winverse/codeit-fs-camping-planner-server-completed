import type { CampsiteData } from '#prisma/db.interface.js';
import type { Db } from '#prisma/db.js';

export class CampsiteRepository {
  #db: Db;

  constructor({ db }: { db: Db }) {
    this.#db = db;
  }

  async findMany(petAllowed?: boolean) {
    return this.#db.orm.public.Campsite.where({ petAllowed })
      .orderBy((c) => c.id.asc())
      .all();
  }

  async findById(id: number) {
    return this.#db.orm.public.Campsite.where({ id }).first();
  }

  async upsertByContentId(data: CampsiteData) {
    return this.#db.orm.public.Campsite.upsert({
      create: data,
      update: data,
      conflictOn: { contentId: data.contentId },
    });
  }
}
