import { injectable } from "tsyringe";
import type { Request, Response } from "express";
import { HTTP_STATUS } from "#constants";
import { idParamSchema, type IdParams } from "#schemas";
import { getValidated, validate } from "#middlewares";
import { CampsiteService } from "#services";
import { BaseController } from "../base.controller.js";
import {
  campsiteListQuerySchema,
  toCampsiteResponse,
  type CampsiteListQuery,
  type CampsiteResponse,
} from "./dto/index.js";

@injectable()
export class CampsiteController extends BaseController {
  constructor(private readonly campsiteService: CampsiteService) {
    super();
  }

  routes() {
    this.router.get(
      "/",
      validate("query", campsiteListQuerySchema),
      (req, res) => this.list(req, res),
    );
    this.router.get("/:id", validate("params", idParamSchema), (req, res) =>
      this.detail(req, res),
    );
    return this.router;
  }

  private async list(req: Request, res: Response<CampsiteResponse[]>) {
    const { pet } = getValidated<CampsiteListQuery>(req, "query");
    const campsites = await this.campsiteService.listCampsites(pet);
    res.status(HTTP_STATUS.OK).json(campsites.map(toCampsiteResponse));
  }

  private async detail(req: Request, res: Response<CampsiteResponse>) {
    const { id } = getValidated<IdParams>(req, "params");
    const campsite = await this.campsiteService.getCampsite(id);
    res.status(HTTP_STATUS.OK).json(toCampsiteResponse(campsite));
  }
}
