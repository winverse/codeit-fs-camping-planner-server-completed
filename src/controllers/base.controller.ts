import type { Router } from 'express';
import express from 'express';

export abstract class BaseController {
  router: Router;

  constructor() {
    this.router = express.Router();
  }

  abstract routes(): Router;
}
