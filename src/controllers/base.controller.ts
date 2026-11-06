import { Router } from "express";

export abstract class BaseController {
  protected readonly router: Router = Router();

  abstract routes(): Router;
}
