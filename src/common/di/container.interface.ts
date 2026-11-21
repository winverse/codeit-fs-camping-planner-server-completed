import type {
  CampsiteController,
  Controller,
  TripController,
} from '#controllers';
import type { Db } from '#prisma/db.js';
import type { GoCampingProvider } from '#providers';
import type { CampsiteRepository, TripRepository } from '#repositories';
import type { CampsiteService, TripService } from '#services';

export interface Cradle {
  db: Db;
  goCampingProvider: GoCampingProvider;
  campsiteRepository: CampsiteRepository;
  tripRepository: TripRepository;
  campsiteService: CampsiteService;
  tripService: TripService;
  campsiteController: CampsiteController;
  tripController: TripController;
  controller: Controller;
}
