import type { Request, Response } from 'express';
import { HTTP_STATUS } from '#constants';
import { getValidated, validate } from '#middlewares';
import type { IdParams } from '#schemas';
import { idParamSchema } from '#schemas';
import type { Cradle } from '../../common/di/container.js';
import { BaseController } from '../base.controller.js';
import type { CampsiteListQuery } from './dto/index.js';
import { campsiteListQuerySchema, toCampsiteResponse } from './dto/index.js';

export class CampsiteController extends BaseController {
  #campsiteService: Cradle['campsiteService'];

  constructor({ campsiteService }: Pick<Cradle, 'campsiteService'>) {
    super();
    this.#campsiteService = campsiteService;
  }

  routes() {
    this.router.get(
      '/',
      validate('query', campsiteListQuerySchema),
      (req, res) => this.list(req, res),
    );
    this.router.get('/:id', validate('params', idParamSchema), (req, res) =>
      this.detail(req, res),
    );
    return this.router;
  }

  async list(req: Request, res: Response) {
    const { pet } = getValidated<CampsiteListQuery>(req, 'query');
    const campsites = await this.#campsiteService.listCampsites(pet);
    res.status(HTTP_STATUS.OK).json(campsites.map(toCampsiteResponse));
  }

  async detail(req: Request, res: Response) {
    const { id } = getValidated<IdParams>(req, 'params');
    const campsite = await this.#campsiteService.getCampsite(id);
    res.status(HTTP_STATUS.OK).json(toCampsiteResponse(campsite));
  }
}
