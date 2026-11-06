import { injectable } from "tsyringe";
import { HTTP_STATUS } from "#constants";
import { BaseController } from "./base.controller.js";
import { CampsiteController } from "./campsite/index.js";
import { TripController } from "./trip/index.js";

export { CampsiteController } from "./campsite/index.js";
export { TripController } from "./trip/index.js";

@injectable()
export class Controller extends BaseController {
  constructor(
    private readonly campsiteController: CampsiteController,
    private readonly tripController: TripController,
  ) {
    super();
  }

  routes() {
    this.router.get("/ping", (req, res) => {
      res.status(HTTP_STATUS.OK).json({ message: "ok" });
    });
    this.router.use("/campsites", this.campsiteController.routes());
    this.router.use("/trips", this.tripController.routes());
    return this.router;
  }
}
