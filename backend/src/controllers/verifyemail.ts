import { NextFunction, Request, Response } from "express-serve-static-core";

export async function verifyemail(
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response | void> {
  return res.sendStatus(201);
}
