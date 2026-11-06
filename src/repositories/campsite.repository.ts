import { injectable } from "tsyringe";
import { PrismaService } from "#prisma/db.js";
import type { CampsiteData } from "#prisma/models.js";

@injectable()
export class CampsiteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(petAllowed?: boolean) {
    return this.prisma.db.orm.public.Campsite.where({ petAllowed })
      .orderBy((c) => c.id.asc())
      .all();
  }

  async findById(id: number) {
    return this.prisma.db.orm.public.Campsite.where({ id }).first();
  }

  async upsertByContentId(data: CampsiteData) {
    return this.prisma.db.orm.public.Campsite.upsert({
      create: data,
      update: data,
      conflictOn: { contentId: data.contentId },
    });
  }
}
