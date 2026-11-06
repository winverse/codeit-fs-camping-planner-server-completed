import { injectable } from "tsyringe";
import type { Request, Response } from "express";
import { HTTP_STATUS } from "#constants";
import { idParamSchema, type IdParams } from "#schemas";
import { getValidated, validate } from "#middlewares";
import { TripService } from "#services";
import { BaseController } from "../base.controller.js";
import {
  createTripSchema,
  toTripResponse,
  tripListQuerySchema,
  updateTripSchema,
  type CreateTripInput,
  type TripListQuery,
  type TripResponse,
  type UpdateTripInput,
} from "./dto/index.js";

@injectable()
export class TripController extends BaseController {
  constructor(private readonly tripService: TripService) {
    super();
  }

  routes() {
    this.router.get("/", validate("query", tripListQuerySchema), (req, res) =>
      this.list(req, res),
    );
    this.router.post("/", validate("body", createTripSchema), (req, res) =>
      this.create(req, res),
    );
    this.router.patch(
      "/:id",
      validate("params", idParamSchema),
      validate("body", updateTripSchema),
      (req, res) => this.update(req, res),
    );
    return this.router;
  }

  private async list(req: Request, res: Response<TripResponse[]>) {
    const { status } = getValidated<TripListQuery>(req, "query");
    const trips = await this.tripService.listTrips(status);
    res.status(HTTP_STATUS.OK).json(trips.map(toTripResponse));
  }

  private async create(req: Request, res: Response<TripResponse>) {
    const input = getValidated<CreateTripInput>(req, "body");
    const trip = await this.tripService.createTrip(input);
    res.status(HTTP_STATUS.CREATED).json(toTripResponse(trip));
  }

  private async update(req: Request, res: Response<TripResponse>) {
    const { id } = getValidated<IdParams>(req, "params");
    const input = getValidated<UpdateTripInput>(req, "body");
    const trip = await this.tripService.updateTrip(id, input);
    res.status(HTTP_STATUS.OK).json(toTripResponse(trip));
  }
}
