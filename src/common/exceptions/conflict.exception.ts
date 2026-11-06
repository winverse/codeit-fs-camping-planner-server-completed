import { HTTP_STATUS } from "../constants/index.js";
import { HttpException } from "./http.exception.js";

export class ConflictException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.CONFLICT, message);
  }
}
