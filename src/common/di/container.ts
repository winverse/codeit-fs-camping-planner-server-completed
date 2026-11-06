import { container } from "tsyringe";
import { App } from "../../app.js";
import { CampsiteController, Controller, TripController } from "#controllers";
import { PrismaService } from "#prisma/db.js";
import { GoCampingProvider } from "#providers";
import { CampsiteRepository, TripRepository } from "#repositories";
import { CampsiteService, TripService } from "#services";

export function setupContainer() {
  container.registerSingleton(PrismaService);
  container.registerSingleton(GoCampingProvider);
  container.registerSingleton(CampsiteRepository);
  container.registerSingleton(TripRepository);
  container.registerSingleton(CampsiteService);
  container.registerSingleton(TripService);
  container.registerSingleton(CampsiteController);
  container.registerSingleton(TripController);
  container.registerSingleton(Controller);
  container.registerSingleton(App);
  return container;
}
