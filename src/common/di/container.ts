import {
  asClass,
  asValue,
  createContainer as createAwilixContainer,
  InjectionMode,
  Lifetime,
} from 'awilix';
import { CampsiteController, Controller, TripController } from '#controllers';
import { db } from '#prisma/db.js';
import { GoCampingProvider } from '#providers';
import { CampsiteRepository, TripRepository } from '#repositories';
import { CampsiteService, TripService } from '#services';

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

export const createContainer = () => {
  const container = createAwilixContainer<Cradle>({
    injectionMode: InjectionMode.PROXY,
    strict: true,
  });

  container.register({
    db: asValue(db),
    goCampingProvider: asClass(GoCampingProvider, {
      lifetime: Lifetime.SINGLETON,
    }),
    campsiteRepository: asClass(CampsiteRepository, {
      lifetime: Lifetime.SINGLETON,
    }),
    tripRepository: asClass(TripRepository, {
      lifetime: Lifetime.SINGLETON,
    }),

    campsiteService: asClass(CampsiteService, {
      lifetime: Lifetime.SINGLETON,
    }),
    tripService: asClass(TripService, {
      lifetime: Lifetime.SINGLETON,
    }),

    campsiteController: asClass(CampsiteController, {
      lifetime: Lifetime.SINGLETON,
    }),
    tripController: asClass(TripController, {
      lifetime: Lifetime.SINGLETON,
    }),

    controller: asClass(Controller, {
      lifetime: Lifetime.SINGLETON,
    }),
  });

  return container.cradle;
};
