import type { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGE, HTTP_STATUS } from "#constants";
import { HttpException } from "#exceptions";

export type ErrorResponse = {
  success: false;
  message: string;
  details?: Record<string, string[]>;
};

function isBodyParseError(err: unknown): boolean {
  return err instanceof SyntaxError && "status" in err && err.status === 400;
}

function isForeignKeyViolation(err: unknown): boolean {
  return err instanceof Error && "sqlState" in err && err.sqlState === "23503";
}

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
) {
  if (err instanceof HttpException) {
    res
      .status(err.statusCode)
      .json({ success: false, message: err.message, details: err.details });
    return;
  }

  if (isBodyParseError(err)) {
    res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ success: false, message: ERROR_MESSAGE.VALIDATION_FAILED });
    return;
  }

  if (isForeignKeyViolation(err)) {
    res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ success: false, message: ERROR_MESSAGE.CAMPSITE_NOT_FOUND });
    return;
  }

  console.error(err);
  res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
}
