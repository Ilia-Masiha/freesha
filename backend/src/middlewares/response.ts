import { NextFunction, Request, Response } from "express-serve-static-core";
import { customLog } from "../helpers/utils";

export function error404Middleware(
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  return res.status(404).send("Not found");
}

export function generalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  customLog("server", err.message!);
  customLog("server", err.stack!);

  const message = "Something went wrong on the server";
  return res.status(500).json({ message });
}
