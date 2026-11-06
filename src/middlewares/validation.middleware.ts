import type { NextFunction, Request, Response } from "express";
import { z, type ZodType } from "zod";
import { ERROR_MESSAGE } from "#constants";
import { BadRequestException } from "#exceptions";

export type ValidationTarget = "body" | "params" | "query";

declare module "express" {
  interface Request {
    validated?: Partial<Record<ValidationTarget, unknown>>;
  }
}

export function validate(target: ValidationTarget, schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      throw new BadRequestException(
        ERROR_MESSAGE.VALIDATION_FAILED,
        z.flattenError(result.error).fieldErrors,
      );
    }

    req.validated = { ...req.validated, [target]: result.data };
    next();
  };
}

export function getValidated<T>(req: Request, target: ValidationTarget): T {
  return req.validated?.[target] as T;
}
