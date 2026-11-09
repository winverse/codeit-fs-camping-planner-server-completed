import type { Request, Response } from 'express';
import { HTTP_STATUS } from '#constants';
import { getValidated, validate } from '#middlewares';
import type { IdParams } from '#schemas';
import { idParamSchema } from '#schemas';
import type { Cradle } from '../../common/di/container.js';
import { BaseController } from '../base.controller.js';
import type {
  CreateTripInput,
  TripListQuery,
  UpdateTripInput,
} from './dto/index.js';
import {
  createTripSchema,
  toTripResponse,
  tripListQuerySchema,
  updateTripSchema,
} from './dto/index.js';

export class TripController extends BaseController {
  #tripService: Cradle['tripService'];

  constructor({ tripService }: Pick<Cradle, 'tripService'>) {
    super();
    this.#tripService = tripService;
  }

  routes() {
    this.router.get('/', validate('query', tripListQuerySchema), (req, res) =>
      this.list(req, res),
    );
    this.router.post('/', validate('body', createTripSchema), (req, res) =>
      this.create(req, res),
    );
    this.router.patch(
      '/:id',
      validate('params', idParamSchema),
      validate('body', updateTripSchema),
      (req, res) => this.update(req, res),
    );
    return this.router;
  }

  async list(req: Request, res: Response) {
    const { status } = getValidated<TripListQuery>(req, 'query');
    const trips = await this.#tripService.listTrips(status);
    res.status(HTTP_STATUS.OK).json(trips.map(toTripResponse));
  }

  async create(req: Request, res: Response) {
    const trip = await this.#tripService.createTrip(
      getValidated<CreateTripInput>(req, 'body'),
    );
    res.status(HTTP_STATUS.CREATED).json(toTripResponse(trip));
  }

  async update(req: Request, res: Response) {
    const { id } = getValidated<IdParams>(req, 'params');
    const trip = await this.#tripService.updateTrip(
      id,
      getValidated<UpdateTripInput>(req, 'body'),
    );
    res.status(HTTP_STATUS.OK).json(toTripResponse(trip));
  }
}
