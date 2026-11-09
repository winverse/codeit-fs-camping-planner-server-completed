import type { NextFunction, Request, Response } from 'express';
import { ERROR_MESSAGE, HTTP_STATUS } from '#constants';
import { HttpException } from '#exceptions';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  // express.json 같은 미들웨어가 붙인 4xx 오류(JSON 문법 오류는 400, 본문 크기 초과는 413)
  if (
    err instanceof Error &&
    'status' in err &&
    typeof err.status === 'number' &&
    err.status >= 400 &&
    err.status < 500
  ) {
    return res.status(err.status).json({
      success: false,
      message: ERROR_MESSAGE.BAD_REQUEST,
    });
  }

  // 23503: 외래 키 제약 위반(없는 캠핑장 id로 캠핑 계획을 만들 때)
  if (err instanceof Error && 'sqlState' in err && err.sqlState === '23503') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: ERROR_MESSAGE.CAMPSITE_NOT_FOUND,
    });
  }

  // 처리되지 않은 모든 에러
  console.error(err);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
  });
};
