import { injectable } from "tsyringe";
import express, { type Express } from "express";
import { Controller } from "#controllers";
import { errorHandler } from "#middlewares";

@injectable()
export class App {
  public readonly app: Express;

  constructor(private readonly controller: Controller) {
    this.app = express();
    this.middleware();
    this.routes();
    this.errorHandling();
  }

  private middleware() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.use("/api", this.controller.routes());
  }

  private errorHandling() {
    this.app.use(errorHandler);
  }

  public listen(port: number) {
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
