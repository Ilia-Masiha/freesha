import { NextFunction, Request, Response } from "express-serve-static-core";
import { customLog } from "../helpers/utils";

export function error404Middleware(
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  return res.status(404).send("منبع مورد نظر پیدا نشد");
}

export function generalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  customLog("server", err.message!);
  customLog("server", err.stack!);

  const message = "خطایی در سرور رخ داده است";
  return res.status(500).json({ message });
}
