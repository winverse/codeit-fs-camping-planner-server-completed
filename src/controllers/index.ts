import { HTTP_STATUS } from '#constants';
import type { Cradle } from '../common/di/container.js';
import { BaseController } from './base.controller.js';

export * from './base.controller.js';
export * from './campsite/index.js';
export * from './trip/index.js';

export class Controller extends BaseController {
  #campsiteController: Cradle['campsiteController'];
  #tripController: Cradle['tripController'];

  constructor({
    campsiteController,
    tripController,
  }: Pick<Cradle, 'campsiteController' | 'tripController'>) {
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
