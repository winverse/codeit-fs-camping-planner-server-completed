import { HTTP_STATUS } from '#constants';
import { HttpException } from './http.exception.js';

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}
