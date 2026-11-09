import type { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGE, HTTP_STATUS } from "#constants";
import { HttpException } from "#exceptions";

export type ErrorResponse = {
  success: false;
  message: string;
  details?: Record<string, string[]>;
};

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

  // express.json 같은 미들웨어가 붙인 4xx 오류(JSON 문법 오류는 400, 본문 크기 초과는 413)
  if (
    err instanceof Error &&
    "status" in err &&
    typeof err.status === "number" &&
    err.status >= 400 &&
    err.status < 500
  ) {
    res
      .status(err.status)
      .json({ success: false, message: ERROR_MESSAGE.BAD_REQUEST });
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
