import { HTTP_STATUS } from "../constants/index.js";
import { HttpException } from "./http.exception.js";

export class BadRequestException extends HttpException {
  constructor(message: string, details?: Record<string, string[]>) {
    super(HTTP_STATUS.BAD_REQUEST, message, details);
  }
}
