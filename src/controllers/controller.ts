import { HTTP_STATUS } from '#constants';
import { BaseController } from './base.controller.js';
import type { CampsiteController } from './campsite/index.js';
import type { TripController } from './trip/index.js';

export class Controller extends BaseController {
  #campsiteController: CampsiteController;
  #tripController: TripController;

  constructor({
    campsiteController,
    tripController,
  }: {
    campsiteController: CampsiteController;
    tripController: TripController;
  }) {
    super();
    this.#campsiteController = campsiteController;
    this.#tripController = tripController;
  }

  routes() {
    this.router.get('/ping', (req, res) => {
      res.status(HTTP_STATUS.OK).json({ message: 'ok' });
    });
    this.router.use('/campsites', this.#campsiteController.routes());
    this.router.use('/trips', this.#tripController.routes());
    return this.router;
  }
}
