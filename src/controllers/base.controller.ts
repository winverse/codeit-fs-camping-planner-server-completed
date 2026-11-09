import type { Router } from 'express';
import express from 'express';

export class BaseController {
  router: Router;

  constructor() {
    this.router = express.Router();
  }

  routes() {
    throw new Error('Method not implemented.');
  }
}
