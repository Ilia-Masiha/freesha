import { NextFunction, Request, Response } from "express-serve-static-core";

export async function logout(
  _req: Request,
  _res: Response,
  _next: NextFunction
): Promise<Response | void> {}
