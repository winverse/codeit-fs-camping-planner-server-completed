import type {
  CampsiteController,
  Controller,
  TripController,
} from '#controllers';
import type { db } from '#prisma/db.js';
import type { GoCampingProvider } from '#providers';
import type { CampsiteRepository, TripRepository } from '#repositories';
import type { CampsiteService, TripService } from '#services';

export interface Cradle {
  db: typeof db;
  goCampingProvider: GoCampingProvider;
  campsiteRepository: CampsiteRepository;
  tripRepository: TripRepository;
  campsiteService: CampsiteService;
  tripService: TripService;
  campsiteController: CampsiteController;
  tripController: TripController;
  controller: Controller;
}
