import { NextFunction, Request, Response } from "express-serve-static-core";

import { customLog, makeResObj } from "../helpers/utils.js";
import { messages } from "../helpers/messages.js";

export function error404Middleware(
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  const resObj = makeResObj(messages.error404);
  return res.status(404).json(resObj);
}

export function generalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  customLog("server", err.message!);
  customLog("server", err.stack!);

  const resObj = makeResObj(messages.error500);
  return res.status(500).json(resObj);
}
