import { ERROR_MESSAGE } from '#constants';
import { NotFoundException } from '#exceptions';
import { toCampsiteData } from '#mappers';
import type { GoCampingProvider } from '#providers';
import type { CampsiteRepository } from '#repositories';

export class CampsiteService {
  #goCampingProvider: GoCampingProvider;
  #campsiteRepository: CampsiteRepository;

  constructor({
    goCampingProvider,
    campsiteRepository,
  }: {
    goCampingProvider: GoCampingProvider;
    campsiteRepository: CampsiteRepository;
  }) {
    this.#goCampingProvider = goCampingProvider;
    this.#campsiteRepository = campsiteRepository;
  }

  async listCampsites(petAllowed?: boolean) {
    return this.#campsiteRepository.findMany(petAllowed);
  }

  async getCampsite(id: number) {
    const campsite = await this.#campsiteRepository.findById(id);
    if (campsite === null) {
      throw new NotFoundException(ERROR_MESSAGE.CAMPSITE_NOT_FOUND);
    }
    return campsite;
  }

  async syncCampsites() {
    const items = await this.#goCampingProvider.fetchCampsites();

    for (const item of items) {
      await this.#campsiteRepository.upsertByContentId(toCampsiteData(item));
    }

    return items.length;
  }
}
