import { injectable } from "tsyringe";
import { PrismaService } from "#prisma/db.js";
import type { TripStatus } from "#prisma/models.js";

export interface TripCreateData {
  campsiteId: number;
  people: number;
  memo?: string;
}

export interface TripUpdateData {
  people?: number;
  memo?: string;
  status?: TripStatus;
  rating?: number;
}

@injectable()
export class TripRepository {
  constructor(private readonly prisma: PrismaService) {}

  private withCampsite() {
    return this.prisma.db.orm.public.Trip.include("campsite", (campsite) =>
      campsite.select("id", "name", "imageUrl"),
    );
  }

  async findMany(status?: TripStatus) {
    return this.withCampsite()
      .where({ status })
      .orderBy((t) => t.createdAt.desc())
      .all();
  }

  async findById(id: number) {
    return this.withCampsite().where({ id }).first();
  }

  async create(data: TripCreateData) {
    return this.prisma.db.orm.public.Trip.create(data);
  }

  async update(id: number, data: TripUpdateData) {
    return this.prisma.db.orm.public.Trip.where({ id }).update(data);
  }
}
