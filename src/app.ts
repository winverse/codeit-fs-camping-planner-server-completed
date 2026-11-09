import type { Express } from 'express';
import express from 'express';
import type { Controller } from '#controllers';
import { cors, errorHandler } from '#middlewares';

export class App {
  app: Express;

  constructor(controller: Controller) {
    this.app = express();
    this.middleware();
    this.routes(controller);
    this.errorHandling();
  }

  middleware() {
    this.app.use(cors);
    this.app.use(express.json());
  }

  routes(controller: Controller) {
    this.app.use('/api', controller.routes());
  }

  errorHandling() {
    this.app.use(errorHandler);
  }

  listen(port: number) {
    return new Promise<void>((resolve, reject) => {
      this.app.listen(port, (error) => {
        if (error) {
          reject(error);
          return;
        }
        console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
        resolve();
      });
    });
  }
}
