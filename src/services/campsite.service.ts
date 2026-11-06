import { injectable } from "tsyringe";
import { ERROR_MESSAGE } from "#constants";
import { NotFoundException } from "#exceptions";
import { toCampsiteData } from "#mappers";
import { GoCampingProvider } from "#providers";
import { CampsiteRepository } from "#repositories";

@injectable()
export class CampsiteService {
  constructor(
    private readonly goCampingProvider: GoCampingProvider,
    private readonly campsiteRepository: CampsiteRepository,
  ) {}

  async listCampsites(petAllowed?: boolean) {
    return this.campsiteRepository.findMany(petAllowed);
  }

  async getCampsite(id: number) {
    const campsite = await this.campsiteRepository.findById(id);
    if (campsite === null) {
      throw new NotFoundException(ERROR_MESSAGE.CAMPSITE_NOT_FOUND);
    }
    return campsite;
  }

  async syncCampsites(): Promise<number> {
    const items = await this.goCampingProvider.fetchCampsites();

    for (const item of items) {
      await this.campsiteRepository.upsertByContentId(toCampsiteData(item));
    }

    return items.length;
  }
}
