import { NextFunction, Request, Response } from "express-serve-static-core";

export async function updateUser(
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response | void> {
  return res.status(200).json({ message: "Yup" });
}
