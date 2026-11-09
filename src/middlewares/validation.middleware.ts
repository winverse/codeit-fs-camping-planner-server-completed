import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { ERROR_MESSAGE } from '#constants';
import { BadRequestException } from '#exceptions';

type ValidationTarget = 'body' | 'query' | 'params';

/**
 * 범용 검증 미들웨어
 * @param target - 검증할 대상 ('body', 'params', 'query')
 * @param schema - Zod 스키마
 */
export const validate = (target: ValidationTarget, schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req[target]);

      if (!result.success) {
        throw new BadRequestException(
          ERROR_MESSAGE.VALIDATION_FAILED,
          z.flattenError(result.error).fieldErrors,
        );
      }

      // 검증을 통과한 값만 남기려고 원래 값을 검증 결과로 바꾸며, Express 5의 req.query는 getter라 대입할 수 없으므로 속성을 다시 정의합니다.
      Object.defineProperty(req, target, {
        value: result.data,
        writable: true,
        enumerable: true,
        configurable: true,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export function getValidated<T>(req: Request, target: ValidationTarget): T {
  return req[target] as T;
}
