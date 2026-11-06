import type { NextFunction, Request, Response } from "express";
import { corsOrigins, isProduction } from "#config";
import { HTTP_STATUS } from "#constants";

export function cors(req: Request, res: Response, next: NextFunction) {
  // 응답 헤더가 요청의 Origin에 따라 달라진다는 것을 캐시에 알립니다
  res.vary("Origin");

  const origin = req.headers.origin;
  const isAllowed = origin && (!isProduction || corsOrigins.includes(origin));

  if (isAllowed) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  }

  // 공통 헤더 설정
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Preflight(사전 요청) 처리
  if (req.method === "OPTIONS") {
    res.sendStatus(HTTP_STATUS.OK);
    return;
  }

  next();
}
