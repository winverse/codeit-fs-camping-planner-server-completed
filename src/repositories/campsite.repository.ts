import type { CampsiteData } from '#prisma/models.js';
import type { Cradle } from '../common/di/container.js';

export class CampsiteRepository {
  #db: Cradle['db'];

  constructor({ db }: Pick<Cradle, 'db'>) {
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
