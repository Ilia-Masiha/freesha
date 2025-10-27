import { NextFunction, Request, Response } from "express-serve-static-core";

export function error404Middleware(
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  return res.status(404).send("Not found");
}
