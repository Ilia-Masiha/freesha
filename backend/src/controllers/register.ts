import { NextFunction, Request, Response } from "express-serve-static-core";

export function register(
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  return res.sendStatus(201);
}
